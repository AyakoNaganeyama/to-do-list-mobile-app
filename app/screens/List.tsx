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
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient' // Import for Gradient Background

import { Details } from './Details'
import { useLogout } from '../hooks/useLogout'
import { useTodos } from '../hooks/useTodos'
import { useToast } from '../hooks/useToast'

export interface Todo {
	title: string
	done: boolean
	id: string
	uid: string
}

export function List() {
	const [todo, setTodo] = useState('') // each todo
	const [modalVisible, setModalVisible] = useState(false)
	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

	const { todos, addTodo, toggleDone, deleteTodo } = useTodos()
	const { logout } = useLogout()
	const { showSuccessToast } = useToast()

	function handleAddTodo() {
		addTodo(todo, () => setTodo('')) // clear input after adding todo
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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>
				<LinearGradient
					colors={['#e0f7fa', '#ffffff']}
					style={styles.background}
				>
					<View style={styles.header}>
						<Text style={styles.headerText}>YOUR TODOS</Text>
					</View>

					<View style={{ flex: 1, justifyContent: 'space-between' }}>
						{/* Input Section */}
						<View style={styles.todos}>
							<View style={styles.inputHead}>
								<View style={styles.inputContainer}>
									<Ionicons
										name='add-circle-outline'
										size={20}
										color='#8e8e93'
										style={styles.icon}
									/>
									<TextInput
										placeholder='Add new todo'
										onChangeText={(text) => setTodo(text)}
										value={todo}
										placeholderTextColor='#8e8e93'
										style={styles.input}
									/>
								</View>

								<TouchableOpacity
									onPress={handleAddTodo}
									disabled={todo === ''}
									style={[
										styles.AddButton,
										todo === '' && styles.buttonDisabled,
									]}
								>
									<Text style={styles.buttonText}>+ Add</Text>
								</TouchableOpacity>
							</View>

							{/* Todo List */}
							<ScrollView style={{ flex: 1 }}>
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
													{item.done ? (
														<Ionicons
															name='checkmark-circle'
															size={24}
															color='#007aff'
														/>
													) : (
														<Entypo name='circle' size={24} color='#007aff' />
													)}
													<TouchableOpacity
														onPress={() => handleOpenModal(item)}
													>
														<Text style={styles.todoText}>{item.title}</Text>
													</TouchableOpacity>
												</TouchableOpacity>

												<Ionicons
													name='trash-bin-outline'
													size={24}
													color='#ff5252'
													onPress={() => deleteTodo(item.id)}
												/>
											</View>
										))}
									</View>
								)}
							</ScrollView>
						</View>

						{/* Logout Button */}
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
				</LinearGradient>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
	},
	header: {
		marginTop: 20,
		paddingVertical: 30,
		paddingHorizontal: 30,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#007aff',
		textAlign: 'center',
	},
	todos: {
		padding: 20,
		flex: 1,
	},
	inputHead: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		paddingHorizontal: 10,
		flex: 1,
		marginRight: 10,
		borderWidth: 1,
		borderColor: '#007aff',
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		fontSize: 16,
		color: '#333',
	},
	AddButton: {
		backgroundColor: '#007aff',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		justifyContent: 'center',
	},
	buttonDisabled: {
		backgroundColor: '#c7c7c7',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	todoItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 20,
		borderRadius: 10,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		borderColor: '#007aff',
		borderWidth: 1,
	},
	todoText: {
		fontSize: 16,
		color: '#333',
	},
	logoutButtonContainer: {
		padding: 10,
	},
})
