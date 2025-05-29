'use client';

import { useState, useEffect } from 'react';
import SideBar from './sidebar';
import TopBar from './topBar';

export default function LayoutDashboard({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
    }
  }, [isSidebarCollapsed, hydrated]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // Avoid rendering until hydration completes
  if (!hydrated) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <TopBar isSidebarCollapsed={isSidebarCollapsed} />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
