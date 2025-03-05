import { Meal } from './../helpers/interface';
import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { INITIAL_PAGE } from '@/helpers';

interface MealsState {
  meals: Meal[];
  currentPage: number;
  fetchMeals: (data: Meal[]) => void;
  addMeal: (meal: Meal) => void;
  setFavoriteMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  removeAllMeals: (meals: MealsState) => void;
  setCurrentPage: (page: number) => void;
}

const useMealsStore = create<MealsState>((set) => ({
  meals: [],
  searchQuery: '',
  filterCategory: '',
  currentPage: INITIAL_PAGE,

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

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useMealsStore;
