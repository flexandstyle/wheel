import { useStore } from '../store/useStore';

export function ProfilePage() {
  const { spinsRemaining, favorites } = useStore();

  return (
    <div className="px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl card-shadow p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center">
            <span className="text-3xl text-white font-bold">V</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Гость</h2>
            <p className="text-gray-500">Добро пожаловать в VibeWheel!</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="text-3xl font-bold gradient-text">{spinsRemaining}</div>
          <p className="text-gray-500 mt-1">Прокруток</p>
        </div>
        <div className="bg-white rounded-2xl card-shadow p-5">
          <div className="text-3xl font-bold gradient-text">{favorites.length}</div>
          <p className="text-gray-500 mt-1">В избранном</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        <MenuItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
          label="Уведомления"
        />
        <MenuItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Настройки"
        />
        <MenuItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="Помощь"
        />
        <MenuItem
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="О приложении"
          isLast
        />
      </div>

      {/* Version */}
      <p className="text-center text-gray-400 text-sm mt-6">
        VibeWheel v1.0.0
      </p>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  isLast?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-200 ${
        !isLast ? 'border-b border-gray-100' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-900 font-medium">{label}</span>
      </div>
      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
