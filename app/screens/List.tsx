import { View, Text, Button, TextInput, FlatList } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { StyleSheet } from "react-native";

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
    return <Text>Test{item.title}</Text>;
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
