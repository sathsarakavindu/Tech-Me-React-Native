import { Icon, useRouter } from "expo-router";
import { useState } from "react";
import {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
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
              {/* <Text style={styles.toggle}>
                {hidePassword ? "Show" : "Hide"}
              </Text> */}
              
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Links */}
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text style={styles.link}>Create an Account</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => router.push("")}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity> */}

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
