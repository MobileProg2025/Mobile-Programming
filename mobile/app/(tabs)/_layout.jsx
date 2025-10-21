import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#FFA36C",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    borderTopWidth: 0.3,
                    borderTopColor: "grey",
                    height: 70,
                    paddingBottom: 10, 
                    paddingTop: 10,
                    backgroundColor: '#fbfcffff',
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: "500",
                },
            }}
        >
            {/* 1. Home Tab */}
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={25} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (<Text style={{ color, ...styles.tabLabel }}>Home</Text>) : null,
                }}
            />

            {/* 2. Diary Tab */}
            <Tabs.Screen
                name="diary"
                options={{
                    title: 'Diary',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="book" size={25} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (<Text style={{ color, ...styles.tabLabel }}>Diary</Text>) : null,
                }}
            />

            {/* Entry Tab */}
            <Tabs.Screen
                name="diaryentry" 
                options={{
                    title: '', 
                    tabBarIcon: () => null, 
                    tabBarLabel: () => null, 
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={props.onPress}
                            activeOpacity={0.8} 
                        >
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            {/* 4. Settings Tab */}
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings-sharp" size={25} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (<Text style={{ color, ...styles.tabLabel }}>Settings</Text>) : null,
                }}
            />

            {/* 5. Profile Tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="person" size={25} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) =>
                        focused ? (<Text style={{ color, ...styles.tabLabel }}>Profile</Text>) : null,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#FF7E4A',
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: -30, 
        elevation: 5, 
        shadowColor: '#FF7E4A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: "500",
        marginTop: 2,
    },
});