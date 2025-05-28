'use client';

import { useState } from 'react';
import { FiHome, FiFileText, FiPlusCircle, FiBookmark, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { label: 'Home', icon: <FiHome />, href: '/home' },
    { label: 'Notes', icon: <FiFileText />, href: '/notes' },
    { label: 'New Note', icon: <FiPlusCircle />, href: '/new' },
    { label: 'Pinned', icon: <FiBookmark />, href: '#' },
    { label: 'Export', icon: <FiDownload />, href: '#', className: 'text-red-300' },
  ];

  return (
    <div className={`h-full fixed bg-teal-600 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex flex-col h-full">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src="/logo.png"
            alt="NoteWeave Logo"
            className={`w-auto ${collapsed ? 'h-10' : 'h-40'}`}
          />
          {!collapsed && <span className="mt-2 text-xl font-semibold">NoteWeave</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map(({ label, icon, href, className }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`flex items-center py-2 px-4 hover:bg-teal-700 rounded transition-all ${className || ''}`}
                >
                  <span className="text-lg">{icon}</span>
                  {!collapsed && <span className="ml-3">{label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse button */}
        <div className="pt-4 text-sm text-gray-300 border-t border-teal-500">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center py-2 hover:bg-teal-700 rounded"
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </button>
          {!collapsed && <p className="text-center mt-2">version 1.0</p>}
        </div>
      </div>
    </div>
  );
}
