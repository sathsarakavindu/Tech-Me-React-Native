import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function AddVehicleScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [vehicleNo, setVehicleNo] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("Car");
  const [color, setColor] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
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
              <Ionicons name="camera-outline" size={40} color="#fff" />
              <Text style={styles.uploadText}>Upload Vehicle Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.card}>
          <View style={styles.inputBox}>
            <Ionicons name="car-outline" size={20} color="#fff" />
            <TextInput
              placeholder="Vehicle Number (EX: WP-CAD-5617)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={vehicleNo}
              onChangeText={setVehicleNo}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="construct-outline" size={20} color="#fff" />
            <TextInput
              placeholder="Model (EX: Suzuki Alto 2017)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={model}
              onChangeText={setModel}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="color-palette-outline" size={20} color="#fff" />
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
            <Ionicons name="list-outline" size={20} color="#fff" />
            <Text style={styles.dropdownText}>{type}</Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
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
    backgroundColor: "#070B2D",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  subtitle: {
    color: "#aaa",
    marginBottom: 20,
  },

  imageCard: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#11163A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },

  imagePlaceholder: {
    alignItems: "center",
  },

  uploadText: {
    color: "#fff",
    marginTop: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  card: {
    backgroundColor: "#11163A",
    padding: 16,
    borderRadius: 16,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2f55",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#2a2f55",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },

  dropdownText: {
    color: "#fff",
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#4C5BFF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});