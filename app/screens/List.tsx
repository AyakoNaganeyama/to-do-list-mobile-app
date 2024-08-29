import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

//object of todo
export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

//todo list page
const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]); // array of todo
  const [todo, setTodo] = useState("");
  const [done, isDone] = useState(false);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("todos"); // Fetch todos from AsyncStorage
        if (jsonValue != null) {
          const objects = JSON.parse(jsonValue);
          setTodos(objects); // Set fetched todos to state
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

  const addTodo = async (title: string) => {
    const newTodo: Todo = {
      title: title,
      done: false,
      id: uuid.v4() as string,
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
      setTodos(todos);
      console.log("Todo added successfully:", newTodo);
    } catch (e) {
      console.error("Error adding new todo:", e);
    }
  };

  return (
    <View style={styles.container}>
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
              {/* <TouchableOpacity onPress={() => toggleDone(item.id)}>
              {!item.done ? (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              ) : (
                <Entypo name="circle" size={24} color="gray" />
              )} */}
              <Text>{item.title}</Text>
              {/* </TouchableOpacity> */}
              {/* <Ionicons
              name="trash-bin-outline"
              size={24}
              color="red"
              onPress={() => deleteItem(item.id)}
            /> */}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
