import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import useTodos from "../hooks/useTodos";
import useLogout from "../hooks/useLogout";

// todo class
export interface Todo {
  title: string;
  done: boolean;
  id: string;
  uid: string;
}

//todo list page
const List = () => {
  const { todos, addTodo, toggleDone, deleteTodo } = useTodos();
  const { logout } = useLogout();
  const [todo, setTodo] = useState(""); // each todo
  const handleAddTodo = () => {
    addTodo(todo, () => setTodo("")); // setTodo function is call back
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {/*todos*/}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.todos}>
            <View style={styles.inputHead}>
              <TextInput
                placeholder="Add new todo"
                onChangeText={(text) => setTodo(text)}
                value={todo}
                placeholderTextColor="gray"
                style={styles.input}
              />

              <TouchableOpacity
                onPress={handleAddTodo}
                disabled={todo === ""}
                style={[styles.AddButton, todo === "" && styles.buttonDisabled]}
              >
                <Text style={styles.buttonText}>+Add</Text>
              </TouchableOpacity>
            </View>

            {/* Render the todos list using .map */}
            {todos.length > 0 && (
              <View>
                {todos.map((item) => (
                  <View key={item.id} style={styles.todoItem}>
                    <TouchableOpacity
                      onPress={() => toggleDone(item.id)}
                      style={{
                        flexDirection: "row",

                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {!item.done ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#6c7cac"
                        />
                      ) : (
                        <Entypo name="circle" size={24} color="#6c7cac" />
                      )}
                      <Text style={{ color: "white", fontSize: 16 }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    <Ionicons
                      name="trash-bin-outline"
                      size={24}
                      color="red"
                      onPress={() => deleteTodo(item.id)}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Fixed Logout Button at the Bottom */}
        <View style={styles.logoutButtonContainer}>
          <Button onPress={logout} title="Logout" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#080404",
    flex: 1,
  },
  todos: {
    flex: 1,
    padding: 10,

    marginHorizontal: 20,
  },
  inputHead: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    height: 50,
    marginBottom: 30,
  },
  input: {
    width: "70%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#51606b",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
  },
  AddButton: {
    backgroundColor: "#6c7cac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#8e979e",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",

    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#3f4145",
    paddingHorizontal: 20,
  },
  logoutButtonContainer: {
    padding: 10,
    backgroundColor: "#080404", // Optional: Set background for clarity
  },
});
