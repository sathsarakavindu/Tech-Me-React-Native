import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Go to Login" onPress={() => router.push("/auth/login")} />
      <Button
        title="Go to Register"
        onPress={() => router.push("/auth/register")}
      />
      <Button
        title="Go to Forgot Password"
        onPress={() => router.push("/auth/forgot_password")}
      />
      <Button
        title="Go to OTP Page"
        onPress={() => router.push("/auth/otp_page")}
      />
      <Button
        title="Go to Create New Password"
        onPress={() => router.push("/auth/create_new_password_page")}
      />

      <Button
        title="Go to User Dashboard"
        onPress={() => router.push("/screens/user/user_dashboard_page")}
      />

      <Button
        title="Go to User Account"
        onPress={() => router.push("/screens/user/user_account")}
      />

      <Button
        title="Go to Technician Dashboard"
        onPress={() => router.push("/screens/technician/technician_dashboard")}
      />
      <Button
        title="Go to Technician History"
        onPress={() => router.push("/screens/technician/technician_history")}
      />

      <Button
        title="Go to Add Vehicle"
        onPress={() => router.push("/screens/user/add_vehicle")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
