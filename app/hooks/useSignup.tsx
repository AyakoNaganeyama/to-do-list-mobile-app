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
			// Retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('users')

			let users: User[]

			if (jsonValue != null) {
				users = JSON.parse(jsonValue)
			} else {
				users = []
			}

			//TODO: REMOVE THIS. CHANGE TO EMAIL ALREADY EXIST
			// check if entered password already exists
			const emailExist = users.some((user) => user.email === email)
			if (emailExist) {
				//if password already exists in database show error toast
				showErrorToast('Sign Up Failed', 'Email already register.')

				return
			}

			// Add the new Todo to the existing list (or to the empty array)

			users.push(newUser)

			// Save the updated list back to AsyncStorage
			const updatedJsonValue = JSON.stringify(users)
			await AsyncStorage.setItem('users', updatedJsonValue)
			globalLogin(newUser)

			console.log('user added successfully:', newUser)

			showSuccessToast('Signup Successful', `Hello, ${newUser.email}!`)

			//This is for testing to see who is in database after adding the new user
			const after = await AsyncStorage.getItem('users')
			console.log(after)
		} catch (err) {
			console.error('Error during sign up:', err)
			showErrorToast('Sign Up Error', 'An error occurred during sign up.')
		} finally {
			setLoading(false)
		}
	}

	return { signUp }
}
