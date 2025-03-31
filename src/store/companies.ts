import { CompanyType } from "@/features/companies/types";
import { create } from "zustand";

interface CompanyStore {
  companies: CompanyType[];
  setCompanies: (companies: CompanyType[]) => void;
  addCompany: (company: CompanyType) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
  addCompany: (company) => set((state) => ({ companies: [...state.companies, company] })),
}));
