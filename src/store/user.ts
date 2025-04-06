// import { User } from "better-auth";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface UserStore {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   getUser: () => User | null;
// }

// export const useUserStore = create<UserStore>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       setUser: (user: User | null) => set({ user }),
//       getUser: () => get().user,
//     }),
//     {
//       name: "user-storage",
//     }
//   )
// );
