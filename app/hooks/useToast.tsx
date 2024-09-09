import React from 'react'
import { View, Text } from 'react-native'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

// Custom toast configuration
const toastConfig = {
	success: (props: any) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: 'green' }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: '400',
			}}
		/>
	),
	error: (props: any) => (
		<ErrorToast
			{...props}
			style={{ borderLeftColor: 'red' }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 17,
				fontWeight: '400',
			}}
			text2Style={{
				fontSize: 15,
			}}
		/>
	),
}

// Hook to use Toast with custom configurations
const useToast = () => {
	const showSuccessToast = (text1: string, text2: string) => {
		Toast.show({
			type: 'success',
			text1,
			text2,
		})
	}

	const showErrorToast = (text1: string, text2: string) => {
		Toast.show({
			type: 'error',
			text1,
			text2,
		})
	}

	return { showSuccessToast, showErrorToast }
}

export { toastConfig }
export default useToast
