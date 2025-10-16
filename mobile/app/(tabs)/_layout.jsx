import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#066AFF",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          borderTopWidth: 0.3,
          borderTopColor: "grey",
          height: 70,
          paddingBottom: 30,
          paddingTop: 10,
          backgroundColor: '#fbfcffff',        
        },
        tabBarBadgeStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text style={{ color, fontSize: 10, fontWeight: "500" }}>
                Home
              </Text>
            ) : null,
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="create" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text style={{ color, fontSize: 10, fontWeight: "500" }}>
                Diary
              </Text>
            ) : null,
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="collections" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text style={{ color, fontSize: 10, fontWeight: "500" }}>
                Media
              </Text>
            ) : null,
        }}
      />
      
      
    </Tabs>
  );
}