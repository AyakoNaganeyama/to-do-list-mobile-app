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
    //everytime this page loads, get list of dotos from database that matches user's id
    const getTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("todos"); // Fetch todos from AsyncStorage
        if (jsonValue != null) {
          //covert json string into todo object
          const objects = JSON.parse(jsonValue);
          //filter todo that maches currently logged in user
          const userTodos = objects.filter(
            (todo: Todo) => todo.uid === globalUser?.uid
          );
          //set the todo list state for UI rendering
          setTodos(userTodos); // Set fetched todos to state
        } else {
          //if no list set empty array
          setTodos([]);
        }
      } catch (e) {
        console.error("Error fetching todos:", e);
      }
    };

    // calling the function everytime the page loads
    getTodos();
  }, []);

  // TODO: this logout function should be in hooks
  const logout = async () => {
    globalLogout();
    console.log("Zustand", globalUser);
  };

  //TODO: This add function should be in hooks
  const addTodo = async (title: string) => {
    //create a new todo object
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

      //back object array to json string
      const updatedJsonValue = JSON.stringify(todos);
      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem("todos", updatedJsonValue);

      // for setting todos state, filter todos that match current user's uid
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

  //TODO: this function should be in hooks
  const toggleDone = async (id: string) => {
    try {
      //Retrieve the existing todos list from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("todos");

      let todos: Todo[];

      if (jsonValue !== null) {
        todos = JSON.parse(jsonValue);
      } else {
        todos = [];
      }

      //Find todo by todo id
      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        //  Toggle the done status
        todos[index].done = !todos[index].done;

        //  Save the updated list back to AsyncStorage
        await AsyncStorage.setItem("todos", JSON.stringify(todos));

        // for setting todos state, filter todos that match current user's uid
        const userTodos = todos.filter(
          (todo: Todo) => todo.uid === globalUser?.uid
        );

        // Update the state with the new todos list
        setTodos(userTodos);
      } else {
        console.log(`Todo with id ${id} not found.`);
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

        // for setting todos state, filter todos that match current user's uid
        const userTodos = updatedTodos.filter(
          (todo: Todo) => todo.uid === globalUser?.uid
        );

        //  Update the state with the new todos list
        setTodos(userTodos);
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
