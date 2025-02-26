import { Meal } from './../helpers/interface';
import { create } from 'zustand';
import { faker } from '@faker-js/faker';

interface MealsState {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  setFavoriteMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  removeAllMeals: (meals: MealsState) => void;
  fetchMeals: (data: Meal[]) => void;
}

const useMealsStore = create<MealsState>((set) => ({
  meals: [],

  addMeal: (meal) =>
    set((state) => ({
      meals: [meal, ...state.meals],
    })),

  setFavoriteMeal: (meal) =>
    set((state) => ({
      meals: state.meals.map((item) => (item.idMeal === meal.idMeal ? meal : item)),
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
      item.isFavorite = faker.datatype.boolean(0.5);
    });
    set({ meals: data });
  },
}));

export default useMealsStore;
