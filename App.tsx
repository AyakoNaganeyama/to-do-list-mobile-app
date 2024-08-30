import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //https://reactnavigation.org/docs/hello-react-navigation
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="my dotos" component={List} />
    </InsideStack.Navigator>
  );
}
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  //Using Stack navigator
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator> */}

      {/*Temporally*/}
      <InsideStack.Navigator initialRouteName="Login">
        <InsideStack.Screen name="Login" component={Login} />
        {/* <InsideStack.Screen name="my dotos" component={List} /> */}
      </InsideStack.Navigator>
      {/*Temporally*/}
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
