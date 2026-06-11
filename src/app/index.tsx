import { StyleSheet, View } from "react-native";
import LoginPage from "./auth/login";

export default function Index() {
  return (
    <View>
      <LoginPage />
      {/* <Text style={styles.text_style}>
        Edit src/app/index.tsx to edit this screen.
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
