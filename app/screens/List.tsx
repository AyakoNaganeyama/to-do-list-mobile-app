import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
	Button,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useState } from 'react'

import { Details } from './Details'
import { useLogout } from '../hooks/useLogout'
import { useTodos } from '../hooks/useTodos'
import { useToast } from '../hooks/useToast'

// todo class
export interface Todo {
	title: string
	done: boolean
	id: string
	uid: string
}

//todo list page
export function List() {
	const [todo, setTodo] = useState('') // each todo
	const [modalVisible, setModalVisible] = useState(false)
	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

	const { todos, addTodo, toggleDone, deleteTodo } = useTodos()
	const { logout } = useLogout()
	const { showSuccessToast } = useToast()

	function handleAddTodo() {
		addTodo(todo, () => setTodo('')) // setTodo function is call back
	}

	function handleOpenModal(todo: Todo) {
		setSelectedTodo(todo)
		setModalVisible(true)
	}

	function handleCloseModal() {
		setModalVisible(false)
		setSelectedTodo(null)
	}

	function handleLogout() {
		logout()
		showSuccessToast('Logout Successful', 'You have been logged out.')
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				{/*todos*/}
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.todos}>
						<View style={styles.inputHead}>
							<TextInput
								placeholder='Add new todo'
								onChangeText={(text) => setTodo(text)}
								value={todo}
								placeholderTextColor='gray'
								style={styles.input}
							/>

							<TouchableOpacity
								onPress={handleAddTodo}
								disabled={todo === ''}
								style={[styles.AddButton, todo === '' && styles.buttonDisabled]}
							>
								<Text style={styles.buttonText}>+Add</Text>
							</TouchableOpacity>
						</View>

						{/* Render the todos list using .map */}
						{todos.length > 0 && (
							<View>
								{todos.map((item) => (
									<View key={item.id} style={styles.todoItem}>
										<TouchableOpacity
											onPress={() => toggleDone(item.id)}
											style={{
												flexDirection: 'row',

												alignItems: 'center',
												gap: 10,
											}}
										>
											{!item.done ? (
												<Ionicons
													name='checkmark-circle'
													size={24}
													color='#6c7cac'
												/>
											) : (
												<Entypo name='circle' size={24} color='#6c7cac' />
											)}
											<TouchableOpacity onPress={() => handleOpenModal(item)}>
												<Text style={{ color: 'white', fontSize: 16 }}>
													{item.title} {item.id}
												</Text>
											</TouchableOpacity>
										</TouchableOpacity>
										<Ionicons
											name='trash-bin-outline'
											size={24}
											color='red'
											onPress={() => deleteTodo(item.id)}
										/>
									</View>
								))}
							</View>
						)}
					</View>
				</ScrollView>

				{/* Fixed Logout Button at the Bottom */}
				<View style={styles.logoutButtonContainer}>
					<Button onPress={handleLogout} title='Logout' />
				</View>
			</View>
			{selectedTodo && (
				<Details
					visible={modalVisible}
					onClose={handleCloseModal}
					todo={selectedTodo}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#080404',
		flex: 1,
	},
	todos: {
		flex: 1,
		padding: 10,

		marginHorizontal: 20,
	},
	inputHead: {
		flexDirection: 'row',
		marginTop: 30,
		justifyContent: 'space-between',
		height: 50,
		marginBottom: 30,
	},
	input: {
		width: '70%',
		padding: 15,
		borderWidth: 2,
		borderColor: '#51606b',
		borderRadius: 10,
		color: 'white',
		fontWeight: 'bold',
	},
	AddButton: {
		backgroundColor: '#6c7cac',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDisabled: {
		backgroundColor: '#8e979e',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	todoItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
		width: '100%',

		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: '#3f4145',
		paddingHorizontal: 20,
	},
	logoutButtonContainer: {
		padding: 10,
		backgroundColor: '#080404', // Optional: Set background for clarity
	},
})
