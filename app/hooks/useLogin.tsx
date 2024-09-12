import AsyncStorage from '@react-native-async-storage/async-storage'
import useUserStore from '../store/authStore'

// Define the User type
interface User {
	uid: string
	email: string
	pass: string
}

export function useLogin() {
	// make sure setting and getting same instance
	const { setUser: globalLogin, user: globalUser } = useUserStore((state) => ({
		setUser: state.setUser,
		user: state.user,
	}))

	async function login(email: string, password: string) {
		const jsonValue = await AsyncStorage.getItem('users') // get user data from async storage
		if (jsonValue !== null) {
			const users: User[] = JSON.parse(jsonValue) //covert json string into array of user objects
			// Find the user that matches both email and password
			const foundUser = users.find(
				(user) => user.email === email && user.pass === password
			)

			if (foundUser) {
				//set found user in zustand for global access
				globalLogin(foundUser)
			} else {
				console.log('Login Failed', 'Invalid email or password.')
			}
		}
	}

	return { login }
}
