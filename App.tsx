import Toast from 'react-native-toast-message'
import { createNativeStackNavigator } from '@react-navigation/native-stack' //https://reactnavigation.org/docs/hello-react-navigation
import { NavigationContainer } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import { List } from './app/screens/List'
import { Login } from './app/screens/Login'

import { toastConfig, useToast } from './app/hooks/useToast'
import useUserStore from './app/store/authStore'

const Stack = createNativeStackNavigator()

interface User {
	uid: string // Unique identifier for the user
	email: string // Email address of the user
	pass: string // Password of the user
}

export default function App() {
	const [user, setUser] = useState<User | null>(null)
	const globalUser = useUserStore((state) => state.user)

	const { showSuccessToast, showErrorToast } = useToast()

	useEffect(() => {
		setUser(globalUser)
		if (globalUser)
			showSuccessToast('Login Successful', `Welcome back, ${globalUser.email}!`)
		else showErrorToast('Login Failed', 'Invalid email or password.')

		console.log('App.js Zustand', globalUser)
	}, [globalUser])

	//Using Stack navigator
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				{user ? (
					<Stack.Screen
						name='My todos'
						component={List}
						options={{ headerShown: false }}
					/>
				) : (
					<Stack.Screen
						name='Login'
						component={Login}
						options={{ headerShown: false }}
					/>
				)}
			</Stack.Navigator>

			{/* Render the Toast component as the last child https://www.npmjs.com/package/react-native-toast-message*/}
			<Toast config={toastConfig} />
		</NavigationContainer>
	)
}
