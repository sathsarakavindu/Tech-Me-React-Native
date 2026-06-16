import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AccountOptionsCard from "../../components/account_option_card";

const { width } = Dimensions.get("window");

export default function UserAccountPage() {
  const router = useRouter();

  const [isUserAccount, setIsUserAccount] = useState<boolean | null>(null);

  useEffect(() => {
    checkAccountType();
  }, []);

  const checkAccountType = async () => {
    try {
      const type = await AsyncStorage.getItem("accountType");
      setIsUserAccount(type === "User");
    } catch (e) {
      console.log("isUser error:", e);
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    // router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKc6EnanoKKj61vCCamKeDwXelxNzUElzIWWDgf75XNEa1-uaHgiSq32hF7bp73Tq9nsY"
          }}
          style={styles.profile}
        />

        <Text style={styles.title}>Account</Text>

        {/* <Image
          source={require("../../../../assets/images/account/cover_account.png")}
          style={styles.cover}
        /> */}
      </View>

      {/* OPTIONS */}
      <View style={styles.body}>
        {isUserAccount === true ? (
          <AccountOptionsCard
            optionName="Edit Vehicle Info"
            iconName="chevron-forward"
            onPress={() => console.log("Edit Vehicle Info")}
          />
        ) : (
          <AccountOptionsCard
            optionName="Edit Profile"
            iconName="chevron-forward"
            onPress={() => console.log("Edit Profile")}
          />
        )}

        {isUserAccount === true && (
          <AccountOptionsCard
            optionName="Edit Profile"
            iconName="chevron-forward"
            onPress={() => console.log("Edit Profile")}
          />
        )}

        <AccountOptionsCard
          optionName="Change Password"
          iconName="chevron-forward"
          onPress={() => {}}
        />

        <AccountOptionsCard
          optionName="Sign Out"
          iconName="log-out-outline"
          onPress={signOut}
        />
      </View>

      {/* BOTTOM NAV */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Text>Home</Text>
        </TouchableOpacity>

        {isUserAccount === true && (
          <TouchableOpacity>
            <Text>Vehicle</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity>
          <Text>History</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },

  header: {
    backgroundColor: "white",
    height: width * 0.5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },

  cover: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },

  profile: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 100,
    position: "absolute",
    top: width * 0.15
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },

  body: {
    marginTop: 20
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%"
  }
});
