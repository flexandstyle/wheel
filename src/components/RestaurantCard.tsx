import type { Restaurant } from '../types';
import { useStore } from '../store/useStore';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
  compact?: boolean;
}

export function RestaurantCard({ restaurant, onClick, compact = false }: RestaurantCardProps) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(restaurant.id);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl card-shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="relative h-32">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(restaurant.id);
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill={isFavorite ? 'currentColor' : 'none'}
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 truncate">{restaurant.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(restaurant.rating)}
            <span className="text-sm text-gray-500 ml-1">{restaurant.rating}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {restaurant.cuisine}
            </span>
            <span className="text-sm font-medium text-gray-700">
              ~{restaurant.averageCheck}₽
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl card-shadow overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="relative h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <svg
            className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            fill={isFavorite ? 'currentColor' : 'none'}
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1">
            {renderStars(restaurant.rating)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {restaurant.cuisine}
          </span>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            ~{restaurant.averageCheck}₽
          </span>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {restaurant.district}
          </span>
        </div>
        {restaurant.bonus && (
          <div className="mt-3 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm">
            🎁 {restaurant.bonus}
          </div>
        )}
        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {restaurant.address}
        </div>
      </div>
    </div>
  );
}
