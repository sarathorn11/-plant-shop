import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
