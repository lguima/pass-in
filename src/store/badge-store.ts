import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BadgeStore = {
  email: string
  eventTitle: string
  checkInUrl: string
  image?: string
}

type StateProps = {
  data: BadgeStore | null
  save: (data: BadgeStore) => void
}

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      data: null,
      save: (data: BadgeStore) => set(() => ({ data }))
    }), {
      name: 'nlw-unite:badge',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
