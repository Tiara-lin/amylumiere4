import { useEffect, useRef } from 'react';
import { API_BASE_URL } from './useAnalytics';

export const useMaxScrollTracker = () => {
  const maxScrollRef = useRef(0);

  useEffect(() => {
    console.log('🚩 useMaxScrollTracker mounted!');

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      const currentScroll = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (currentScroll > maxScrollRef.current) {
        maxScrollRef.current = currentScroll;
        console.log('✅ New max scroll:', maxScrollRef.current.toFixed(2));
      }
    };

    window.addEventListener('scroll', handleScroll);
    console.log('🚩 handleScroll listener attached!');

    const sendScroll = (reason: string) => {
      console.log(`🚩 Triggered by ${reason}`);

      const sid = (window as any).sessionId || null;
      const uuid = localStorage.getItem('uuid') || null; 
      console.log('🚩 using sessionId:', sid);

      const payload = JSON.stringify({
        uuid,
        session_id: sid,
        action_type: 'final_max_scroll',
        additional_data: {
          max_scroll_percentage: maxScrollRef.current
        }
      });

      console.log('🚩 payload:', payload);

      // 存進 localStorage
      localStorage.setItem('debug_final_scroll', payload);

      const sent = navigator.sendBeacon(
        `${API_BASE_URL}/track/interaction`,
        new Blob([payload], { type: 'application/json' })
      );

      console.log('✅ sendBeacon sent?', sent);

      if (!sent) {
        console.log('⚠️ sendBeacon failed, using fetch fallback');
        fetch(`${API_BASE_URL}/track/interaction`, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        });
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return maxScrollRef;
};
