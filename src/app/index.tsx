import {
  getAccountType,
  getAuthToken
} from "@/features/business/services/async_storage_handling";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();
      const account = await getAccountType();
      // const token = true;
      // const account = "Technician";

      if (token && account) {
        setIsLoggedIn(true);
        setAccountType(account);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (isLoggedIn && accountType == "Technician") {
    return (
      <View style={styles.container}>
        <Redirect href={"/technician-tabs/technician_dashboard"} />
      </View>
    );
  }
  if (isLoggedIn && accountType == "User") {
    return (
      <View style={styles.container}>
        <Redirect href={"/user-tabs/dashboard"} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Redirect href={"/auth/login"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

// import { useRouter } from "expo-router";
// import { Button, StyleSheet, View } from "react-native";

// export default function Index() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Button title="Go to Login" onPress={() => router.push("/auth/login")} />
//       <Button
//         title="Go to Register"
//         onPress={() => router.push("/auth/register")}
//       />
//       <Button
//         title="Go to Forgot Password"
//         onPress={() => router.push("/auth/forgot_password")}
//       />
//       <Button
//         title="Go to OTP Page"
//         onPress={() => router.push("/auth/otp_page")}
//       />
//       <Button
//         title="Go to Create New Password"
//         onPress={() => router.push("/auth/create_new_password_page")}
//       />

//       <Button
//         title="Go to User Dashboard"
//         onPress={() => router.push("/screens/user/user_dashboard_page")}
//       />

//       <Button
//         title="Go to User Account"
//         onPress={() => router.push("/screens/user/user_account")}
//       />

//       <Button
//         title="Go to Technician Dashboard"
//         onPress={() => router.push("/screens/technician/technician_dashboard")}
//       />
//       <Button
//         title="Go to Technician History"
//         onPress={() => router.push("/screens/technician/technician_history")}
//       />

//       <Button
//         title="Go to Add Vehicle"
//         onPress={() => router.push("/screens/user/add_vehicle")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });
