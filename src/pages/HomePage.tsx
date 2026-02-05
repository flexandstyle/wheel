import { useNavigate } from 'react-router-dom';
import { SpinDrum } from '../components';
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

  if (filteredRestaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-3xl card-shadow p-8 text-center max-w-sm">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Нет подходящих заведений
          </h3>
          <p className="text-gray-500 mb-6">
            Попробуйте изменить фильтры
          </p>
          <button
            onClick={() => setFilterModalOpen(true)}
            className="w-full py-4 rounded-2xl gradient-accent text-white font-semibold"
          >
            Настроить фильтры
          </button>
        </div>
      </div>
    );
  }

  return (
    <SpinDrum
      restaurants={filteredRestaurants}
      onSpinEnd={handleSpinEnd}
      isSpinning={isSpinning}
      onSpinStart={handleSpinStart}
      spinsRemaining={spinsRemaining}
      onOpenFilters={() => setFilterModalOpen(true)}
      hasActiveFilters={hasActiveFilters}
    />
  );
}
