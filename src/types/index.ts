export interface Restaurant {
  id: string;
  name: string;
  cuisine: Cuisine;
  rating: number;
  averageCheck: number;
  district: District;
  address: string;
  image: string;
  bonus: string;
  phone: string;
}

export type Cuisine =
  | 'Итальянская'
  | 'Японская'
  | 'Грузинская'
  | 'Русская'
  | 'Азиатская'
  | 'Европейская';

export type District =
  | 'Центр'
  | 'Север'
  | 'Юг'
  | 'Запад'
  | 'Восток';

export interface Filters {
  districts: District[];
  cuisines: Cuisine[];
  minBudget: number;
  maxBudget: number;
}

export interface WheelSegment {
  id: string;
  name: string;
  color: string;
}
