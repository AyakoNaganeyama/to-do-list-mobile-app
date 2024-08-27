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

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<any[]>([]);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    const todoRef = collection(database, "todos");

    //create listener for changes of dotos

    const subsciber = onSnapshot(todoRef, {
      next: (snapShot) => {
        const todos: Todo[] = [];
        snapShot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => subsciber();
  }, []);

  const addList = async () => {
    const doc = await addDoc(collection(database, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(database, `todos/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };
    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View>
        <TouchableOpacity onPress={toggleDone}>
          {!item.done && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
          {item.done && <Entypo name="circle" size={24} color="gray" />}
          <Text>Test {item.title}</Text>
        </TouchableOpacity>
        <Ionicons
          name="trash-bin-outline"
          size={24}
          color="red"
          onPress={deleteItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.containor}>
      <View>
        <TextInput
          placeholder="add new todo"
          onChangeText={(text: string) => {
            setTodo(text);
          }}
          value={todo}
        />

        <Button onPress={() => addList()} title="add" disabled={todo === ""} />
      </View>

      {todos.length > 0 && (
        <View>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo: Todo) => todo.id}
          />
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  containor: {},
});
