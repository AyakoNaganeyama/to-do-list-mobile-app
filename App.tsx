import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //https://reactnavigation.org/docs/hello-react-navigation
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebaseConfig";
import useUserStore from "./app/store/authStore";
import { toastConfig } from "./app/hooks/useToast";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();
interface User {
  uid: string; // Unique identifier for the user
  email: string; // Email address of the user
  pass: string; // Password of the user
}

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="my dotos"
        component={List}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const globalUser = useUserStore((state) => state.user);

  useEffect(() => {
    setUser(globalUser);
    console.log("App.js Zustand", globalUser);
  }, [globalUser]);

  //Using Stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>

      {/* Render the Toast component as the last child https://www.npmjs.com/package/react-native-toast-message*/}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
