import { useEffect, useState, useCallback } from 'react';
import type { Restaurant } from '../types';

interface SpinDrumProps {
  restaurants: Restaurant[];
  onSpinEnd: (restaurant: Restaurant) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
  spinsRemaining: number;
  onOpenFilters: () => void;
  hasActiveFilters: boolean;
}

export function SpinDrum({
  restaurants,
  onSpinEnd,
  isSpinning,
  onSpinStart,
  spinsRemaining,
  onOpenFilters,
  hasActiveFilters,
}: SpinDrumProps) {
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const itemHeight = 72;

  // Расширенный список для бесконечной прокрутки
  const extendedList = [...restaurants, ...restaurants, ...restaurants, ...restaurants, ...restaurants];

  const spin = useCallback(() => {
    if (restaurants.length === 0) return;

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const baseOffset = restaurants.length * 2 * itemHeight;
    const targetOffset = baseOffset + randomIndex * itemHeight;
    const extraSpins = (Math.floor(Math.random() * 3) + 4) * restaurants.length * itemHeight;

    setSelectedIndex(null);
    setOffset(targetOffset + extraSpins);

    setTimeout(() => {
      setSelectedIndex(randomIndex);
      onSpinEnd(restaurants[randomIndex]);
    }, 3000);
  }, [restaurants, itemHeight, onSpinEnd]);

  useEffect(() => {
    if (isSpinning) {
      spin();
    }
  }, [isSpinning, spin]);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Куда сегодня?</h1>
        <p className="text-gray-400">Крутите барабан и выбирайте</p>
      </div>

      {/* Main drum area */}
      <div className="flex-1 relative">
        {/* Background card */}
        <div className="absolute inset-x-4 inset-y-0 bg-[#1C1C1E] rounded-[32px] overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#1C1C1E] via-[#1C1C1E]/90 to-transparent z-10" />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/90 to-transparent z-10" />

          {/* Selection highlight - center */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[72px] z-10 pointer-events-none">
            <div className="h-full mx-3 rounded-2xl bg-gradient-to-r from-[#FF6B6B]/20 via-[#FF8E53]/25 to-[#FF6B6B]/20 border border-white/10" />
          </div>

          {/* Drum content */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="w-full transition-transform"
              style={{
                transform: `translateY(-${offset}px)`,
                transitionDuration: isSpinning ? '3000ms' : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.12, 0.8, 0.18, 1)',
              }}
            >
              {extendedList.map((restaurant, index) => {
                const actualIndex = index % restaurants.length;
                const isSelected = selectedIndex === actualIndex && !isSpinning;

                return (
                  <div
                    key={`${restaurant.id}-${index}`}
                    className="h-[72px] flex items-center px-6"
                  >
                    <div className={`flex items-center gap-4 w-full transition-all duration-300 ${
                      isSelected ? 'scale-[1.02]' : ''
                    }`}>
                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'gradient-accent text-white shadow-lg shadow-[#FF6B6B]/30'
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {restaurant.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold truncate transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-white/70'
                        }`}>
                          {restaurant.name}
                        </div>
                        <div className={`text-sm truncate transition-colors duration-300 ${
                          isSelected ? 'text-white/60' : 'text-white/40'
                        }`}>
                          {restaurant.cuisine}
                        </div>
                      </div>

                      {/* Price & Rating */}
                      <div className="text-right flex-shrink-0">
                        <div className={`font-semibold transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-white/70'
                        }`}>
                          {restaurant.averageCheck}₽
                        </div>
                        <div className={`text-sm flex items-center justify-end gap-1 transition-colors duration-300 ${
                          isSelected ? 'text-[#FFD60A]' : 'text-white/40'
                        }`}>
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          {restaurant.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side indicators */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-12 bg-gradient-to-b from-[#FF6B6B] to-[#FF8E53] rounded-r-full" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-12 bg-gradient-to-b from-[#FF6B6B] to-[#FF8E53] rounded-l-full" />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 pt-6 pb-4 space-y-3">
        {/* Spin button */}
        <button
          onClick={onSpinStart}
          disabled={isSpinning || restaurants.length === 0 || spinsRemaining === 0}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            isSpinning || spinsRemaining === 0
              ? 'bg-gray-200 text-gray-400'
              : 'gradient-accent text-white active:scale-[0.98] shadow-lg shadow-[#FF6B6B]/25'
          }`}
        >
          {isSpinning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Выбираем...
            </span>
          ) : spinsRemaining === 0 ? (
            'Прокрутки закончились'
          ) : (
            `Крутить (${spinsRemaining})`
          )}
        </button>

        {/* Filter button */}
        <button
          onClick={onOpenFilters}
          className="w-full py-4 rounded-2xl bg-white font-medium text-gray-700 transition-all duration-200 active:scale-[0.98] card-shadow flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Фильтры
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-[#FF6B6B] rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
