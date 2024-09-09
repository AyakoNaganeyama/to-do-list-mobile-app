import { create } from 'zustand'

interface UserState {
	user: { uid: string; email: string; pass: string } | null
	setUser: (user: { uid: string; email: string; pass: string }) => void
	clearUser: () => void
}

// Create the Zustand store
const useUserStore = create<UserState>((set) => ({
	user: null, // Initial state
	setUser: (user) => set({ user }), // Set user data
	clearUser: () => set({ user: null }), // Clear user data
}))

export default useUserStore
