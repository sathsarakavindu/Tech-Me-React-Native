import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TechnicianTabLayout() {
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
          marginBottom: 55
        },
        tabBarActiveTintColor: "#4C5BFF",
        tabBarInactiveTintColor: "#aaa"
      }}
    >
      <Tabs.Screen
        name="technician_dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="technician_history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          )
        }}
      />

      <Tabs.Screen
        name="account_page"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
