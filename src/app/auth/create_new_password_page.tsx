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

export default function NewPasswordPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [hide1, setHide1] = useState(true);
  const [hide2, setHide2] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    if (!form.password || !form.confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);

      Alert.alert("Success", "Password updated successfully");

      router.replace("/auth/login");
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={50} color="#fff" />
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous passwords
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} />
          <TextInput
            placeholder="New Password"
            secureTextEntry={hide1}
            style={styles.input}
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
          />
          <TouchableOpacity onPress={() => setHide1(!hide1)}>
            <Ionicons
              name={hide1 ? "eye-off-outline" : "eye-outline"}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputBox}>
          <Ionicons name="shield-outline" size={20} />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={hide2}
            style={styles.input}
            value={form.confirmPassword}
            onChangeText={(t) => setForm({ ...form, confirmPassword: t })}
          />
          <TouchableOpacity onPress={() => setHide2(!hide2)}>
            <Ionicons
              name={hide2 ? "eye-off-outline" : "eye-outline"}
              size={20}
            />
          </TouchableOpacity>
        </View>

        {/* PASSWORD RULES */}
        <Text style={styles.hint}>
          • Minimum 6 characters{"\n"}• Use strong combination of letters &
          numbers
        </Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Change Password"}
          </Text>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>Back</Text>
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
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 15,
    fontFamily: "appFont"
  },

  subtitle: {
    color: "#A0A0B2",
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
    fontFamily: "appFont"
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
    fontFamily: "appFont",
    marginTop: 5
  },

  hint: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    fontFamily: "appFont"
  },

  button: {
    backgroundColor: "#0B0F2F",
    padding: 12,
    borderRadius: 12,
    marginTop: 25,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "appFont",
    marginTop: 5
  },

  back: {
    marginTop: 20,
    textAlign: "center",
    color: "#000000",
    fontWeight: "600",
    fontFamily: "appFont"
  }
});
