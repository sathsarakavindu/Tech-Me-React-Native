import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function AddVehicleScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("Car");
  const [color, setColor] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.card}>
          <View style={styles.inputBox}>
            <Ionicons name="car-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Vehicle Number (EX: WP-CAD-5617)"
              placeholderTextColor="#696666"
              style={styles.input}
              value={vehicleNo}
              onChangeText={setVehicleNo}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="construct-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Model (EX: Suzuki Alto 2017)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={model}
              onChangeText={setModel}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="color-palette-outline" size={20} color="#000000" />
            <TextInput
              placeholder="Color"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={color}
              onChangeText={setColor}
            />
          </View>

          {/* Dropdown (UI only) */}
          <TouchableOpacity style={styles.dropdown}>
            <Ionicons name="list-outline" size={20} color="#000000" />
            <Text style={styles.dropdownText}>{type}</Text>
            <Ionicons name="chevron-down" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
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
  }
});
