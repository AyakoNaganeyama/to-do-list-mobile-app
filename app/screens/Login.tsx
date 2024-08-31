import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import React from "react";
import { useState } from "react";
import useUserStore from "../store/authStore";
import useLogin from "../hooks/useLogin";
import useSignUp from "../hooks/useSignup";

interface User {
  uid: string;
  email: string;
  pass: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useLogin(); //return login logic from the hook
  const { signUp } = useSignUp(); //return sign up logic from the hook

  // Access the user state from Zustand store
  const globalUser = useUserStore((state) => state.user);

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

        <Button
          onPress={() => signUp(email, pass)}
          title="CreateAccount"
          disabled={email === "" || pass === ""}
        />

        <Button
          onPress={() => login(email, pass)}
          title="Login"
          disabled={email === "" || pass === ""}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
