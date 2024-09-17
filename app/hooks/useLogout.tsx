import useUserStore from '../store/authStore'

export function useLogout() {
	const { clearUser, setUser, user } = useUserStore(
		({ clearUser, setUser, user }) => ({
			clearUser,
			setUser,
			user,
		})
	)

	function logout() {
		//set zustand use to null
		clearUser()

		return user
	}

	return { logout }
}
