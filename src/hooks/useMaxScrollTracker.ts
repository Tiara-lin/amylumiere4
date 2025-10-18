import { useEffect, useRef } from 'react';
import { API_BASE_URL } from './useAnalytics';

type ProgressType = 'SCROLL_PROGRESS' | 'SCROLL_FINAL';

export const useMaxScrollTracker = () => {
  const maxScrollRef = useRef(0);
  const lastPostPctRef = useRef(0);
  const lastPostTsRef = useRef(0);

  useEffect(() => {
    console.log('🚩 useMaxScrollTracker mounted!');

    const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

    /** 封裝：回報滑動進度給父頁（Qualtrics） */
    const postToParent = (percent: number, type: ProgressType) => {
      try {
        const sid =
          (window as any).sessionId ||
          sessionStorage.getItem('session_id') ||
          null;
        const uuid =
          localStorage.getItem('uuid') ||
          sessionStorage.getItem('uuid') ||
          null;

        window.parent?.postMessage(
          {
            type,                // 'SCROLL_PROGRESS' | 'SCROLL_FINAL'
            scrollPercent: clamp(percent),
            sessionId: sid,
            uuid,
          },
          '*' // 若要更安全可改為你的 Qualtrics 網域
        );
      } catch (e) {
        console.warn('postMessage failed:', e);
      }
    };

    /** 節流版回報（每提升≥1% 或 距上次≥800ms 才回報一次） */
    const maybePostProgress = (percent: number) => {
      const now = Date.now();
      if (
        percent - lastPostPctRef.current >= 1 ||
        now - lastPostTsRef.current >= 800
      ) {
        lastPostPctRef.current = percent;
        lastPostTsRef.current = now;
        postToParent(percent, 'SCROLL_PROGRESS');
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || 0;
      const scrollHeight = document.documentElement.scrollHeight || 0;
      const clientHeight = window.innerHeight || 0;
      const denom = Math.max(1, scrollHeight - clientHeight); // 避免除以 0
      const currentScroll = clamp((scrollTop / denom) * 100);

      if (currentScroll > maxScrollRef.current) {
        maxScrollRef.current = currentScroll;
        console.log('✅ New max scroll:', maxScrollRef.current.toFixed(2));
        maybePostProgress(maxScrollRef.current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    console.log('🚩 handleScroll listener attached!');

    /** 封裝：送出最終紀錄（也會先 postMessage 給 Qualtrics） */
    const sendScroll = (reason: string) => {
      console.log(`🚩 Triggered by ${reason}`);

      const sid =
        (window as any).sessionId ||
        sessionStorage.getItem('session_id') ||
        null;
      const uuid =
        localStorage.getItem('uuid') ||
        sessionStorage.getItem('uuid') ||
        null;

      console.log('🚩 using sessionId:', sid);

      const finalPct = clamp(maxScrollRef.current);

      // 先通知父頁（Qualtrics）
      postToParent(finalPct, 'SCROLL_FINAL');

      const payload = JSON.stringify({
        uuid,
        session_id: sid,
        action_type: 'final_max_scroll',
        additional_data: {
          max_scroll_percentage: finalPct
        }
      });

      console.log('🚩 payload:', payload);

      // 存進 localStorage（除錯用）
      try { localStorage.setItem('debug_final_scroll', payload); } catch {}

      let sent = false;
      try {
        sent = navigator.sendBeacon(
          `${API_BASE_URL}/track/interaction`,
          new Blob([payload], { type: 'application/json' })
        );
      } catch (e) {
        console.log('⚠️ sendBeacon error:', e);
      }

      console.log('✅ sendBeacon sent?', sent);

      if (!sent) {
        console.log('⚠️ sendBeacon failed, using fetch fallback');
        fetch(`${API_BASE_URL}/track/interaction`, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        }).catch(err => console.log('⚠️ fetch fallback error:', err));
      }
    };

    const handleBeforeUnload = () => sendScroll('beforeunload');
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendScroll('visibilitychange');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    console.log('🚩 handleBeforeUnload listener attached!');
    console.log('🚩 visibilitychange listener attached!');

    return () => {
      // 卸載前再確保送一次最終值
      try { sendScroll('unmount'); } catch {}
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return maxScrollRef;
};
