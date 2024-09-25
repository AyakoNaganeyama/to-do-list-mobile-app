import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useEffect, useState } from 'react'

import useUserStore from '../store/authStore'
import { Todo } from '../screens/List'

export function useTodos() {
	const [todos, setTodos] = useState<Todo[]>([]) // State to hold todos
	const globalUser = useUserStore((state) => state.user) // Access the global user from Zustand

	// fetch todos when the hook is used
	useEffect(() => {
		// every time this page loads, get list of todos from database that matches user's id
		async function getTodos() {
			try {
				const jsonValue = await AsyncStorage.getItem('todos') // Fetch todos from AsyncStorage
				if (jsonValue != null) {
					// covert json string into todo object
					const objects = JSON.parse(jsonValue)
					// filter todo that matches currently logged in user
					const userTodos = objects.filter(
						(todo: Todo) => todo.uid === globalUser?.uid
					)
					// set the todo list state for UI rendering
					setTodos(userTodos) // Set fetched todos to state
				} else {
					// if no list set empty array
					setTodos([])
				}
			} catch (e) {
				console.error('Error fetching todos:', e)
			}
		}

		// calling the function every time the page loads
		getTodos()
	}, [todos])

	// optimistic update for adding a new todo
	async function addTodo(title: string, clearInput: () => void) {
		// create a new todo object
		const newTodo: Todo = {
			title: title,
			done: false,
			id: uuid.v4() as string,
			uid: globalUser?.uid || '',
		}

		try {
			// retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')
			let todos: Todo[] = jsonValue != null ? JSON.parse(jsonValue) : []

			// add the new Todo to the existing list
			todos.push(newTodo)

			// save the updated list back to AsyncStorage
			await AsyncStorage.setItem('todos', JSON.stringify(todos))

			setTodos((prevTodos) => [...prevTodos, newTodo])
			clearInput() // callback to clear input immediately

			console.log('Todo added successfully:', newTodo)
		} catch (e) {
			console.error('Error adding new todo:', e)
			// optionally, revert the optimistic update in case of an error
			setTodos((prevTodos) =>
				prevTodos.filter((todo) => todo.id !== newTodo.id)
			)
		}
	}

	async function toggleDone(id: string) {
		try {
			// retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')

			let todos: Todo[]

			if (jsonValue !== null) {
				todos = JSON.parse(jsonValue)
			} else {
				todos = []
			}

			// find todo by todo id
			const index = todos.findIndex((todo) => todo.id === id)

			if (index !== -1) {
				// toggle the done status
				todos[index].done = !todos[index].done

				// save the updated list back to AsyncStorage
				await AsyncStorage.setItem('todos', JSON.stringify(todos))

				// for setting todos state, filter todos that match current user's uid
				const userTodos = todos.filter(
					(todo: Todo) => todo.uid === globalUser?.uid
				)

				// update the state with the new todos list
				setTodos(userTodos)
			} else {
				console.log(`Todo with id ${id} not found.`)
			}
		} catch (e) {
			console.error('Error toggling done status:', e)
		}
	}

	async function deleteTodo(id: string) {
		try {
			// retrieve the existing todos list from AsyncStorage
			const jsonValue = await AsyncStorage.getItem('todos')
			let todos: Todo[]

			if (jsonValue != null) {
				// if there is existing data in AsyncStorage
				todos = JSON.parse(jsonValue)
			} else {
				// if there is no data in AsyncStorage (jsonValue is null)
				todos = []
			}

			if (todos.length > 0) {
				// filter out the todo item to delete
				const updatedTodos = todos.filter((todo) => todo.id !== id)

				// save the updated list back to AsyncStorage
				await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))

				// for setting todos state, filter todos that match current user's uid
				const userTodos = updatedTodos.filter(
					(todo: Todo) => todo.uid === globalUser?.uid
				)

				// update the state with the new todos list
				setTodos(userTodos)
			}
		} catch (e) {
			console.error('Error deleting todo:', e)
		}
	}

	async function updateTodo(updatedTodo: Todo) {
		try {
			const jsonValue = await AsyncStorage.getItem('todos')
			let todos: Todo[] = jsonValue ? JSON.parse(jsonValue) : []

			// find and update the specific todo
			const index = todos.findIndex((todo) => todo.id === updatedTodo.id)
			if (index !== -1) {
				todos[index] = updatedTodo // update the todo in the array
				await AsyncStorage.setItem('todos', JSON.stringify(todos)) // Save to AsyncStorage

				const userTodos = todos.filter((todo) => todo.uid === globalUser?.uid)
				setTodos(userTodos) // update the state with the new todos list
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
