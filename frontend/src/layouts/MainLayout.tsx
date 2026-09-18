import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="container main-content">
        <Outlet />
      </main>
      <footer className="footer container">
        <p>© 2026 eLandRegistry — Securing Land Registration Using Blockchain</p>
      </footer>
    </div>
  );
};
