import { create } from "zustand";

interface SubscriptionStore {
  subscription: boolean;
  setSubscription: (subscription: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscription: false,
  setSubscription: (subscription) => set({ subscription }),
}));
