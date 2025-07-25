import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Suggestions from './components/Suggestions';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { useMaxScrollTracker } from './hooks/useMaxScrollTracker';
import { useAnalytics } from './hooks/useAnalytics'; // ✅ 新增

function App() {

  const analytics = useAnalytics(); // ✅ 統一呼叫
  useMaxScrollTracker();

  // ✅ UUID 驗證（含格式）
 useEffect(() => {
  let uuid = localStorage.getItem('uuid');

  const isValidUUID = uuid &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);

  if (!isValidUUID) {
    uuid = crypto.randomUUID(); // ✅ 產生新的 UUID
    localStorage.setItem('uuid', uuid);
    console.log('✅ New UUID generated and saved:', uuid);
  }
}, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-screen-lg mx-auto pt-16 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Main content */}
          <div className="w-full lg:flex-1">
            <Stories />
            {/* ✅ 傳入 analytics props */}
            <Feed analytics={analytics} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-[320px] pt-4 sticky top-20">
            <Profile 
              username="beautyamy.ai"
              name="Amy Lumiere"
              imageUrl="https://i.ibb.co/ymN2m0CM/20250502-0208-image.png"
            />
            <Suggestions />
            <Footer />
          </div>
        </div>
      </main>

      {/* 隱藏 analytics 組件，但仍會發送 API 請求 */}
      <div style={{ display: 'none' }}>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}

export default App;
