// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyDYmPOhGG7eIF4wEFG26WMXT6NVI96hiAw',
	authDomain: 'to-do-app-90ad5.firebaseapp.com',
	projectId: 'to-do-app-90ad5',
	storageBucket: 'to-do-app-90ad5.appspot.com',
	messagingSenderId: '524745754394',
	appId: '1:524745754394:web:9de372fce572fe538a4ea3',
}

const app = initializeApp(firebaseConfig)

// Initialize Firestore
const database = getFirestore(app)

// Initialize Firebase Authentication
const fireAuth = getAuth(app)

// Export the initialized instances
export { app, fireAuth, database }
