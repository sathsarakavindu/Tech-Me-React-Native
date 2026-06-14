import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function DashboardScreen() {
  const [getRequestHelp, setRequestHelp] = useState(false);

  const handleReqHelp = () => {
    setRequestHelp(!getRequestHelp);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>

          <Text style={styles.name}>Kavindu Sathsara</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#F8FAFC" />
        </TouchableOpacity>
      </View>

      {/* Emergency Card */}

      <View style={styles.emergencyCard}>
        <Ionicons name="car-sport" size={40} color="#fff" />

        <Text style={styles.emergencyTitle}>Need Roadside Assistance?</Text>

        <Text style={styles.emergencySubTitle}>Request help instantly</Text>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => handleReqHelp()}
        >
          <Text style={styles.helpText}>Request Help</Text>
        </TouchableOpacity>
      </View>

      {/* Map Section */}

      {getRequestHelp && (
        <>
          <Text style={styles.sectionTitle}>Live Tracking</Text>

          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={50} color="#94A3B8" />

            <Text>Google Map Here</Text>
          </View>
        </>
      )}

      {/* Vehicles */}

      <Text style={styles.sectionTitle}>My Vehicles</Text>

      <TouchableOpacity style={styles.vehicleCard}>
        <Ionicons name="car" size={32} color="#000000" />

        <View>
          <Text style={styles.vehicleName}>Toyota Prius</Text>

          <Text style={styles.vehicle_no}>WP CAB 1234</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.vehicleCard}>
        <Ionicons name="car" size={32} color="#000000" />

        <View>
          <Text style={styles.vehicleName}>Honda Vezel</Text>

          <Text style={styles.vehicle_no}>WP CAR 9876</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },

  header: {
    marginTop: 60,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  greeting: {
    fontSize: 16,
    color: "#F8FAFC",
    fontFamily: "appFont"
    //backgroundColor: "#F8FAFC"
  },

  name: {
    fontSize: 20,
    fontFamily: "appFontBold",
    color: "#F8FAFC"
  },

  emergencyCard: {
    margin: 20,
    padding: 25,

    backgroundColor: "#F8FAFC",

    borderRadius: 24,

    alignItems: "center"
  },

  emergencyTitle: {
    color: "#000000",
    fontSize: 22,
    marginTop: 10,
    fontFamily: "appFont"
  },

  emergencySubTitle: {
    color: "#000000",
    marginTop: 5,
    fontFamily: "appFont"
  },

  helpButton: {
    marginTop: 20,
    backgroundColor: "#000000",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50
  },

  helpText: {
    fontFamily: "appFont",
    color: "#F8FAFC",
    fontSize: 14
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 20
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",

    padding: 20,

    borderRadius: 20,

    alignItems: "center",

    elevation: 5
  },

  statNumber: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: "#2563EB"
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,

    paddingHorizontal: 20,

    fontSize: 18,
    fontFamily: "appFont",

    color: "#ffffff"
  },

  vehicleCard: {
    marginHorizontal: 20,
    marginBottom: 15,

    backgroundColor: "#fff",

    padding: 18,

    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",

    gap: 15,

    elevation: 4
  },

  vehicleName: {
    fontSize: 16,
    fontFamily: "appFontSemiBold"
  },
  vehicle_no: {
    fontFamily: "appFont"
  },

  mapPlaceholder: {
    height: 250,

    margin: 20,

    backgroundColor: "#fff",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    elevation: 4
  }
});
