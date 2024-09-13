import useUserStore from '../store/authStore'

export function useLogout() {
	const globalLogout = useUserStore((state) => state.clearUser)

	function logout() {
		//set zustand use to null
		globalLogout()
	}

	return { logout }
}
