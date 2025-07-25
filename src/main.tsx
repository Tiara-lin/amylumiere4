import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ✅ 新增：擷取 URL 中的 UUID 並存入 localStorage
const params = new URLSearchParams(window.location.search);
const uuid = params.get('uuid') || params.get('pid');  // 支援 ?pid=
if (uuid) {
  localStorage.setItem('uuid', uuid);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
