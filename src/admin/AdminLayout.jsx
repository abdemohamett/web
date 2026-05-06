import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { path: '/admin/settings', label: 'Settings', icon: 'settings' },
    { path: '/admin/projects', label: 'Projects', icon: 'work' },
    { path: '/admin/skills', label: 'Skills', icon: 'school' },
    { path: '/admin/experiences', label: 'Experience', icon: 'history' },
    { path: '/admin/services', label: 'Services', icon: 'stars' },
    { path: '/admin/principles', label: 'Principles', icon: 'lightbulb' },
    { path: '/admin/social', label: 'Social', icon: 'link' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="h2">Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/')} className="nav-item">
            <span className="material-symbols-outlined">home</span>
            <span className="nav-label">View Site</span>
          </button>
          <button onClick={handleLogout} className="nav-item logout">
            <span className="material-symbols-outlined">logout</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
