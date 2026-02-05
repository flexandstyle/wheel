import { useNavigate } from 'react-router-dom';
import { RestaurantCard } from '../components';
import { useStore } from '../store/useStore';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { restaurants, favorites, setSelectedRestaurant } = useStore();

  const favoriteRestaurants = restaurants.filter((r) =>
    favorites.includes(r.id)
  );

  const handleRestaurantClick = (restaurant: typeof restaurants[0]) => {
    setSelectedRestaurant(restaurant);
    navigate('/result');
  };

  return (
    <div className="px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Избранное</h1>
        <p className="text-gray-500 mt-1">
          {favoriteRestaurants.length > 0
            ? `${favoriteRestaurants.length} сохранённых заведений`
            : 'Сохраняйте понравившиеся места'}
        </p>
      </div>

      {/* Favorites List */}
      {favoriteRestaurants.length > 0 ? (
        <div className="space-y-4">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => handleRestaurantClick(restaurant)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Пока пусто
          </h3>
          <p className="text-gray-500 text-center max-w-xs mb-6">
            Добавляйте заведения в избранное, нажимая на сердечко
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-6 py-3 gradient-accent text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Перейти в каталог
          </button>
        </div>
      )}
    </div>
  );
}
