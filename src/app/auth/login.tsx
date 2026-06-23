import { loginUser } from "@/features/auth/services/auth_service";
import {
  getAccountType,
  setAccountType,
  setAddress,
  setAuthToken,
  setContactNo,
  setName,
  setNIC,
  setUserEmail
} from "@/features/business/services/async_storage_handling";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const isUser = async () => {
    const accountHolderType = await getAccountType();
    return accountHolderType == "User";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(email, password);

      console.log(response);
      await setName(response.name);
      await setAuthToken(response.token);
      await setUserEmail(response.email);
      await setAccountType(response.account_type);
      await setContactNo(response.contact_no);
      await setNIC(response.nic);
      await setAddress(response.address);

      if (await isUser()) {
        router.replace("/user-tabs/dashboard");
      } else {
        router.replace("/technician-tabs/technician_dashboard");
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("Login Failed", "Invalid email or password");
    } finally {
      setLoading(false);
    }

    // TODO: call API / backend login
    console.log("Login clicked", email, password);

    // Example navigation after success
    // router.replace("/home");
  };

  return (
    <View style={styles.container}>
      {/* Top Blue Section */}
      <View style={styles.topSection}>
        <Image
          source={require("../../../assets/icons/app_icon/ic_image.png")}
          style={styles.logo}
        />
      </View>

      {/* White Card Section */}
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Sign In</Text>

          {/* Email */}
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#666"
          />

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              style={styles.passwordInput}
              placeholderTextColor="#666"
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off" : "eye"}
                size={22}
                color={"#000b58"}
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleLogin}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.link}>Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/forgot_password")}
          >
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Google Login */}
          <Text style={styles.orText}>Or Sign In with</Text>

          <TouchableOpacity onPress={() => console.log("Google Login")}>
            <Image
              source={require("../../../assets/icons/app_icon/ic_google_logo.png")}
              style={styles.google}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },

  topSection: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center"
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain"
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20
  },

  title: {
    fontFamily: "appFont",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15
  },

  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15
  },

  passwordInput: {
    flex: 1,
    padding: 12
  },

  toggle: {
    color: "#000b58",
    fontWeight: "bold"
  },

  button: {
    backgroundColor: "#000b58",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600"
  },

  orText: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold"
  },

  google: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginTop: 10
  }
});
