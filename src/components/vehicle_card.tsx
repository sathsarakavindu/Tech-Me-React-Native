import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Vehicle } from "../models/vehicle_model";

interface Props {
  vehicle: Vehicle;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function VehicleCard({ vehicle, onDelete, onEdit }: Props) {
  return (
    <TouchableOpacity
      style={styles.vehicleCard}
      activeOpacity={0.9}
      onLongPress={() => onDelete(vehicle.vehicle_no)}
    >
      {/* Vehicle Image */}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: vehicle.image_url
          }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
      </View>

      {/* Vehicle Details */}

      <View style={styles.detailsContainer}>
        <Text style={styles.vehicleName}>{vehicle.model}</Text>

        <View style={styles.numberBadge}>
          <Text style={styles.vehicleNo}>{vehicle.vehicle_no}</Text>
        </View>
      </View>

      {/* Arrow */}

      {/* <Ionicons name="chevron-expand-outline" size={22} color="#94A3B8" /> */}
      <FontAwesome6
        onPress={() => onEdit(vehicle.vehicle_no)}
        name="edit"
        size={20}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5
  },

  imageContainer: {
    width: 70,
    height: 70,

    borderRadius: 18,

    overflow: "hidden",

    backgroundColor: "#F8FAFC",

    borderWidth: 1,
    borderColor: "#E2E8F0"
  },

  vehicleImage: {
    width: "100%",
    height: "100%"
  },

  detailsContainer: {
    flex: 1,
    marginLeft: 14
  },

  vehicleName: {
    fontSize: 17,
    color: "#0F172A",

    fontFamily: "appFontSemiBold",

    marginBottom: 2
  },

  numberBadge: {
    alignSelf: "flex-start"

    // backgroundColor: "#EEF2FF",

    // paddingHorizontal: 12,
    // paddingVertical: 5,

    // borderRadius: 30
  },

  vehicleNo: {
    fontSize: 13,

    color: "#4338CA",

    fontFamily: "appFont"
  }
});

// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Vehicle } from "../models/vehicle_model";

// interface Props {
//   vehicle: Vehicle;
//   onDelete: (id: string) => void;
// }

// export default function VehicleCard({ vehicle, onDelete }: Props) {
//   return (
//     <TouchableOpacity
//       style={styles.vehicleCard}
//       onLongPress={() => onDelete(vehicle.vehicle_no)}
//     >
//       {/* <Ionicons name="car-sport" size={32} color="#000000" /> */}

//       <Image source={{ uri: vehicle.image_url }} />

//       <View style={{ flex: 1 }}>
//         <Text style={styles.vehicleName}>{vehicle.model}</Text>

//         <Text style={styles.vehicleNo}>{vehicle.vehicle_no}</Text>
//       </View>

//       {/* <Ionicons name="chevron-forward" size={22} color="#94A3B8" /> */}
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: 20,
//     marginBottom: 15,

//     backgroundColor: "#FFFFFF",

//     padding: 18,

//     borderRadius: 18,

//     flexDirection: "row",

//     alignItems: "center",

//     elevation: 4
//   },

//   vehicleName: {
//     fontSize: 16,
//     fontFamily: "appFontSemiBold",
//     marginBottom: -2
//   },

//   vehicleNo: {
//     marginTop: 1,
//     color: "#64748B",
//     fontFamily: "appFont"
//   },
//   vehicleCard: {
//     marginHorizontal: 20,
//     marginBottom: 25,
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 4
//   }
// });
