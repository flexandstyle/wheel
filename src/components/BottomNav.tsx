import { NavLink } from 'react-router-dom';

const navItems = [
  {
    path: '/',
    label: 'Колесо',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <line x1="12" y1="3" x2="12" y2="6" strokeWidth="2" />
        <line x1="12" y1="18" x2="12" y2="21" strokeWidth="2" />
        <line x1="3" y1="12" x2="6" y2="12" strokeWidth="2" />
        <line x1="18" y1="12" x2="21" y2="12" strokeWidth="2" />
      </svg>
    ),
  },
  {
    path: '/catalog',
    label: 'Каталог',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    path: '/favorites',
    label: 'Избранное',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Профиль',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-3 py-2 transition-colors duration-200 ${
                isActive
                  ? 'text-transparent bg-clip-text gradient-text'
                  : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={isActive ? 'text-[#FF6B6B]' : 'text-gray-400'}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'gradient-text font-medium' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
