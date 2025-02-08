// store.ts
import { Character } from "rickmortyapi";
import { create } from "zustand";

export interface Filters {
  species: string[];
  gender: string | null;
  type: string;
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
}

export const useDataStore = create<DataState>((set) => ({
  data: [],
  loading: false,
  error: null,
  filter: {
    type: "",
    gender: null,
    species: [],
  },
  setFilter: (key, value) =>
    set((state) => ({
      filter: {
        ...state.filter,
        [key]: value,
      },
    })),
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetFilters: () =>
    set({
      filter: {
        gender: null,
        species: [],
        type: "",
      },
    }),
}));
