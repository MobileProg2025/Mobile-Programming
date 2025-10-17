import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("settings")}
      >
        <Ionicons name="settings-outline" size={22} color="black" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("trash")}
      >
        <Ionicons name="trash-outline" size={22} color="black" />
        <Text style={styles.menuText}>Trash</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfcffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
  },
  menuItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: "#006989", 
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
});

export default Menu;