import React from 'react'
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { useState } from 'react'

import { useLogin } from '../hooks/useLogin'
import { useSignUp } from '../hooks/useSignup'
import { useToast } from '../hooks/useToast'

export function Login() {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [errors, setErrors] = useState({ email: '', pass: '' })

	const { login } = useLogin()
	const { signUp } = useSignUp()
	const { showSuccessToast, showErrorToast } = useToast()

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const validatePassword = (pass) => pass.length >= 6

	const handleSignUp = async () => {
		if (!validateEmail(email)) {
			setErrors({ ...errors, email: 'Invalid email format.' })
			return
		}

		if (!validatePassword(pass)) {
			setErrors({ ...errors, pass: 'Password must be at least 6 characters.' })
			return
		}

		const signedUpUser = await signUp(email, pass)
		console.log('user signed up:', signedUpUser)
		if (signedUpUser)
			showSuccessToast('SignUp Successful', `Welcome, ${signedUpUser.email}!`)
		else showErrorToast('SignUp Failed', 'Error creating account.')
	}

	async function handleLogin() {
		if (!validateEmail(email)) {
			setErrors({ ...errors, email: 'Invalid email format.' })
			return
		}

		if (!validatePassword(pass)) {
			setErrors({ ...errors, pass: 'Password must be at least 6 characters.' })
			return
		}

		const loggedInUser = await login(email, pass)
		console.log('user logged in:', loggedInUser)

		if (loggedInUser)
			showSuccessToast(
				'Login Successful',
				`Welcome back, ${loggedInUser.email}!`
			)
		else showErrorToast('Login Failed', 'Invalid email or password.')
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<TextInput
						placeholder='enter email'
						onChangeText={(text) => {
							setEmail(text)
							setErrors({ ...errors, email: '' })
						}}
						value={email}
						style={styles.input}
						placeholderTextColor={'gray'}
						keyboardType='email-address'
					/>
					{errors.email ? (
						<Text style={styles.errorText}>{errors.email}</Text>
					) : null}

					<TextInput
						placeholder='enter password'
						onChangeText={(text) => {
							setPass(text)
							setErrors({ ...errors, pass: '' })
						}}
						value={pass}
						style={styles.input}
						placeholderTextColor={'gray'}
						secureTextEntry={true} // Hides password text
					/>
					{errors.pass ? (
						<Text style={styles.errorText}>{errors.pass}</Text>
					) : null}

					<View style={{ marginBottom: 20 }} />

					<TouchableOpacity
						onPress={handleSignUp}
						disabled={email === '' || pass === ''}
						style={[
							styles.Button,
							(email === '' || pass === '') && styles.buttonDisabled,
						]}
					>
						<Text style={styles.buttonText}>Create Account</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={handleLogin}
						disabled={email === '' || pass === ''}
						style={[
							styles.Button,
							(email === '' || pass === '') && styles.buttonDisabled,
						]}
					>
						<Text style={styles.buttonText}>Log in</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
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
	errorText: {
		color: 'red',
		fontSize: 12,
		marginBottom: 10,
	},
})
