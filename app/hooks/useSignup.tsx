import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import useUserStore from "../store/authStore";
import useToast from "../hooks/useToast";

// Define the User type
interface User {
  uid: string;
  email: string;
  pass: string;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const globalLogin = useUserStore((state) => state.setUser);

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
        showErrorToast(
          "Sign Up Failed",
          "This password is already in use. Please choose a different password."
        );

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

      showSuccessToast("Signup Successful", `Hello, ${newUser.email}!`);

      const after = await AsyncStorage.getItem("users");
      console.log(after);
    } catch (err) {
      console.error("Error during sign up:", err);
      showErrorToast("Sign Up Error", "An error occurred during sign up.");
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};

export default useSignUp;
