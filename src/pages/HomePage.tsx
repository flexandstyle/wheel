import { useNavigate } from 'react-router-dom';
import { FortuneWheel } from '../components';
import { useStore } from '../store/useStore';
import type { Restaurant } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const {
    getFilteredRestaurants,
    setFilterModalOpen,
    spinsRemaining,
    isSpinning,
    spin,
    decrementSpins,
    setSelectedRestaurant,
    filters,
  } = useStore();

  const filteredRestaurants = getFilteredRestaurants();
  const hasActiveFilters =
    filters.districts.length > 0 ||
    filters.cuisines.length > 0 ||
    filters.minBudget > 500 ||
    filters.maxBudget < 5000;

  const handleSpinStart = () => {
    if (spinsRemaining > 0 && !isSpinning && filteredRestaurants.length > 0) {
      spin();
    }
  };

  const handleSpinEnd = (restaurant: Restaurant) => {
    decrementSpins();
    setSelectedRestaurant(restaurant);
    navigate('/result');
  };

  return (
    <div className="flex flex-col items-center px-4 pt-12 pb-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">VibeWheel</h1>
        <p className="text-gray-500 text-lg">Куда сегодня?</p>
      </div>

      {/* Spins counter */}
      <div className="bg-white rounded-2xl px-6 py-3 card-shadow mb-6">
        <p className="text-gray-600">
          Осталось прокруток:{' '}
          <span className="font-bold gradient-text">{spinsRemaining}</span>
        </p>
      </div>

      {/* Wheel or empty state */}
      {filteredRestaurants.length > 0 ? (
        <FortuneWheel
          restaurants={filteredRestaurants}
          onSpinEnd={handleSpinEnd}
          isSpinning={isSpinning}
          onSpinStart={handleSpinStart}
        />
      ) : (
        <div className="bg-white rounded-3xl card-shadow p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Нет подходящих заведений
          </h3>
          <p className="text-gray-500 mb-4">
            Попробуйте изменить фильтры
          </p>
        </div>
      )}

      {/* Filter button */}
      <button
        onClick={() => setFilterModalOpen(true)}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-white rounded-full card-shadow text-gray-700 font-medium transition-all duration-200 hover:bg-gray-50 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Настроить фильтры
        {hasActiveFilters && (
          <span className="w-2 h-2 bg-[#FF6B6B] rounded-full" />
        )}
      </button>

      {/* Disabled state message */}
      {spinsRemaining === 0 && (
        <div className="mt-6 bg-amber-50 rounded-2xl px-6 py-4 text-center">
          <p className="text-amber-800 font-medium">
            Прокрутки закончились!
          </p>
          <p className="text-amber-600 text-sm mt-1">
            Вернитесь завтра для новых прокруток
          </p>
        </div>
      )}
    </div>
  );
}
