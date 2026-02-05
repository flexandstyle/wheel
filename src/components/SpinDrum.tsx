import { useEffect, useState, useCallback } from 'react';
import type { Restaurant } from '../types';

interface SpinDrumProps {
  restaurants: Restaurant[];
  onSpinEnd: (restaurant: Restaurant) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

export function SpinDrum({
  restaurants,
  onSpinEnd,
  isSpinning,
  onSpinStart,
}: SpinDrumProps) {
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const itemHeight = 80;
  const visibleItems = 5;

  // Создаём расширенный список для бесконечной прокрутки
  const extendedList = [...restaurants, ...restaurants, ...restaurants, ...restaurants, ...restaurants];

  const spin = useCallback(() => {
    if (restaurants.length === 0) return;

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const baseOffset = restaurants.length * 2 * itemHeight;
    const targetOffset = baseOffset + randomIndex * itemHeight;
    const extraSpins = (Math.floor(Math.random() * 3) + 3) * restaurants.length * itemHeight;

    setSelectedIndex(null);
    setOffset(targetOffset + extraSpins);

    setTimeout(() => {
      setSelectedIndex(randomIndex);
      onSpinEnd(restaurants[randomIndex]);
    }, 3500);
  }, [restaurants, itemHeight, onSpinEnd]);

  useEffect(() => {
    if (isSpinning) {
      spin();
    }
  }, [isSpinning, spin]);

  return (
    <div className="flex flex-col items-center">
      {/* Drum Container */}
      <div className="relative w-full max-w-[320px]">
        {/* Decorative frame */}
        <div className="absolute -inset-4 bg-gradient-to-b from-[#1C1C1E] via-[#2C2C2E] to-[#1C1C1E] rounded-[32px] shadow-2xl" />

        {/* Inner glow */}
        <div className="absolute -inset-2 bg-gradient-to-b from-[#FF6B6B]/20 via-transparent to-[#FF8E53]/20 rounded-[28px] blur-sm" />

        {/* Main drum window */}
        <div className="relative bg-[#1C1C1E] rounded-3xl overflow-hidden border border-white/10">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1C1C1E] via-[#1C1C1E]/80 to-transparent z-10 pointer-events-none" />

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/80 to-transparent z-10 pointer-events-none" />

          {/* Selection indicator */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-20 z-20 pointer-events-none">
            <div className="absolute inset-0 border-y-2 border-[#FF6B6B] bg-gradient-to-r from-[#FF6B6B]/10 via-[#FF8E53]/20 to-[#FF6B6B]/10" />
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-[#FF6B6B] rounded-r-full shadow-lg shadow-[#FF6B6B]/50" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-[#FF6B6B] rounded-l-full shadow-lg shadow-[#FF6B6B]/50" />
          </div>

          {/* Drum track */}
          <div
            className="py-[160px]"
            style={{ height: visibleItems * itemHeight + 'px' }}
          >
            <div
              className="transition-transform duration-[3500ms]"
              style={{
                transform: `translateY(-${offset}px)`,
                transitionTimingFunction: 'cubic-bezier(0.15, 0.85, 0.20, 1)',
              }}
            >
              {extendedList.map((restaurant, index) => {
                const actualIndex = index % restaurants.length;
                const isSelected = selectedIndex === actualIndex && !isSpinning;

                return (
                  <div
                    key={`${restaurant.id}-${index}`}
                    className={`h-20 flex items-center px-5 transition-all duration-300 ${
                      isSelected ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20'
                        : ''
                    }`}>
                      {/* Restaurant icon/image */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${
                        isSelected
                          ? 'gradient-accent text-white scale-110'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400'
                      }`}>
                        {restaurant.name.charAt(0)}
                      </div>

                      {/* Restaurant info */}
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold truncate transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-gray-300'
                        }`}>
                          {restaurant.name}
                        </div>
                        <div className={`text-sm truncate transition-colors duration-300 ${
                          isSelected ? 'text-[#FF8E53]' : 'text-gray-500'
                        }`}>
                          {restaurant.cuisine} • {restaurant.averageCheck}₽
                        </div>
                      </div>

                      {/* Rating */}
                      <div className={`flex items-center gap-1 transition-colors duration-300 ${
                        isSelected ? 'text-yellow-400' : 'text-gray-500'
                      }`}>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative lights */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isSpinning
                  ? 'bg-[#FF6B6B] shadow-lg shadow-[#FF6B6B]/50 animate-pulse'
                  : 'bg-gray-600'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isSpinning
                  ? 'bg-[#FF8E53] shadow-lg shadow-[#FF8E53]/50 animate-pulse'
                  : 'bg-gray-600'
              }`}
              style={{ animationDelay: `${i * 100 + 50}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={onSpinStart}
        disabled={isSpinning || restaurants.length === 0}
        className={`mt-10 relative group ${
          isSpinning || restaurants.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {/* Button glow */}
        <div className={`absolute -inset-1 rounded-full blur-lg transition-opacity duration-300 ${
          isSpinning ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'
        } bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]`} />

        {/* Button */}
        <div className={`relative px-14 py-5 rounded-full font-bold text-lg transition-all duration-300 ${
          isSpinning
            ? 'bg-gray-700 text-gray-400'
            : 'gradient-accent text-white group-hover:scale-105 group-active:scale-95 shadow-xl'
        }`}>
          {isSpinning ? (
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Крутится...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Крутить!
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
