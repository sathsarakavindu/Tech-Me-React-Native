import {
  addVehicle,
  isAvailableThisVehicle
} from "@/features/auth/services/add_vehicle_services";
import {
  getContactNo,
  getName,
  getNIC,
  getUserEmail
} from "@/features/business/services/async_storage_handling";
import { uploadVehicleImage } from "@/features/business/services/supabase_service";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function AddVehicleScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("Car");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const vehicleTypes = ["Car", "Van", "Three Wheeler", "Bike", "Lorry", "Bus"];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], //ImagePicker.MediaTypeOptions.Images,
      quality: 0.9
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      //Clear Image Error message
      setErrors((prev) => ({
        ...prev,
        imageError: ""
      }));
    }
  };

  const handlingAddVehicle = async () => {
    if (!validateFields()) {
      return;
    } else if (true) {
      const response = await isAvailableThisVehicle(vehicleNo);
      if (!response) {
        try {
          const imageURL = await uploadVehicleImage(image!);

          console.log("Image URL: ", imageURL);

          const user_name = await getName();
          const user_email = await getUserEmail();
          const user_mobile = await getContactNo();
          const nic = await getNIC();

          if (user_name && user_email && user_mobile && nic) {
            const response = await addVehicle(
              user_name,
              user_email,
              user_mobile,
              nic,
              imageURL,
              vehicleNo,
              type,
              model,
              color
            );
            Alert.alert("Vehicle", "Your vehicle successfully added!", [{}], {
              cancelable: true
            });
            setVehicleNo("");
            setModel("");
            setType("Car");
            setColor("");
            setImage("");
          }
        } catch (error) {}
      } else {
        setErrors((prev) => ({
          ...prev,
          vehicleNoError: "This vehicle is exist!"
        }));
        Alert.alert(
          "Already Registered!",
          "This vehicle has already been registered",
          [{}],
          { cancelable: true }
        );
        return;
      }
    }
  };

  const validateFields = () => {
    let newErrors: Record<string, string> = {};

    if (!image) newErrors.imageError = "Vehicle Image is Required";

    if (!vehicleNo) newErrors.vehicleNoError = "Vehicle No is Required";

    if (!model) newErrors.vehicleModalError = "Model is Required";

    if (!type) newErrors.typeError = "Type is Required";
    if (!color) newErrors.colorError = "Color is Required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 135 }}
      >
        {/* Header */}
        <Text style={styles.title}>Add Vehicle</Text>
        <Text style={styles.subtitle}>Register your vehicle details</Text>

        {/* Image Upload Card */}
        <TouchableOpacity style={styles.imageCard} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={40} color="#000000" />
              <Text style={styles.uploadText}>Upload Vehicle Image</Text>
            </View>
          )}
          {errors.imageError && (
            <Text style={styles.errorTextImage}>{errors.imageError}</Text>
          )}
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.card}>
          <View
            style={[
              styles.inputBox,
              errors.vehicleNoError && styles.errorBorder
            ]}
          >
            <Ionicons name="car-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Vehicle Number (EX: WP-CAD-5617)"
              placeholderTextColor="#696666"
              style={styles.input}
              value={vehicleNo}
              onChangeText={setVehicleNo}
            />
          </View>
          {errors.vehicleNoError && (
            <Text style={styles.errorText}>{errors.vehicleNoError}</Text>
          )}

          <View
            style={[
              styles.inputBox,
              errors.vehicleModalError && styles.errorBorder
            ]}
          >
            <Ionicons name="construct-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Model (EX: Suzuki Alto 2017)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={model}
              onChangeText={setModel}
            />
          </View>

          {errors.vehicleModalError && (
            <Text style={styles.errorText}>{errors.vehicleModalError}</Text>
          )}

          <View
            style={[styles.inputBox, errors.colorError && styles.errorBorder]}
          >
            <Ionicons name="color-palette-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Color"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={color}
              onChangeText={setColor}
            />
          </View>
          {errors.colorError && (
            <Text style={styles.errorText}>{errors.colorError}</Text>
          )}
          {/* Dropdown (UI only) */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="list-outline" size={20} color="#000000" />

            <Text style={styles.dropdownText}>
              {type || "Select Vehicle Type"}
            </Text>

            <Ionicons name="chevron-down" size={20} color="#000000" />
          </TouchableOpacity>

          <Modal transparent visible={modalVisible} animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                {vehicleTypes.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.modalItem}
                    onPress={() => {
                      setType(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlingAddVehicle()}
        >
          <Text style={styles.buttonText}>Add Vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58",
    paddingHorizontal: 16
  },
  errorText: {
    fontSize: 12,
    fontFamily: "appFont",
    color: "#FF3B30",
    marginBottom: 6,
    marginLeft: 2,
    marginTop: -10
  },
  errorTextImage: {
    fontSize: 12,
    fontFamily: "appFont",
    color: "#FF3B30",
    marginTop: 1
  },
  errorBorder: { borderColor: "#FF3B30", borderWidth: 1.5, marginBottom: 12 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 30,
    fontFamily: "appFontBold"
  },

  subtitle: {
    color: "#ffffff",
    marginBottom: 20,
    fontFamily: "appFont"
  },

  imageCard: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden"
  },

  imagePlaceholder: {
    alignItems: "center"
  },

  uploadText: {
    color: "#000000",
    marginTop: 10,
    fontFamily: "appFont"
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 50
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000000",
    fontFamily: "appFont"
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2a2f55",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50
  },

  dropdownText: {
    color: "#000000",
    flex: 1,
    marginLeft: 10,
    fontFamily: "appFont"
  },

  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center"
  },

  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "appFontBold"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden"
  },

  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },

  modalText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "appFont"
  }
});
