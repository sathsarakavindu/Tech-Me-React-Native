import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    appFont: require("./../../assets/fonts/Poppins-Regular.ttf"),
    appFontBold: require("./../../assets/fonts/Poppins-Bold.ttf")
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
