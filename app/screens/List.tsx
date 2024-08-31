import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
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
    <View>
      <View>
        <TextInput
          placeholder="Add new todo"
          onChangeText={(text: string) => setTodo(text)}
          value={todo}
        />
        <Button onPress={handleAddTodo} title="Add" disabled={todo === ""} />
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
                onPress={() => deleteTodo(item.id)}
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
