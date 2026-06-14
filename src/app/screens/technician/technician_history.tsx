import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const historyData = [
  {
    id: "1",
    userName: "Kavindu Sathsara",
    vehicleNo: "WP CAD 5617",
    contactNo: "0764598798",
    address: "No 517/B, Meegahawatta, Delgoda",
    date: "2026/06/14",
    time: "7:20 PM",
    image:
      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    status: "Completed"
  },
  {
    id: "2",
    userName: "Nimal Perera",
    vehicleNo: "CAB 9876",
    contactNo: "0771234567",
    address: "Kiribathgoda",
    date: "2026/06/13",
    time: "2:30 PM",
    image:
      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    status: "Completed"
  },
  {
    id: "3",
    userName: "Nimal Perera",
    vehicleNo: "CAB 9876",
    contactNo: "0771234567",
    address: "Kiribathgoda",
    date: "2026/06/13",
    time: "2:30 PM",
    image:
      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    status: "Completed"
  },
  {
    id: "4",
    userName: "Nimal Perera",
    vehicleNo: "CAB 9876",
    contactNo: "0771234567",
    address: "Kiribathgoda",
    date: "2026/06/13",
    time: "2:30 PM",
    image:
      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    status: "Completed"
  },
  {
    id: "5",
    userName: "Nimal Perera",
    vehicleNo: "CAB 9876",
    contactNo: "0771234567",
    address: "Kiribathgoda",
    date: "2026/06/13",
    time: "2:30 PM",
    image:
      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
    status: "Completed"
  }
];

export default function TechnicianHistory() {
  const [search, setSearch] = useState("");

  const filteredData = historyData.filter(
    (item) =>
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.vehicleNo.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#22C55E";

      default:
        return "#999";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Service History</Text>
        <Text style={styles.subtitle}>View all completed service records</Text>
      </View>

      {/* SEARCH */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#666" />

        <TextInput
          placeholder="Search by user or vehicle number"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* HISTORY LIST */}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60
        }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: item.image }} style={styles.avatar} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{item.userName}</Text>

                  <Text style={styles.vehicleNo}>{item.vehicleNo}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusColor(item.status)
                    }
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color="#000B58" />
                <Text style={styles.infoText}>{item.contactNo}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="location" size={18} color="#000B58" />
                <Text style={styles.infoText}>{item.address}</Text>
              </View>

              <View style={styles.bottomRow}>
                <View style={styles.dateBox}>
                  <Ionicons name="calendar-outline" size={18} color="#000B58" />

                  <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <View style={styles.dateBox}>
                  <Ionicons name="time-outline" size={18} color="#000B58" />

                  <Text style={styles.dateText}>{item.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000B58",
    paddingHorizontal: 16
  },

  header: {
    marginTop: 60,
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF"
  },

  subtitle: {
    color: "#D1D5DB",
    marginTop: 4
  },

  searchContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  statCard: {
    backgroundColor: "#FFF",
    width: "31%",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 18
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000B58"
  },

  statLabel: {
    color: "#666",
    marginTop: 5
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
    elevation: 5
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginRight: 12
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827"
  },

  vehicleNo: {
    color: "#6B7280",
    marginTop: 3
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 30
  },

  statusText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  infoText: {
    marginLeft: 10,
    color: "#374151",
    flex: 1
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10
  },

  dateText: {
    marginLeft: 6,
    color: "#000B58",
    fontWeight: "600"
  }
});
