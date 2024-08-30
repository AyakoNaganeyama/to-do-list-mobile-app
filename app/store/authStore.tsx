import { create } from "zustand";

interface UserState {
  user: { uid: string; email: string; pass: string } | null;
  setUser: (user: { uid: string; email: string; pass: string }) => void;
  clearUser: () => void;
}

// Create the Zustand store
const useUserStore = create<UserState>((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }), // Set user data
  clearUser: () => set({ user: null }), // Clear user data
}));

export default useUserStore;

// when you reflesh user become null initially so you need to fetch info from local storage
// const useAuthStore = create((set)=>({
//     user:null,
//     login:(user)=>{set({user})},
//     logout:()=>set({user:null}),
//     setUser:(user)=>set({user})

// }))
