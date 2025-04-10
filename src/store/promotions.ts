import { Promotion } from "@prisma/client";
import { create } from "zustand";

interface PromotionStore {
  promotions: Promotion[];
  setPromotions: (promotions: Promotion[]) => void;
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (promotion: Promotion) => void;
}

export const usePromotionStore = create<PromotionStore>((set) => ({
  promotions: [],
  setPromotions: (promotions) => set({ promotions }),
  addPromotion: (promotion) => set((state) => ({ promotions: [...state.promotions, promotion] })),
  updatePromotion: (promotion) =>
    set((state) => ({
      promotions: state.promotions.map((p) => (p.id === promotion.id ? promotion : p)),
    })),
}));
