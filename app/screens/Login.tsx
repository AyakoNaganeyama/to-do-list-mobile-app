import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useState } from 'react'
import useUserStore from '../store/authStore'
import useLogin from '../hooks/useLogin'
import useSignUp from '../hooks/useSignup'

interface User {
	uid: string
	email: string
	pass: string
}

const Login = () => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const { login } = useLogin() //return login logic from the hook
	const { signUp } = useSignUp() //return sign up logic from the hook

	// Access the user state from Zustand store
	const globalUser = useUserStore((state) => state.user)

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
					onPress={() => login(email, pass)}
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

export default Login

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#080404',
	},
	container: {
		width: '80%',
		paddingHorizontal: 10,
	},
	input: {
		borderRadius: 10,
		height: 50,
		borderWidth: 2,
		width: '100%',
		marginBottom: 10,
		padding: 5,
		borderColor: '#6c7cac',
		backgroundColor: '#3f4145',
		color: '#fff',
	},

	Button: {
		backgroundColor: '#6c7cac',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		marginHorizontal: 30,
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
