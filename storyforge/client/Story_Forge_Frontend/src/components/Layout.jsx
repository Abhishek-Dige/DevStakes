import React from 'react';
import { 
  BookOpen, 
  Library, 
  BarChart3, 
  Network, 
  UserCircle, 
  Plus,
  Share2,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="layout-root">
      {/* TopAppBar */}
      <header className="top-app-bar glass-panel shadow-2xl">
        <div className="header-left">
          <div 
            className="brand-logo text-glow-primary cursor-pointer pr-5 border-r border-white/10"
            onClick={() => navigate('/', { state: { transition: 'push_back' } })}
          >
            StoryForge
          </div>
          
          <nav className="header-nav">
            <NavLink 
              icon={<BookOpen size={16} />} 
              label="Home" 
              active={currentPath === '/' || currentPath === '/landing'} 
              onClick={() => navigate('/', { state: { transition: 'push_back' } })}
            />
            <NavLink 
              icon={<Library size={16} />} 
              label="Library" 
              active={currentPath === '/genre-selection'} 
              onClick={() => navigate('/genre-selection', { state: { transition: 'push_back' } })}
            />
            <NavLink 
              icon={<BarChart3 size={16} />} 
              label="Stats" 
              active={currentPath === '/stats'} 
              onClick={() => navigate('/stats')}
            />
            <NavLink 
              icon={<Network size={16} />} 
              label="Nexus" 
              active={currentPath === '/community-hub'} 
              onClick={() => navigate('/community-hub', { state: { transition: 'push_back' } })}
            />
          </nav>
        </div>

        <div className="header-right gap-4">
          <button 
            className="primary-btn flex items-center gap-2 text-xs py-1.5 px-4" 
            onClick={() => navigate('/create-story', { state: { transition: 'push' } })}
          >
            <Plus size={14} />
            <span>Create Story</span>
          </button>
          
          <div className="header-avatar-wrapper" onClick={() => navigate('/identity', { state: { transition: 'slide_up' } })}>
            <img 
              src="/assets/profile-avatar.png" 
              alt="Profile"
            />
          </div>
        </div>
      </header>



      <main className="main-content-no-sidebar min-h-screen">
        {children}
      </main>

      {/* Visual Partition */}
      <div className="footer-partition">
        <div className="partition-core"></div>
        <div className="partition-glow"></div>
      </div>

      {/* Mega Footer */}
      <footer className="footer-container relative">
        <div className="mega-footer-content w-full max-w-7xl mx-auto">
          {/* Bottom Grid */}
          <div className="footer-grid-section pt-8">
            <div className="footer-brand-col">
              <div className="footer-brand font-headline text-2xl text-glow-primary mb-4">StoryForge</div>
              <p className="footer-copy opacity-60 text-sm max-w-xs mb-6">
                Redefining the boundaries of interactive narrative. The AI orchestrates, you decide the fate.
              </p>
              <div className="footer-socials flex gap-4">
                <button className="social-btn transition-transform hover:-translate-y-1 hover:text-primary">
                  <Share2 size={20} />
                </button>
                <button className="social-btn transition-transform hover:-translate-y-1 hover:text-primary">
                  <Globe size={20} />
                </button>
              </div>
            </div>

            <div className="footer-links-col">
              <span className="footer-link-header font-headline uppercase tracking-widest text-primary mb-6 block">Ecosystem</span>
              <div className="flex flex-col gap-4">
                <a className="footer-link cursor-pointer hover:text-white transition-colors">Neural Lore</a>
                <a className="footer-link cursor-pointer hover:text-white transition-colors">Architects Hub</a>
                <a className="footer-link cursor-pointer hover:text-white transition-colors">Data Streams</a>
              </div>
            </div>

            <div className="footer-links-col">
              <span className="footer-link-header font-headline uppercase tracking-widest text-primary mb-6 block">Protocols</span>
              <div className="flex flex-col gap-4">
                <a className="footer-link cursor-pointer hover:text-white transition-colors">Terms of Sync</a>
                <a className="footer-link cursor-pointer hover:text-white transition-colors">Privacy Paradigm</a>
                <a className="footer-link cursor-pointer hover:text-white transition-colors">System Status</a>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="footer-copyright-bar flex justify-between items-center pt-8 mt-12 border-t border-white/5 opacity-40 text-xs uppercase tracking-widest">
            <span>© 2026 StoryForge AI Core. All metrics optimal.</span>
            <span>v2.0.4-beta</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ icon, label, active, onClick }) {
  return (
    <button
      className={`header-nav-link ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div 
      className={`nav-item flex flex-col items-center gap-1 cursor-pointer transition-all ${
        active ? 'active' : 'inactive'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="nav-label uppercase tracking-widest">{label}</span>
    </div>
  );
}
