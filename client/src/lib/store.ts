import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ingredient, Recipe } from './types';

// Simple ID generator
const generateId = () => Math.random().toString(36).substring(2, 9);

interface AppState {
  pantry: Ingredient[];
  savedRecipes: Recipe[];
  addIngredient: (name: string) => void;
  removeIngredient: (id: string) => void;
  toggleSaveRecipe: (recipe: Recipe) => void;
  isSaved: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      pantry: [],
      savedRecipes: [],
      addIngredient: (name) => set((state) => ({
        pantry: [...state.pantry, { id: generateId(), name }]
      })),
      removeIngredient: (id) => set((state) => ({
        pantry: state.pantry.filter((item) => item.id !== id)
      })),
      toggleSaveRecipe: (recipe) => set((state) => {
        const isAlreadySaved = state.savedRecipes.some(r => r.id === recipe.id);
        if (isAlreadySaved) {
          return { savedRecipes: state.savedRecipes.filter(r => r.id !== recipe.id) };
        } else {
          return { savedRecipes: [...state.savedRecipes, recipe] };
        }
      }),
      isSaved: (id) => get().savedRecipes.some(r => r.id === id),
    }),
    {
      name: 'cookmate-storage',
    }
  )
);
