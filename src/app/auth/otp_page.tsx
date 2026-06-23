import { checkOTPValidation } from "@/features/auth/services/auth_service";
import { setOTP } from "@/features/business/services/async_storage_handling";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function OtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const [timer, setTimer] = useState(60);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    const code = otp.join("");

    if (code.length < 4) {
      Alert.alert("Error", "Please enter full OTP");
      setLoading(false);
      setError("Please enter full OTP");
      return;
    }
    try {
      console.log("OTP:", code);
      const checkOTP = await checkOTPValidation(code);

      if (checkOTP) {
        setOTP(code);
        setError("");
        setLoading(false);
        router.push("/auth/create_new_password_page");
      } else {
        setError("Invalid OTP");
        setLoading(false);
      }
    } catch (error) {
      setError("Invalid OTP");
      setLoading(false);
    }
  };

  const resendHandling = async () => {};

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {/* OTP INPUTS */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              style={[styles.otpBox, error && styles.errorBorder]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(digit, index);
                }
              }}
            />
          ))}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* RESEND */}
        <Text style={styles.resendText}>
          Didn’t receive code?{" "}
          <Text style={styles.resendAction}>Resend ({timer}s)</Text>
        </Text>

        {/* VERIFY BUTTON */}
        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
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

  errorBorder: {
    borderWidth: 1,
    borderColor: "#FF3B30"
  },

  errorText: {
    color: "#FF3B30",
    fontFamily: "appFont",
    fontSize: 12,
    marginTop: 15,
    textAlign: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "appFontBold"
  },

  subtitle: {
    color: "#A0A0B2",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "appFont"
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center"
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 40
  },

  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#F4F5F7",
    fontFamily: "appFont"
  },

  resendText: {
    marginTop: 15,
    color: "#666",
    fontFamily: "appFont"
  },

  resendAction: {
    marginTop: 10,
    color: "#0B0F2F",
    fontWeight: "700",
    fontFamily: "appFontBold"
  },

  button: {
    backgroundColor: "#0B0F2F",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    marginTop: 15,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "appFont",
    marginTop: 5
  },

  backText: {
    marginTop: 15,
    color: "#000000",
    fontWeight: "600",
    fontFamily: "appFont"
  }
});
