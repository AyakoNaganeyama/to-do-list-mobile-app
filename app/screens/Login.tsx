import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { fireAuth, database } from "../../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = fireAuth;

  const signUp = async () => {
    setLoading(true);
    try {
      const after = await createUserWithEmailAndPassword(auth, email, pass);
      console.log(after);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);

    try {
      const user = await signInWithEmailAndPassword(auth, email, pass);
      console.log(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <Button onPress={signUp} title="CreateAccount" />
      <Button onPress={signIn} title="Sign In" />
    </View>
  );
};

export default Login;
