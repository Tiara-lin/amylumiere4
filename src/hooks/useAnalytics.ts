import { useEffect, useRef } from 'react';
import axios from 'axios';

// ✅ 統一 Base URL
export const API_BASE_URL = 'https://test-backend4-production.up.railway.app/api';

let sessionId: string | null = null;

// ✅ 加入 export，供外部 type 引用
export type AnalyticsHook = {
  trackSession: () => Promise<string | null>;
  ensureSession: () => Promise<void>;
  trackInteraction: (
    type: string,
    postId: string,
    username: string,
    metadata?: Record<string, any>
  ) => Promise<void>;
  trackPostView: (
    postId: string,
    username: string,
    viewDuration: number,
    scrollPercent: number,
    mediaType: 'image' | 'video'
  ) => void;
};

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

    const uuid = localStorage.getItem('uuid');

    // ✅ 檢查 UUID 格式與存在性
    const isValidUUID =
      uuid &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);

    if (!isValidUUID) {
      console.warn('⚠️ Invalid or missing UUID:', uuid);
      return null;
    }

    const payload = {
      page_url: window.location.href,
      session_id: sessionId || null,
      uuid,
    };

    console.log('[TRACK SESSION PAYLOAD]', payload);

    try {
      const response = await axios.post(`${API_BASE_URL}/track/session`, payload);

      if (response.data.success) {
        sessionId = response.data.session_id;

        if (sessionId) {
          sessionStorage.setItem('session_id', sessionId);
          (window as any).sessionId = sessionId;
        }

        sessionTracked.current = true;
        console.log('✅ Session tracked:', sessionId);
      } else {
        console.warn('⚠️ Session tracking failed response:', response.data);
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

    const uuid = localStorage.getItem('uuid');

    const payload = {
      session_id: sessionId,
      action_type: actionType,
      post_id: postId,
      post_username: postUsername,
      additional_data: additionalData,
      uuid,
    };

    console.log('[TRACK INTERACTION PAYLOAD]', payload);

    try {
      await axios.post(`${API_BASE_URL}/track/interaction`, payload);
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

    const uuid = localStorage.getItem('uuid');

    const payload = {
      session_id: sessionId,
      post_id: postId,
      post_username: postUsername,
      view_duration: viewDuration,
      scroll_percentage: scrollPercentage,
      media_type: mediaType,
      uuid,
    };

    console.log('[TRACK POST VIEW PAYLOAD]', payload);

    try {
      await axios.post(`${API_BASE_URL}/track/post-view`, payload);
      console.log(`✅ Post view tracked: ${postId}`);
    } catch (error) {
      console.error('❌ Post view tracking failed:', error);
    }
  };

  return {
    trackSession,
    ensureSession,
    trackInteraction,
    trackPostView,
  };
};
