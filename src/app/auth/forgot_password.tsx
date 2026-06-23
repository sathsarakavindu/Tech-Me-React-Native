import { sendOTPToUser } from "@/features/auth/services/auth_service";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!email) {
      setError("Email is required");
      Alert.alert("Error", "Email is required");
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await sendOTPToUser(email);
      console.log(response);

      if (response) {
        setError("");
        setLoading(false);
        router.push("/auth/otp_page");
      }
    } catch (error) {
      setError("Invalid Email");
      setLoading(false);
      console.log(`Error: ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="lock-closed-outline" size={50} color="#fff" />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your registered email to reset your password
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* EMAIL INPUT */}
        <View style={[styles.inputBox, error && styles.errorBorder]}>
          <Ionicons name="mail-outline" size={20} />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sending..." : "Continue"}
          </Text>
        </TouchableOpacity>

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginTop: 15,
    fontFamily: "appFontBold"
  },

  subtitle: {
    color: "#A0A0B2",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    fontFamily: "appFont"
  },

  errorBorder: {
    borderColor: "#FF3B30",
    borderWidth: 1.5
  },

  errorText: {
    color: "#FF3B30",
    fontFamily: "appFont",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 52,
    marginTop: 20
  },

  input: {
    flex: 1,
    marginLeft: 10,
    marginTop: 4,
    fontFamily: "appFont",
    fontSize: 12
  },

  button: {
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "appFont",
    marginTop: 2
  },

  backButton: {
    marginTop: 20,
    alignItems: "center"
  },

  backText: {
    color: "#0B0F2F",
    fontWeight: "600",
    fontFamily: "appFont"
  }
});
