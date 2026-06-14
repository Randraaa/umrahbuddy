import React from 'react';
import { Compass, UserCheck, MessageSquare, LayoutDashboard, UserPlus } from 'lucide-react';

export default function Header({ currentView, setView, currentUser, setRole }) {
  return (
    <header className="main-header">
      <div className="container header-container">
        <button onClick={() => setView('home')} className="logo">
          <span className="logo-icon">🕋</span>
          <span className="logo-text">Umrah<span className="logo-accent">Buddy</span></span>
        </button>

        <nav className="nav-links">
          <button 
            onClick={() => setView('home')} 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => setView('search')} 
            className={`nav-item ${currentView === 'search' ? 'active' : ''}`}
          >
            Cari Guide
          </button>
          {currentUser.role !== 'visitor' && (
            <button 
              onClick={() => setView('dashboard')} 
              className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          )}
        </nav>

        <div className="header-actions">
          {currentUser.role === 'visitor' ? (
            <button onClick={() => setView('onboarding')} className="btn btn-primary btn-sm">
              <UserPlus size={16} />
              <span>Daftar Sekarang</span>
            </button>
          ) : (
            <div className="role-badge-pill">
              <UserCheck size={14} />
              <span>{currentUser.role === 'pilgrim' ? 'Jamaah' : 'Muthawwif'}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
