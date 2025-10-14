import { MaterialIcons } from "@expo/vector-icons";
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
          borderTopWidth: 0.5,
          borderTopColor: "grey",
          height: 80,
          paddingBottom: 30,
          paddingTop: 15,
          backgroundColor: 'white',        
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
            <MaterialIcons name="create" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text style={{ color, fontSize: 10, fontWeight: "500" }}>
                Notes
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