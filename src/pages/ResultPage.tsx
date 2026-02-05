import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function ResultPage() {
  const navigate = useNavigate();
  const { selectedRestaurant, toggleFavorite, favorites } = useStore();

  if (!selectedRestaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-6xl mb-4">🎰</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Сначала покрутите колесо!
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-8 py-3 gradient-accent text-white font-semibold rounded-full"
        >
          К колесу
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(selectedRestaurant.id);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-result">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-result)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="px-4 pt-8 pb-4">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-gray-500 mb-1">Колесо выбрало:</p>
        <h1 className="text-2xl font-bold text-gray-900">Ваш ресторан!</h1>
      </div>

      {/* Restaurant Card */}
      <div className="bg-white rounded-3xl card-shadow overflow-hidden">
        {/* Image */}
        <div className="relative h-56">
          <img
            src={selectedRestaurant.image}
            alt={selectedRestaurant.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => toggleFavorite(selectedRestaurant.id)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          >
            <svg
              className={`w-7 h-7 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill={isFavorite ? 'currentColor' : 'none'}
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedRestaurant.name}
            </h2>
            <div className="flex items-center gap-1">
              {renderStars(selectedRestaurant.rating)}
              <span className="text-gray-600 font-medium ml-1">
                {selectedRestaurant.rating}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {selectedRestaurant.cuisine}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              ~{selectedRestaurant.averageCheck}₽
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {selectedRestaurant.district}
            </span>
          </div>

          {/* Bonus */}
          {selectedRestaurant.bonus && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="font-semibold text-emerald-800">Бонус от заведения</p>
                  <p className="text-emerald-700 text-sm mt-1">
                    {selectedRestaurant.bonus}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-center gap-3 text-gray-600 mb-6">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{selectedRestaurant.address}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-gray-600 mb-6">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${selectedRestaurant.phone}`} className="hover:text-[#FF6B6B]">
              {selectedRestaurant.phone}
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 gradient-accent text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg active:scale-[0.98]">
              Забронировать стол
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
            >
              Крутить ещё раз
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
