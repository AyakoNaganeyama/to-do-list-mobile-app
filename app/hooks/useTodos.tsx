import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import useUserStore from '../store/authStore'

import { Todo } from '../screens/List'

const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]) // State to hold todos
	const globalUser = useUserStore((state) => state.user) // Access the global user from Zustand

	// Fetch todos when the hook is used
	useEffect(() => {
		//every time this page loads, get list of todos from database that matches user's id
		const getTodos = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem('todos') // Fetch todos from AsyncStorage
				if (jsonValue != null) {
					//covert json string into todo object
					const objects = JSON.parse(jsonValue)
					//filter todo that matches currently logged in user
					const userTodos = objects.filter(
						(todo: Todo) => todo.uid === globalUser?.uid
					)
					//set the todo list state for UI rendering
					setTodos(userTodos) // Set fetched todos to state
				} else {
					//if no list set empty array
					setTodos([])
				}
			} catch (e) {
				console.error('Error fetching todos:', e)
			}
		}

		// calling the function every time the page loads
		getTodos()
	}, [todos])

	//TODO: This add function should be in hooks
	const addTodo = async (title: string, clearInput: () => void) => {
		//create a new todo object
		const newTodo: Todo = {
			title: title,
			done: false,
			id: uuid.v4() as string,
			uid: globalUser?.uid || '',
		}

		try {
			// Retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')

			let todos: Todo[]

			if (jsonValue != null) {
				todos = JSON.parse(jsonValue)
			} else {
				todos = []
			}

			// Add the new Todo to the existing list (or to the empty array)
			todos.push(newTodo)

			//back object array to json string
			const updatedJsonValue = JSON.stringify(todos)
			// Save the updated list back to AsyncStorage
			await AsyncStorage.setItem('todos', updatedJsonValue)

			// for setting todos state, filter todos that match current user's uid
			const userTodos = todos.filter(
				(todo: Todo) => todo.uid === globalUser?.uid
			)
			setTodos(userTodos)

			clearInput() //callback function
			//   setTodo("");
			console.log('Todo added successfully:', newTodo)
		} catch (e) {
			console.error('Error adding new todo:', e)
		}
	}

	//TODO: this function should be in hooks
	const toggleDone = async (id: string) => {
		try {
			//Retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')

			let todos: Todo[]

			if (jsonValue !== null) {
				todos = JSON.parse(jsonValue)
			} else {
				todos = []
			}

			//Find todo by todo id
			const index = todos.findIndex((todo) => todo.id === id)

			if (index !== -1) {
				//  Toggle the done status
				todos[index].done = !todos[index].done

				//  Save the updated list back to AsyncStorage
				await AsyncStorage.setItem('todos', JSON.stringify(todos))

				// for setting todos state, filter todos that match current user's uid
				const userTodos = todos.filter(
					(todo: Todo) => todo.uid === globalUser?.uid
				)

				// Update the state with the new todos list
				setTodos(userTodos)
			} else {
				console.log(`Todo with id ${id} not found.`)
			}
		} catch (e) {
			console.error('Error toggling done status:', e)
		}
	}

	const deleteTodo = async (id: string) => {
		try {
			// Retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')
			let todos: Todo[]

			if (jsonValue != null) {
				// If there is existing data in AsyncStorage
				todos = JSON.parse(jsonValue)
			} else {
				// If there is no data in AsyncStorage (jsonValue is null)
				todos = []
			}

			if (todos.length > 0) {
				// Filter out the todo item to delete
				const updatedTodos = todos.filter((todo) => todo.id !== id)

				//  Save the updated list back to AsyncStorage
				await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))

				// for setting todos state, filter todos that match current user's uid
				const userTodos = updatedTodos.filter(
					(todo: Todo) => todo.uid === globalUser?.uid
				)

				//  Update the state with the new todos list
				setTodos(userTodos)
			}
		} catch (e) {
			console.error('Error deleting todo:', e)
		}
	}

	const updateTodo = async (updatedTodo: Todo) => {
		try {
			const jsonValue = await AsyncStorage.getItem('todos')
			let todos: Todo[] = jsonValue ? JSON.parse(jsonValue) : []

			// Find and update the specific todo
			const index = todos.findIndex((todo) => todo.id === updatedTodo.id)
			if (index !== -1) {
				todos[index] = updatedTodo // Update the todo in the array
				await AsyncStorage.setItem('todos', JSON.stringify(todos)) // Save to AsyncStorage

				const userTodos = todos.filter((todo) => todo.uid === globalUser?.uid)
				setTodos(userTodos) // Update the state with the new todos list
				console.log(userTodos)
				console.log(todos)
			} else {
				console.log(`Todo not found.`)
			}
		} catch (e) {
			console.error('Error updating todo:', e)
		}
	}

	return {
		todos,
		addTodo,
		toggleDone,
		deleteTodo,
		updateTodo,
	}
}

export default useTodos
