import { Meal } from './../helpers/interface';
import { create } from 'zustand';

interface MealsState {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: number) => void;
  removeAllMeals: (meals: MealsState) => void;
}

const useMealsStore = create<MealsState>((set) => ({
  meals: [],

  addMeal: (meal) =>
    set((state) => ({
      meals: [meal, ...state.meals],
    })),

  removeMeal: (id) =>
    set((state) => ({
      meals: state.meals.filter((meal) => meal.idMeal !== id),
    })),

  removeAllMeals: () =>
    set(() => ({
      meals: [],
    })),

  fetchMeals: (data) => {
    data.forEach((item) => {
      item.isFavorite = false;
    });
    set({ meals: data });
  },
}));

export default useMealsStore;
