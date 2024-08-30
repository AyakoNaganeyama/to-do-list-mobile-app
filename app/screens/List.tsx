import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import useUserStore from "../store/authStore";

// todo class
export interface Todo {
  title: string;
  done: boolean;
  id: string;
  uid: string;
}

//todo list page
const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]); // array of todo, initially empty
  const [todo, setTodo] = useState(""); // each todo
  const globalLogout = useUserStore((state) => state.clearUser); // logout function from zustand
  const globalUser = useUserStore((state) => state.user); // user from zustand

  useEffect(() => {
    //everytime this page loads, get list of dotos from database
    const getTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("todos"); // Fetch todos from AsyncStorage
        if (jsonValue != null) {
          const objects = JSON.parse(jsonValue);
          const userTodos = objects.filter(
            (todo: Todo) => todo.uid === globalUser?.uid
          );
          setTodos(userTodos); // Set fetched todos to state
        } else {
          setTodos([]); // Initialize with an empty array if no data is found
        }
      } catch (e) {
        console.error("Error fetching todos:", e);
      }
    };

    // Fetch todos when the component mounts
    getTodos();
  }, []);

  const logout = async () => {
    globalLogout();
    console.log("Zustand", globalUser);
  };

  const addTodo = async (title: string) => {
    const newTodo: Todo = {
      title: title,
      done: false,
      id: uuid.v4() as string,
      uid: globalUser?.uid || "",
    };

    try {
      // Retrieve the existing todos list from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("todos");

      let todos: Todo[];

      if (jsonValue != null) {
        todos = JSON.parse(jsonValue);
      } else {
        todos = [];
      }

      // Add the new Todo to the existing list (or to the empty array)

      todos.push(newTodo);

      // Save the updated list back to AsyncStorage
      const updatedJsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", updatedJsonValue);

      const userTodos = todos.filter(
        (todo: Todo) => todo.uid === globalUser?.uid
      );
      setTodos(userTodos);
      setTodo("");
      console.log("Todo added successfully:", newTodo);
    } catch (e) {
      console.error("Error adding new todo:", e);
    }
  };

  const toggleDone = async (id: string) => {
    try {
      //Retrieve the existing todos list from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("todos");

      let todos: Todo[]; // Declare the todos array

      if (jsonValue !== null) {
        // If there is existing data in AsyncStorage
        todos = JSON.parse(jsonValue); // Parse the JSON string into a JavaScript array
      } else {
        // If there is no data in AsyncStorage (jsonValue is null)
        todos = []; // Initialize todos as an empty array
      }

      //Find the index of the todo to update
      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        // Step 3: Toggle the 'done' status
        todos[index].done = !todos[index].done;

        // Step 4: Save the updated list back to AsyncStorage
        await AsyncStorage.setItem("todos", JSON.stringify(todos));

        // Step 5: Update the state with the new todos list
        setTodos(todos);
      } else {
        console.warn(`Todo with id ${id} not found.`);
      }
    } catch (e) {
      console.error("Error toggling done status:", e);
    }
  };

  const deteleTodo = async (id: string) => {
    try {
      // Retrieve the existing todos list from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("todos");
      let todos: Todo[];

      if (jsonValue != null) {
        // If there is existing data in AsyncStorage
        todos = JSON.parse(jsonValue);
      } else {
        // If there is no data in AsyncStorage (jsonValue is null)
        todos = [];
      }

      if (todos.length > 0) {
        // Filter out the todo item to delete
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        //  Save the updated list back to AsyncStorage
        await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));

        // Step 4: Update the state with the new todos list
        setTodos(updatedTodos);
      }
    } catch (e) {
      console.error("Error deleting todo:", e);
    }
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button
          onPress={() => addTodo(todo)}
          title="Add"
          disabled={todo === ""}
        />
      </View>

      {/* Render the todos list using .map */}
      {todos.length > 0 && (
        <View>
          {todos.map((item) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => toggleDone(item.id)}>
                {!item.done ? (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                ) : (
                  <Entypo name="circle" size={24} color="gray" />
                )}
                <Text>{item.title}</Text>
              </TouchableOpacity>
              <Ionicons
                name="trash-bin-outline"
                size={24}
                color="red"
                onPress={() => deteleTodo(item.id)}
              />
            </View>
          ))}
        </View>
      )}

      <Button onPress={() => logout()} title="Logout" />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
