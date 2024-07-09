export interface ApiMeal {
  category: string;
  description: string;
  kcal: number;
}

export interface Meal extends ApiMeal {
  id: string;
}

export interface MealMutation {
  category: string;
  description: string;
  kcal: string;
}
