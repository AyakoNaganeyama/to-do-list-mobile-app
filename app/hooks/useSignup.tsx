import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useState } from 'react'

import useUserStore from '../store/authStore'
import { useToast } from '../hooks/useToast'

// Define the User type
interface User {
	uid: string
	email: string
	pass: string
}

export function useSignUp() {
	const [loading, setLoading] = useState(false)
	const { showSuccessToast, showErrorToast } = useToast()
	const globalLogin = useUserStore((state) => state.setUser)

	async function signUp(email: string, password: string) {
		setLoading(true)

		const newUser: User = {
			uid: uuid.v4() as string,
			email: email,
			pass: password,
		}

		try {
			// get existing users form storage
			const jsonValue = await AsyncStorage.getItem('users')

			let users: User[]

			if (jsonValue != null) {
				users = JSON.parse(jsonValue)
			} else {
				users = []
			}

			// check email already exists
			const emailExist = users.some((user) => user.email === email)
			if (emailExist) {
				// check if email exists in database show error toast
				showErrorToast('Sign Up Failed', 'Email already registered.')
				return false // return false if email exists
			}

			// add new user to the storage
			users.push(newUser)

			// Save the updated list back to AsyncStorage
			const updatedJsonValue = JSON.stringify(users)
			await AsyncStorage.setItem('users', updatedJsonValue)
			globalLogin(newUser)

			console.log('User added successfully:', newUser)

			showSuccessToast('Signup Successful', `Hello, ${newUser.email}!`)

			// Check if the user was successfully stored
			const userStored = await AsyncStorage.getItem('users')
			if (userStored) {
				const storedUsers = JSON.parse(userStored)
				const userExists = storedUsers.some(
					(user: User) => user.email === email
				)

				if (userExists) return newUser
			}

			return false // Return false if user was not stored correctly
		} catch (err) {
			console.error('Error during sign up:', err)
			showErrorToast('Sign Up Error', 'An error occurred during sign up.')
			return false // Return false on error
		} finally {
			setLoading(false)
		}
	}

	return { signUp }
}
