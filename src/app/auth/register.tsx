import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    nic: "",
    address: "",
    accountType: ""
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const accountTypes = ["User", "Technician"];

  const setField = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegistration = async () => {
    console.log(form);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 50
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* TOP HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start your journey</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          {/* NAME */}
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={form.name}
              onChangeText={(t) => setField("name", t)}
            />
          </View>

          {/* EMAIL */}
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(t) => setField("email", t)}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} />
            <TextInput
              placeholder="Password"
              secureTextEntry={hidePassword}
              style={styles.input}
              value={form.password}
              onChangeText={(t) => setField("password", t)}
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={20}
              />
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASSWORD */}
          <View style={styles.inputBox}>
            <Ionicons name="shield-checkmark-outline" size={20} />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={form.confirmPassword}
              onChangeText={(t) => setField("confirmPassword", t)}
            />
          </View>

          {/* CONTACT */}
          <View style={styles.inputBox}>
            <Ionicons name="call-outline" size={20} />
            <TextInput
              placeholder="Contact Number"
              keyboardType="phone-pad"
              style={styles.input}
              value={form.contact}
              onChangeText={(t) => setField("contact", t)}
            />
          </View>

          {/* NIC */}
          <View style={styles.inputBox}>
            <Ionicons name="card-outline" size={20} />
            <TextInput
              placeholder="NIC"
              style={styles.input}
              value={form.nic}
              onChangeText={(t) => setField("nic", t)}
            />
          </View>

          {/* ADDRESS */}
          <View style={styles.inputBox}>
            <Ionicons name="home-outline" size={20} />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={form.address}
              onChangeText={(t) => setField("address", t)}
            />
          </View>

          {/* ACCOUNT TYPE (MODAL DROPDOWN) */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="people-outline" size={20} />
            <Text style={styles.dropdownText}>
              {form.accountType || "Select Account Type"}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>

          {/* REGISTER BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRegistration()}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* LOGIN LINK */}
          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MODAL DROPDOWN */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalBox}>
              {accountTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.modalItem}
                  onPress={() => {
                    setField("accountType", type);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: "appFontBold"
  },

  subtitle: {
    color: "#A0A0B2",
    marginTop: 5,
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
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 52
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "appFont"
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    justifyContent: "space-between",
    marginBottom: 20
  },

  dropdownText: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontFamily: "appFont"
  },

  button: {
    backgroundColor: "#0B0F2F",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "appFont"
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },

  normalText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "appFont"
  },

  signInText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "700",
    marginLeft: 8,
    fontFamily: "appFontBold",
    marginBottom: 4
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10
  },

  modalItem: {
    padding: 15
  },

  modalText: {
    fontSize: 16
  }
});
