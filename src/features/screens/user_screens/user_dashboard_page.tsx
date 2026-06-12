import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>

          <Text style={styles.name}>Kavindu Sathsara</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Emergency Card */}

      <TouchableOpacity style={styles.emergencyCard}>
        <Ionicons name="car-sport" size={40} color="#fff" />

        <Text style={styles.emergencyTitle}>Need Roadside Assistance?</Text>

        <Text style={styles.emergencySubTitle}>Request help instantly</Text>

        <View style={styles.helpButton}>
          <Text style={styles.helpText}>Request Help</Text>
        </View>
      </TouchableOpacity>

      {/* Statistics */}

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>

          <Text>Requests</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>

          <Text>Completed</Text>
        </View>
      </View>

      {/* Vehicles */}

      <Text style={styles.sectionTitle}>My Vehicles</Text>

      <TouchableOpacity style={styles.vehicleCard}>
        <Ionicons name="car" size={32} color="#2563EB" />

        <View>
          <Text style={styles.vehicleName}>Toyota Prius</Text>

          <Text>WP CAB 1234</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.vehicleCard}>
        <Ionicons name="car" size={32} color="#2563EB" />

        <View>
          <Text style={styles.vehicleName}>Honda Vezel</Text>

          <Text>WP CAR 9876</Text>
        </View>
      </TouchableOpacity>

      {/* Map Section */}

      <Text style={styles.sectionTitle}>Live Tracking</Text>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={50} color="#94A3B8" />

        <Text>Google Map Here</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
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
    color: "#64748B",
    fontFamily: "Poppins-Regular"
  },

  name: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#0F172A"
  },

  emergencyCard: {
    margin: 20,
    padding: 25,

    backgroundColor: "#2563EB",

    borderRadius: 24,

    alignItems: "center"
  },

  emergencyTitle: {
    color: "#fff",
    fontSize: 22,
    marginTop: 10,
    fontFamily: "Poppins-Bold"
  },

  emergencySubTitle: {
    color: "#E2E8F0",
    marginTop: 5
  },

  helpButton: {
    marginTop: 20,

    backgroundColor: "#fff",

    paddingHorizontal: 25,
    paddingVertical: 12,

    borderRadius: 50
  },

  helpText: {
    fontFamily: "Poppins-SemiBold",
    color: "#2563EB"
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
    fontFamily: "Poppins-Bold",

    color: "#0F172A"
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
    fontFamily: "Poppins-SemiBold"
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
