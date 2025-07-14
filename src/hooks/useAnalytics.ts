import { useEffect, useRef } from 'react';
import axios from 'axios';

// ✅ 統一 Base URL
export const API_BASE_URL = 'https://amylumiere4-production.up.railway.app/api';

// ✅ module 內還是保留 sessionId，搭配 window
let sessionId: string | null = null;

interface AnalyticsHook {
  trackSession: () => Promise<string | null>;
  ensureSession: () => Promise<void>;
  trackInteraction: (
    actionType: string,
    postId?: string,
    postUsername?: string,
    additionalData?: any
  ) => Promise<void>;
  trackPostView: (
    postId: string,
    postUsername: string,
    viewDuration: number,
    scrollPercentage: number,
    mediaType: 'image' | 'video'
  ) => Promise<void>;
}

export const useAnalytics = (): AnalyticsHook => {
  const sessionTracked = useRef(false);

  const trackSession = async (): Promise<string | null> => {
    if (sessionTracked.current && sessionId) {
      return sessionId;
    }

    const savedSession = sessionStorage.getItem('session_id');
    if (savedSession) {
      sessionId = savedSession;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/track/session`, {
        page_url: window.location.href,
        session_id: sessionId || null
      });

      if (response.data.success) {
        sessionId = response.data.session_id;

        // ✅ 保證只有在 sessionId 是字串時才 set
        if (sessionId) {
          sessionStorage.setItem('session_id', sessionId);
          (window as any).sessionId = sessionId;
        }

        sessionTracked.current = true;
        console.log('✅ Session tracked:', sessionId);
      }
    } catch (error) {
      console.error('❌ Session tracking failed:', error);
    }

    return sessionId;
  };

  const ensureSession = async () => {
    if (sessionTracked.current && sessionId) return;

    await trackSession();

    let retries = 0;
    while (!sessionId && retries < 20) {
      await new Promise((r) => setTimeout(r, 50));
      retries++;
    }

    if (!sessionId) {
      console.warn('⚠️ Failed to initialize sessionId in time');
    }
  };

  const trackInteraction = async (
    actionType: string,
    postId?: string,
    postUsername?: string,
    additionalData: any = {}
  ) => {
    if (!actionType) return;

    await ensureSession();
    if (!sessionId) {
      console.warn(`⚠️ Interaction skipped, no session_id: ${actionType}`);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/track/interaction`, {
        session_id: sessionId,
        action_type: actionType,
        post_id: postId,
        post_username: postUsername,
        additional_data: additionalData
      });

      console.log(`✅ Interaction tracked: ${actionType}`);
    } catch (error) {
      console.error('❌ Interaction tracking failed:', error);
    }
  };

  const trackPostView = async (
    postId: string,
    postUsername: string,
    viewDuration: number,
    scrollPercentage: number,
    mediaType: 'image' | 'video'
  ) => {
    await ensureSession();
    if (!sessionId) {
      console.warn('⚠️ Post view skipped, no session_id');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/track/post-view`, {
        session_id: sessionId,
        post_id: postId,
        post_username: postUsername,
        view_duration: viewDuration,
        scroll_percentage: scrollPercentage,
        media_type: mediaType
      });

      console.log(`✅ Post view tracked: ${postId}`);
    } catch (error) {
      console.error('❌ Post view tracking failed:', error);
    }
  };

  useEffect(() => {
    trackSession();
  }, []);

  return {
    trackSession,
    ensureSession,
    trackInteraction,
    trackPostView
  };
};
