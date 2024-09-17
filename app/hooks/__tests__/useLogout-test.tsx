import { renderHook, act } from '@testing-library/react-hooks'
import { useLogout } from '../../hooks/useLogout'

// test prep, mock logout attributes and methods
const mockSetUser = jest.fn()
let mockUser: { uid: string; email: string; pass: string } | null = {
	uid: '1',
	email: 'test@example.com',
	pass: 'test-password',
}

jest.mock('../../store/authStore', () => ({
	__esModule: true,
	default: () => ({
		clearUser: jest.fn(() => {
			mockUser = null // mock user clearing
		}),
		// mock get user
		get user() {
			return mockUser
		},
		setUser: mockSetUser, // mock setUser function
	}),
}))

describe('useLogout Hook', () => {
	beforeEach(() => {
		jest.clearAllMocks() // for consistency clear state incase of side effects
		mockUser = { uid: '1', email: 'test@example.com', pass: 'test-password' } // add user back in before test
	})

	test('Logs out the user and ensures the user is null', () => {
		// render hook
		const { result } = renderHook(() => useLogout())

		const { logout } = result.current

		// act call logout function
		act(() => {
			logout()
		})

		console.log('mockUser', mockUser)
		expect(mockUser).toBe(null) // check user is actually cleared
	})
})
