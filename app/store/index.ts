import { Character } from "rickmortyapi";
import { create } from "zustand";

export interface Filters {
  species: string[];
  gender: string | null;
  type: string;
  favorites: boolean;
}

interface DataState {
  data: Character[];
  loading: boolean;
  error: string | null;
  filter: Filters;
  setFilter: (key: keyof Filters, value: Filters[keyof Filters]) => void;
  setData: (data: Character[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetFilters: () => void;
  favorites: Array<Character>;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (id: number) => void;
}

const loadState = (key: string, fallback: any) => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : fallback;
  }
  return fallback;
};

export const useDataStore = create<DataState>((set, get) => ({
  data: [],
  favorites: loadState("favorites", []),
  loading: false,
  error: null,
  filter: loadState("filter", {
    type: "",
    gender: null,
    species: [],
    favorites: false,
  }),
  setFilter: (key, value) =>
    set((state) => {
      const newFilter = { ...state.filter, [key]: value };
      localStorage.setItem("filter", JSON.stringify(newFilter));
      return { filter: newFilter };
    }),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetFilters: () => {
    const defaultFilter = {
      type: "",
      gender: null,
      species: [],
      favorites: false,
    };
    localStorage.setItem("filter", JSON.stringify(defaultFilter));
    set({ filter: defaultFilter });
  },
  removeFromFavorites: (id) => {
    const { favorites } = get();
    const newFavorites = favorites.filter((char) => char.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },
  addToFavorites: (char) => {
    const { favorites } = get();
    if (!favorites.some((favorite) => favorite.id === char.id)) {
      const newFavorites = [...favorites, char];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    }
  },
}));
