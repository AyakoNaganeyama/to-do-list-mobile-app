import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react-hooks'
import { useLogin } from '../../hooks/useLogin'

// mock async storage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}))

//mock auth store methods like set users and user
const mockSetUser = jest.fn()
jest.mock('../../store/authStore', () => ({
	__esModule: true,
	default: () => ({
		setUser: mockSetUser, // Mock setUser function
		user: null, // Initial state
	}),
}))

describe('useLogin Hook', () => {
	// clear and prep all mocked methods before each test
	beforeEach(() => {
		jest.clearAllMocks()
	})

	// first test case
	test('Logs in and stores user', async () => {
		const mockUser = {
			uid: '1',
			email: 'test@example.com',
			pass: 'password123',
		}

		// set user into mock storage
		;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
			JSON.stringify([mockUser])
		)

		const { result } = renderHook(() => useLogin())
		const { login } = result.current

		// attempt to sign user in, if not successful test will fail
		await act(async () => {
			await login('test@example.com', 'password123')
		})
	})
})
