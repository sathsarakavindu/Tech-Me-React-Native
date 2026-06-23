import { createUser } from "@/features/auth/services/auth_service";
import { User } from "@/models/user_model";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const accountTypes = ["User", "Technician"];

  type FormType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;
    nic: string;
    address: string;
    accountType: string;
  };
  const setField = (key: keyof FormType, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const validateEmail = (email: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const validateContactNo = (contactNo: string) => {
    const contactNoRegex = /^(07[0-9]{8}|94[0-9]{9})$/;
    return contactNoRegex.test(contactNo);
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid Email";

    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.contact.trim()) newErrors.contact = "Contact number is required";
    else if (!validateContactNo(form.contact))
      newErrors.contact = "Invalid contact number";

    if (!form.nic.trim()) newErrors.nic = "NIC is required";

    if (!form.address.trim()) newErrors.address = "Address is required";

    if (!form.accountType) newErrors.accountType = "Account type is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegistration = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const user: User = {
        name: form.name,
        email: form.email,
        password: form.password,
        contact_no: form.contact,
        nic: form.nic,
        address: form.address,
        account_type: form.accountType
      };
      console.log(user);
      const response = await createUser(user);

      if (response) {
        console.log(response);

        router.back();
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Registration failed"
      );
      console.log(error);
    }
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
          <View style={[styles.inputBox, errors.name && styles.errorBorder]}>
            <Ionicons name="person-outline" size={20} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={form.name}
              onChangeText={(t) => setField("name", t)}
            />
          </View>

          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          {/* EMAIL */}
          <View style={[styles.inputBox, errors.email && styles.errorBorder]}>
            <Ionicons name="mail-outline" size={20} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(t) => setField("email", t)}
            />
          </View>

          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* PASSWORD */}
          <View
            style={[styles.inputBox, errors.password && styles.errorBorder]}
          >
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

          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* CONFIRM PASSWORD */}
          <View
            style={[
              styles.inputBox,
              errors.confirmPassword && styles.errorBorder
            ]}
          >
            <Ionicons name="shield-checkmark-outline" size={20} />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={form.confirmPassword}
              onChangeText={(t) => setField("confirmPassword", t)}
            />
          </View>

          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          {/* CONTACT */}
          <View style={[styles.inputBox, errors.contact && styles.errorBorder]}>
            <Ionicons name="call-outline" size={20} />
            <TextInput
              placeholder="Contact Number"
              keyboardType="phone-pad"
              style={styles.input}
              value={form.contact}
              onChangeText={(t) => setField("contact", t)}
            />
          </View>

          {errors.contact && (
            <Text style={styles.errorText}>{errors.contact}</Text>
          )}

          {/* NIC */}
          <View style={[styles.inputBox, errors.nic && styles.errorBorder]}>
            <Ionicons name="card-outline" size={20} />
            <TextInput
              placeholder="NIC"
              style={styles.input}
              value={form.nic}
              onChangeText={(t) => setField("nic", t)}
            />
          </View>

          {errors.nic && <Text style={styles.errorText}>{errors.nic}</Text>}

          {/* ADDRESS */}
          <View style={[styles.inputBox, errors.address && styles.errorBorder]}>
            <Ionicons name="home-outline" size={20} />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={form.address}
              onChangeText={(t) => setField("address", t)}
            />
          </View>

          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          {/* ACCOUNT TYPE (MODAL DROPDOWN) */}
          <TouchableOpacity
            style={[styles.dropdown, errors.accountType && styles.errorBorder]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="people-outline" size={20} />
            <Text style={styles.dropdownText}>
              {form.accountType || "Select Account Type"}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>

          {errors.accountType && (
            <Text style={styles.errorText}>{errors.accountType}</Text>
          )}

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
    height: 52,
    borderWidth: 1,
    borderColor: "transparent"
  },

  errorBorder: {
    borderColor: "#FF3B30",
    borderWidth: 1.5
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 5,
    fontFamily: "appFont"
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
