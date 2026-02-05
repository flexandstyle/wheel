import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantCard } from '../components';
import { useStore } from '../store/useStore';
import { cuisines } from '../data/restaurants';
import type { Cuisine } from '../types';

export function CatalogPage() {
  const navigate = useNavigate();
  const { restaurants, setSelectedRestaurant } = useStore();
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | 'all'>('all');

  const filteredRestaurants =
    selectedCuisine === 'all'
      ? restaurants
      : restaurants.filter((r) => r.cuisine === selectedCuisine);

  const handleRestaurantClick = (restaurant: typeof restaurants[0]) => {
    setSelectedRestaurant(restaurant);
    navigate('/result');
  };

  return (
    <div className="px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Каталог</h1>
        <p className="text-gray-500 mt-1">Все заведения города</p>
      </div>

      {/* Filters */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <button
            onClick={() => setSelectedCuisine('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCuisine === 'all'
                ? 'gradient-accent text-white'
                : 'bg-white text-gray-700 card-shadow'
            }`}
          >
            Все
          </button>
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine as Cuisine)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCuisine === cuisine
                  ? 'gradient-accent text-white'
                  : 'bg-white text-gray-700 card-shadow'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant)}
            compact
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Нет заведений
          </h3>
          <p className="text-gray-500">
            По выбранным фильтрам ничего не найдено
          </p>
        </div>
      )}
    </div>
  );
}
