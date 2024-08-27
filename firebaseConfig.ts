import { initializeApp } from 'firebase/app';


//https://docs.expo.dev/guides/using-firebase/

// Optionally import the services that you want to use
//  import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDYmPOhGG7eIF4wEFG26WMXT6NVI96hiAw",
    authDomain: "to-do-app-90ad5.firebaseapp.com",
    projectId: "to-do-app-90ad5",
    storageBucket: "to-do-app-90ad5.appspot.com",
    messagingSenderId: "524745754394",
    appId: "1:524745754394:web:9de372fce572fe538a4ea3"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
