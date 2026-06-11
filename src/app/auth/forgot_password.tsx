import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a valid email");
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
    //   router.push("/auth/otp");
    }, 1000);
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
        <View style={styles.inputBox}>
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

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.button}
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
    backgroundColor: "#0B0F2F",
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginTop: 15,
  },

  subtitle: {
    color: "#A0A0B2",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 52,
    marginTop: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#0B0F2F",
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  backButton: {
    marginTop: 20,
    alignItems: "center",
  },

  backText: {
    color: "#0B0F2F",
    fontWeight: "600",
  },
});