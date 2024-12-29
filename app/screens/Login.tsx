import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useLogin } from "../hooks/useLogin";
import { useSignUp } from "../hooks/useSignup";
import { useToast } from "../hooks/useToast";

export function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({ email: "", pass: "" });

  const { login } = useLogin();
  const { signUp } = useSignUp();
  const { showSuccessToast, showErrorToast } = useToast();

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pass: any) => pass.length >= 6;

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      return;
    }

    if (!validatePassword(pass)) {
      setErrors({ ...errors, pass: "Password must be at least 6 characters." });
      return;
    }

    const signedUpUser = await signUp(email, pass);
    if (signedUpUser)
      showSuccessToast("SignUp Successful", `Welcome, ${signedUpUser.email}!`);
    else showErrorToast("SignUp Failed", "Error creating account.");
  };

  async function handleLogin() {
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      return;
    }

    if (!validatePassword(pass)) {
      setErrors({ ...errors, pass: "Password must be at least 6 characters." });
      return;
    }

    const loggedInUser = await login(email, pass);

    if (loggedInUser)
      showSuccessToast(
        "Login Successful",
        `Welcome back, ${loggedInUser.email}!`
      );
    else showErrorToast("Login Failed", "Invalid email or password.");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["#e0f7fa", "#ffffff"]}
          style={styles.background}
        >
          <View style={styles.container}>
            {/* Heading */}
            <AntDesign
              name="checkcircleo"
              size={80}
              color="#007aff"
              style={{ marginBottom: 20 }}
            />
            <Text style={styles.heading}>Smart Todo</Text>

            {/* Input for Email */}
            <View style={styles.inputContainer}>
              <Fontisto
                name="email"
                size={20}
                color="#8e8e93"
                style={styles.icon}
              />
              <TextInput
                placeholder="Enter Email"
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: "" });
                }}
                value={email}
                style={styles.input}
                placeholderTextColor={"#8e8e93"}
                keyboardType="email-address"
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            {/* Input for Password */}
            <View style={styles.inputContainer}>
              <AntDesign
                name="lock"
                size={20}
                color="#8e8e93"
                style={styles.icon}
              />
              <TextInput
                placeholder="Enter Password"
                onChangeText={(text) => {
                  setPass(text);
                  setErrors({ ...errors, pass: "" });
                }}
                value={pass}
                style={styles.input}
                placeholderTextColor={"#8e8e93"}
                secureTextEntry={true}
              />
            </View>
            {errors.pass ? (
              <Text style={styles.errorText}>{errors.pass}</Text>
            ) : null}

            {/* Buttons */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={email === "" || pass === ""}
              style={[
                styles.Button,
                (email === "" || pass === "") && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={email === "" || pass === ""}
              style={[
                styles.Button,
                (email === "" || pass === "") && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "#007aff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#007aff",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
  },
  Button: {
    backgroundColor: "#007aff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: "#c7c7c7",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff5252",
    fontSize: 13,
    marginBottom: 10,
  },
});
