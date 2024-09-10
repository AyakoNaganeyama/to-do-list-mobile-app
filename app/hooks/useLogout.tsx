import useUserStore from '../store/authStore'
import { useToast } from '../hooks/useToast'

export function useLogout() {
	const globalLogout = useUserStore((state) => state.clearUser)
	const { showSuccessToast } = useToast()

	function logout() {
		//set zustand use to null
		globalLogout()
		showSuccessToast('Logout Successful', 'You have been logged out.')
	}

	return { logout }
}
