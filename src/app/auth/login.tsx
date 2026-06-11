import { StyleSheet, Text, View } from "react-native";

export default function LoginPage() {
  return (
    <View style={style.container}>
      <Text style={style.text_style}>Login Page</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text_style: {
    fontFamily: "appFont"
  }
});
