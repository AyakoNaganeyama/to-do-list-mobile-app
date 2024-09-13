import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { useState } from 'react'

import { useLogin } from '../hooks/useLogin'
import { useSignUp } from '../hooks/useSignup'
import { useToast } from '../hooks/useToast'

export function Login() {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')

	const { login } = useLogin() //return login logic from the hook
	const { signUp } = useSignUp() //return sign up logic from the hook

	const { showSuccessToast, showErrorToast } = useToast()

	async function handleLogin() {
		const loggedInUser = await login(email, pass)

		if (loggedInUser)
			showSuccessToast(
				'Login Successful',
				`Welcome back, ${loggedInUser.email}!`
			)
		else showErrorToast('Login Failed', 'Invalid email or password.')
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<TextInput
					placeholder='enter email'
					onChangeText={(text: string) => setEmail(text)}
					value={email}
					style={styles.input}
					placeholderTextColor={'gray'}
				/>
				<TextInput
					placeholder='enter password'
					onChangeText={(text: string) => setPass(text)}
					value={pass}
					style={styles.input}
					placeholderTextColor={'gray'}
				/>
				<View style={{ marginBottom: 20 }} />

				<TouchableOpacity
					onPress={() => signUp(email, pass)}
					disabled={email === '' || pass === ''}
				></TouchableOpacity>

				<TouchableOpacity
					onPress={() => signUp(email, pass)}
					disabled={email === '' || pass === ''}
					style={[
						styles.Button,
						(email === '' || pass === '') && styles.buttonDisabled, // Apply disabled style conditionally
					]}
				>
					<Text style={styles.buttonText}>Create Account</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleLogin}
					disabled={email === '' || pass === ''}
					style={[
						styles.Button,
						(email === '' || pass === '') && styles.buttonDisabled, // Apply disabled style conditionally
					]}
				>
					<Text style={styles.buttonText}>Log in</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		alignItems: 'center',
		backgroundColor: '#080404',
		flex: 1,
		justifyContent: 'center',
	},
	container: {
		paddingHorizontal: 10,
		width: '80%',
	},
	input: {
		backgroundColor: '#3f4145',
		borderColor: '#6c7cac',
		borderRadius: 10,
		borderWidth: 2,
		color: '#fff',
		height: 50,
		marginBottom: 10,
		padding: 5,
		width: '100%',
	},
	Button: {
		alignItems: 'center',
		backgroundColor: '#6c7cac',
		borderRadius: 10,
		justifyContent: 'center',
		marginBottom: 10,
		marginHorizontal: 30,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	buttonDisabled: {
		backgroundColor: '#8e979e',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
})
