import { View, Text, Button } from "react-native";
import React from "react";

const List = ({ navigation }: any) => {
  return (
    <View>
      <Text>List</Text>
      <Button onPress={() => navigation.navigate("Details")} title="Details" />
    </View>
  );
};

export default List;
