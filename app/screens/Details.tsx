import React, { useState, useEffect } from 'react'
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Todo } from './List'
import { useTodos } from '../hooks/useTodos'

interface DetailsProps {
	visible: boolean
	onClose: () => void
	todo: Todo | null
}

export function Details({ visible, onClose, todo }: DetailsProps) {
	const { updateTodo } = useTodos() // Access updateTodo from the hook
	const [editTitle, setEditTitle] = useState(todo?.title || '')

	// update the local state when modal open
	useEffect(() => {
		if (todo) {
			setEditTitle(todo.title)
		}
	}, [todo])

	function handleSave() {
		if (todo) {
			const updatedTodo = { ...todo, title: editTitle } // add new todo using spread operator
			updateTodo(updatedTodo) // push updates to storage using hook
			onClose() // close modal at end
		}
	}

	if (!todo) return null

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalTitle}>Edit Task</Text>

					<TextInput
						style={styles.input}
						value={editTitle}
						onChangeText={setEditTitle}
					/>

					{/* Save Button */}
					<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>

					{/* Close Button */}
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalView: {
		width: '80%',
		backgroundColor: '#ffffff',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#007aff',
		marginBottom: 20,
		textAlign: 'center',
	},
	input: {
		width: '100%',
		height: 50,
		backgroundColor: '#f5f5f5',
		borderColor: '#007aff',
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 15,
		fontSize: 16,
		color: '#333',
		marginBottom: 20,
	},
	saveButton: {
		backgroundColor: '#007aff',
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 25,
		marginBottom: 15,
		width: '100%',
		alignItems: 'center',
	},
	closeButton: {
		backgroundColor: '#ff5252',
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 25,
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
	},
})
