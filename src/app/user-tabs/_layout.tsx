import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0B0F2F",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 25
        },
        tabBarActiveTintColor: "#4C5BFF",
        tabBarInactiveTintColor: "#aaa"
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="add_vehicle"
        options={{
          title: "Vehicle",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size + 4} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
