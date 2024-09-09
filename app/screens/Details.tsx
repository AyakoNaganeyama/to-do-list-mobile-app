import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Todo } from "./List";
import useTodos from "../hooks/useTodos";

interface DetailsProps {
  visible: boolean;
  onClose: () => void;
  todo: Todo | null;
}

const Details: React.FC<DetailsProps> = ({ visible, onClose, todo }) => {
  const { updateTodo } = useTodos(); // Access updateTodo from the hook
  const [editTitle, setEditTitle] = useState(todo?.title || "");

  // Whenever the modal opens with a new todo, update the local state
  useEffect(() => {
    if (todo) {
      setEditTitle(todo.title);
    }
  }, [todo]);

  // Handle saving changes
  const handleSave = () => {
    if (todo) {
      const updatedTodo = { ...todo, title: editTitle }; // Create an updated todo
      updateTodo(updatedTodo); // Call updateTodo from the hook to update in AsyncStorage
      onClose(); // Close the modal after updating
    }
  };

  if (!todo) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Todo</Text>
          <Text>{todo.id}</Text>
          <TextInput
            style={styles.input}
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Details;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
