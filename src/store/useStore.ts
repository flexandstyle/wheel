import { create } from 'zustand';
import type { Restaurant, Filters, District, Cuisine } from '../types';
import { restaurants } from '../data/restaurants';

interface AppState {
  // Restaurants
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  favorites: string[];

  // Filters
  filters: Filters;
  isFilterModalOpen: boolean;

  // Wheel
  spinsRemaining: number;
  isSpinning: boolean;

  // Actions
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  setFilterModalOpen: (open: boolean) => void;
  spin: () => void;
  decrementSpins: () => void;
  getFilteredRestaurants: () => Restaurant[];
}

const defaultFilters: Filters = {
  districts: [],
  cuisines: [],
  minBudget: 500,
  maxBudget: 5000,
};

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  restaurants,
  selectedRestaurant: null,
  favorites: [],
  filters: defaultFilters,
  isFilterModalOpen: false,
  spinsRemaining: 3,
  isSpinning: false,

  // Actions
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  setFilterModalOpen: (open) => set({ isFilterModalOpen: open }),

  spin: () => set({ isSpinning: true }),

  decrementSpins: () =>
    set((state) => ({
      spinsRemaining: Math.max(0, state.spinsRemaining - 1),
      isSpinning: false,
    })),

  getFilteredRestaurants: () => {
    const { restaurants, filters } = get();
    return restaurants.filter((restaurant) => {
      // Filter by district
      if (
        filters.districts.length > 0 &&
        !filters.districts.includes(restaurant.district as District)
      ) {
        return false;
      }
      // Filter by cuisine
      if (
        filters.cuisines.length > 0 &&
        !filters.cuisines.includes(restaurant.cuisine as Cuisine)
      ) {
        return false;
      }
      // Filter by budget
      if (
        restaurant.averageCheck < filters.minBudget ||
        restaurant.averageCheck > filters.maxBudget
      ) {
        return false;
      }
      return true;
    });
  },
}));
