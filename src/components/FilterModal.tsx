import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { cuisines, districts } from '../data/restaurants';
import type { Cuisine, District } from '../types';

export function FilterModal() {
  const {
    isFilterModalOpen,
    setFilterModalOpen,
    filters,
    setFilters,
    resetFilters,
  } = useStore();

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isFilterModalOpen]);

  if (!isFilterModalOpen) return null;

  const toggleDistrict = (district: District) => {
    setLocalFilters((prev) => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter((d) => d !== district)
        : [...prev.districts, district],
    }));
  };

  const toggleCuisine = (cuisine: Cuisine) => {
    setLocalFilters((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    setFilterModalOpen(false);
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      districts: [],
      cuisines: [],
      minBudget: 500,
      maxBudget: 5000,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setFilterModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[430px] bg-white rounded-t-3xl p-6 pb-10 animate-slide-up">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full" />

        <h2 className="text-xl font-bold text-gray-900 mt-4 mb-6">Настроить фильтры</h2>

        {/* Districts */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Район</h3>
          <div className="flex flex-wrap gap-2">
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => toggleDistrict(district as District)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  localFilters.districts.includes(district as District)
                    ? 'gradient-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Тип кухни</h3>
          <div className="flex flex-wrap gap-2">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine as Cuisine)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  localFilters.cuisines.includes(cuisine as Cuisine)
                    ? 'gradient-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Бюджет: {localFilters.minBudget}₽ — {localFilters.maxBudget}₽
          </h3>
          <div className="relative">
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={localFilters.minBudget}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minBudget: Math.min(Number(e.target.value), prev.maxBudget - 500),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B6B]"
            />
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={localFilters.maxBudget}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxBudget: Math.max(Number(e.target.value), prev.minBudget + 500),
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B6B] mt-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold transition-all duration-200 hover:bg-gray-200 active:scale-95"
          >
            Сбросить
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-4 rounded-2xl gradient-accent text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Применить
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
