import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  optionName: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function AccountOptionsCard({
  optionName,
  iconName,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.text}>{optionName}</Text>

      <View style={styles.icon}>
        <Ionicons name={iconName} size={22} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  icon: {
    marginRight: 4,
  },
});