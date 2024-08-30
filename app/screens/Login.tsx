import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import useUserStore from "../store/authStore";

interface User {
  uid: string;
  email: string;
  pass: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAccount, setisAccount] = useState(false);

  const globalLogin = useUserStore((state) => state.setUser);
  const globalLogout = useUserStore((state) => state.clearUser);

  // Access the user state from Zustand store
  const globalUser = useUserStore((state) => state.user);

  // const auth = fireAuth;

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const newUser: User = {
      uid: uuid.v4() as string,
      email: email,
      pass: password,
    };

    try {
      // Retrieve the existing todos list from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("users");

      let users: User[];

      if (jsonValue != null) {
        users = JSON.parse(jsonValue);
      } else {
        users = [];
      }

      const passwordExists = users.some((user) => user.pass === password);
      if (passwordExists) {
        console.log(
          "Sign Up Failed",
          "This password is already in use. Please choose a different password."
        );
        return;
      }

      // Add the new Todo to the existing list (or to the empty array)

      users.push(newUser);

      // Save the updated list back to AsyncStorage
      const updatedJsonValue = JSON.stringify(users);
      await AsyncStorage.setItem("users", updatedJsonValue);
      globalLogin(newUser);

      console.log("user added successfully:", newUser);
      const after = await AsyncStorage.getItem("users");
      console.log(after);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const jsonValue = await AsyncStorage.getItem("users");
      if (jsonValue !== null) {
        const users: User[] = JSON.parse(jsonValue);
        // Find the user that matches both email and password
        const foundUser = users.find(
          (user) => user.email === email && user.pass === password
        );

        if (foundUser) {
          globalLogin(foundUser);

          console.log("zustand", globalUser);
        } else {
          console.log("Login Failed", "Invalid email or password.");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (email: string, password: string) => {
    globalLogout();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput
          placeholder="enter email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="enter pass"
          onChangeText={(text: string) => setPass(text)}
          value={pass}
        />

        <Button onPress={() => signUp(email, pass)} title="CreateAccount" />

        <Button onPress={() => login(email, pass)} title="Login" />
      </View>
    </SafeAreaView>
  );
};

export default Login;
