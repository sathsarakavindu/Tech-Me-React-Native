// import {
//   Alert,
//   FlatList,
//   Image,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// import VehicleCard from "@/components/vehicle_card";
// import {
//   deleteVehicle,
//   getVehicles
// } from "@/features/auth/services/add_vehicle_services";
// import { makeHelpRequestHandling } from "@/features/auth/services/help_services";
// import { socket } from "@/features/auth/services/socket";
// import {
//   getAddress,
//   getContactNo,
//   getName,
//   getNIC,
//   getUserEmail
// } from "@/features/business/services/async_storage_handling";
// import { Vehicle } from "@/models/vehicle_model";
// import { Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import { useEffect, useState } from "react";

// export default function DashboardScreen() {
//   const [getRequestHelp, setRequestHelp] = useState(false);
//   const [user_name, setUserName] = useState("");
//   const [greeting, setGreeting] = useState("");
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [loadingVehicles, setLoadingVehicles] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
//   const [location, setLocation] = useState<Location.LocationObject | null>();
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [helpId, setHelpId] = useState<string | null>(null);

//   useEffect(() => {
//     getUserCurrentLocation();
//     getGreeting();
//     userNameGet();
//     getUserVehicles();
//   }, []);

//   const getUserCurrentLocation = async () => {
//     try {
//       setLoadingLocation(true);
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Accessing Your Current Location",
//           "Location Permission Denied."
//         );
//         return;
//       }

//       // const currentLocation = await Location.getCurrentPositionAsync({
//       //   accuracy: Location.Accuracy.High
//       // });
//       // setLocation(currentLocation);

//       const helpId = "6a439f4826a3cc3ae4217f62";
//       const subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High
//         },
//         (currentLocation) => {
//           console.log(`Current latitude is ${currentLocation.coords.latitude}`);
//           console.log(
//             `Current location longitude ${currentLocation.coords.longitude}`
//           );
//           setLocation(currentLocation);
//           socket.emit("update-location", {
//             helpId,

//             latitude: currentLocation.coords.latitude,

//             longitude: currentLocation.coords.longitude
//           });
//         }
//       );
//       console.log("getUserCurrentLocation worked");
//     } catch (error) {}
//   };

//   const getUserVehicles = async () => {
//     try {
//       setLoadingVehicles(true);
//       const nic_ = await getNIC();
//       if (!nic_) {
//         setVehicles([]);
//         return;
//       }
//       const result = await getVehicles(nic_);
//       setVehicles(result);
//     } catch (error) {
//       console.log(`Dashboard vehicle loading error: ${error}`);
//     } finally {
//       setLoadingVehicles(false);
//     }
//   };

//   const onPressDeleteVehicle = async (vehicle_no: string) => {
//     Alert.alert(
//       "Delete Vehicle",
//       "Do you want to delete this vehicle?",
//       [
//         {
//           text: "No",
//           style: "cancel"
//         },
//         {
//           text: "Yes",
//           style: "destructive",
//           onPress: () => {
//             handlingVehicleDeletion(vehicle_no);
//           }
//         }
//       ],
//       { cancelable: true }
//     );
//   };

//   const handlingVehicleDeletion = async (vehicle_no: string) => {
//     try {
//       const response = await deleteVehicle(vehicle_no);
//       if (response)
//         setVehicles((previous) =>
//           previous.filter((vehicle) => vehicle.vehicle_no !== vehicle_no)
//         );
//     } catch (error) {
//       console.log(`Vehicle deletion error: ${error}`);
//     }
//   };

//   const handleReqHelp = async () => {
//     if (getRequestHelp) {
//       Alert.alert(
//         "Cancel Request",
//         "Do you want to cancel request ?",
//         [
//           {
//             text: "No",
//             style: "destructive",
//             onPress: () => {
//               setRequestHelp(true);
//             }
//           },
//           {
//             text: "Yes",
//             style: "cancel",
//             onPress: () => {
//               setRequestHelp(false);
//             }
//           }
//         ],
//         {
//           cancelable: true
//         }
//       );
//     } else {
//       Alert.alert(
//         "Make a Request",
//         "Do you want to make a request ?",
//         [
//           {
//             text: "No",
//             style: "destructive",
//             onPress: () => {
//               setRequestHelp(false);
//             }
//           },
//           {
//             text: "Yes",
//             style: "cancel",
//             onPress: () => {
//               setRequestHelp(true);
//               displayVehicleList();
//             }
//           }
//         ],
//         {
//           cancelable: true
//         }
//       );
//     }
//   };

//   const userNameGet = async () => {
//     const username = await getName();
//     if (username) {
//       setUserName(username);
//     } else {
//       setUserName("");
//     }
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour >= 4 && hour < 12) {
//       setGreeting("Good Morning");
//       return "Good Morning!";
//     } else if (hour >= 12 && hour <= 15) {
//       setGreeting("Good Afternoon");
//       return "Good Afternoon!";
//     } else if (hour > 15 && hour <= 23) {
//       setGreeting("Good Evening");
//       return "Good Evening!";
//     } else {
//       setGreeting("Good Night");
//       return "Good Night!";
//     }
//   };

//   const refreshVehicles = async () => {
//     try {
//       setRefreshing(true);
//       await getUserVehicles();
//     } catch (error) {
//       console.log(`Refresh error: ${error}`);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const makeHelpRequest = async (
//     vehicleImg: String,
//     vehicleNo: String,
//     vehicleModal: String,
//     vehicleType: String,
//     vehicleColor: String
//   ) => {
//     const user_name = await getName();
//     const email = await getUserEmail();
//     const nic = await getNIC();
//     const contact_no = await getContactNo();
//     const address = await getAddress();
//     const vehicle_image = vehicleImg;
//     const vehicle_no = vehicleNo;
//     const model = vehicleModal;
//     const type = vehicleType;
//     const color = vehicleColor;
//     const lat = location?.coords.latitude;
//     const lon = location?.coords.longitude;

//     if (lat != null && lon != null) {
//       const res = await makeHelpRequestHandling(
//         user_name!,
//         email!,
//         vehicle_image,
//         vehicle_no,
//         model,
//         type,
//         color,
//         nic!,
//         contact_no!,
//         address!,
//         lat,
//         lon
//       );
//       console.log(`Help ID is: ${res}`);
//       setHelpId(res);
//     }
//   };

//   const displayVehicleList = () => {
//     setVehicleModalVisible(true);
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{
//         paddingBottom: 110
//       }}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greeting}>
//             {greeting ? greeting : "Have a Good Day..!"} 👋
//           </Text>

//           <Text style={styles.name}>{user_name ? user_name : "Welcome!"}</Text>
//         </View>

//         <TouchableOpacity>
//           <Ionicons name="notifications-outline" size={28} color="#F8FAFC" />
//         </TouchableOpacity>
//       </View>
//       {/* Emergency Card */}
//       <View style={styles.emergencyCard}>
//         <Ionicons name="car-sport" size={40} color="#fff" />

//         <Text style={styles.emergencyTitle}>Need Roadside Assistance?</Text>

//         <Text style={styles.emergencySubTitle}>Request help instantly</Text>

//         <TouchableOpacity
//           style={[
//             !getRequestHelp ? styles.helpButton : styles.helpCancelButton
//           ]}
//           onPress={() => handleReqHelp()}
//         >
//           <Text style={styles.helpText}>
//             {!getRequestHelp ? "Request Help" : "Cancel Request"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {/* Map Section */}
//       {getRequestHelp && (
//         <>
//           <Text style={styles.sectionTitle}>Live Tracking</Text>

//           <View style={styles.mapPlaceholder}>
//             <Ionicons name="map" size={50} color="#94A3B8" />

//             <Text>Google Map Here</Text>
//           </View>
//         </>
//       )}
//       {/* Vehicles */}
//       <Text style={styles.sectionTitle}>My Vehicles</Text>
//       {loadingVehicles ? (
//         <Text style={styles.loadingText}>Loading Vehicles...</Text>
//       ) : vehicles.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Ionicons name="car-outline" size={50} color="#CBD5E1" />
//           <Text style={styles.emptyText}>No Vehicles Found</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={vehicles}
//           keyExtractor={(item) => item.vehicle_no}
//           scrollEnabled={false}
//           renderItem={({ item }) => (
//             <VehicleCard vehicle={item} onDelete={onPressDeleteVehicle} />
//           )}
//           refreshing={refreshing}
//           onRefresh={refreshVehicles}
//         />
//       )}
//       {/* Pop Vehicle List*/}
//       <Modal
//         visible={vehicleModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setVehicleModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Pick Your Vehicle</Text>

//             <FlatList
//               data={vehicles}
//               keyExtractor={(item) => item.vehicle_no}
//               showsVerticalScrollIndicator={false}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={async () => {
//                     await makeHelpRequest(
//                       item.image_url,
//                       item.vehicle_no,
//                       item.model,
//                       item.type,
//                       item.color
//                     );

//                     setVehicleModalVisible(false);
//                   }}
//                 >
//                   <View style={styles.vehicleCardInList}>
//                     <Image
//                       source={{ uri: item.image_url }}
//                       style={styles.vehicleImage}
//                     />

//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.vehicleNameInList}>{item.model}</Text>

//                       <Text>Vehicle No : {item.vehicle_no}</Text>

//                       <Text>Type : {item.type}</Text>

//                       <Text>Color : {item.color}</Text>

//                       <Text>Owner : {item.name}</Text>

//                       <Text>Contact : {item.contact_no}</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               ListEmptyComponent={() => (
//                 <Text style={{ textAlign: "center", marginTop: 40 }}>
//                   No Vehicles Found
//                 </Text>
//               )}
//             />

//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setVehicleModalVisible(false)}
//             >
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000b58"
//   },
//   loadingText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginTop: 20,
//     fontFamily: "appFont"
//   },
//   emptyContainer: {
//     marginTop: 20,
//     alignItems: "center"
//   },
//   emptyText: {
//     marginTop: 10,
//     color: "#FFFFFF",
//     fontFamily: "appFont"
//   },
//   header: {
//     marginTop: 60,
//     paddingHorizontal: 20,

//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },

//   greeting: {
//     fontSize: 16,
//     color: "#F8FAFC",
//     fontFamily: "appFont"
//     //backgroundColor: "#F8FAFC"
//   },

//   name: {
//     fontSize: 20,
//     fontFamily: "appFontBold",
//     color: "#F8FAFC"
//   },

//   emergencyCard: {
//     margin: 20,
//     padding: 25,

//     backgroundColor: "#F8FAFC",

//     borderRadius: 24,

//     alignItems: "center"
//   },

//   emergencyTitle: {
//     color: "#000000",
//     fontSize: 22,
//     marginTop: 10,
//     fontFamily: "appFont"
//   },

//   emergencySubTitle: {
//     color: "#000000",
//     marginTop: 5,
//     fontFamily: "appFont"
//   },

//   helpButton: {
//     marginTop: 20,
//     backgroundColor: "#000000",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 50
//   },
//   helpCancelButton: {
//     marginTop: 20,
//     backgroundColor: "#ff0000",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 50
//   },

//   helpText: {
//     fontFamily: "appFont",
//     color: "#F8FAFC",
//     fontSize: 14
//   },

//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",

//     paddingHorizontal: 20
//   },

//   statCard: {
//     width: "48%",
//     backgroundColor: "#fff",

//     padding: 20,

//     borderRadius: 20,

//     alignItems: "center",

//     elevation: 5
//   },

//   statNumber: {
//     fontSize: 26,
//     fontFamily: "Poppins-Bold",
//     color: "#2563EB"
//   },

//   sectionTitle: {
//     marginTop: 25,
//     marginBottom: 10,

//     paddingHorizontal: 20,

//     fontSize: 18,
//     fontFamily: "appFont",

//     color: "#ffffff"
//   },

//   vehicleCard: {
//     marginHorizontal: 20,
//     marginBottom: 25,
//     backgroundColor: "#fff",
//     padding: 18,
//     borderRadius: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 15,
//     elevation: 4
//   },

//   vehicleName: {
//     fontSize: 16,
//     fontFamily: "appFontSemiBold"
//   },
//   vehicle_no: {
//     fontFamily: "appFont"
//   },

//   mapPlaceholder: {
//     height: 250,

//     margin: 20,

//     backgroundColor: "#fff",

//     borderRadius: 24,

//     justifyContent: "center",
//     alignItems: "center",

//     elevation: 4
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center"
//   },

//   modalContainer: {
//     width: "92%",
//     height: "80%",
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     padding: 20
//   },

//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//     textAlign: "center"
//   },

//   vehicleCardInList: {
//     flexDirection: "row",
//     backgroundColor: "#F8F9FA",
//     borderRadius: 15,
//     padding: 12,
//     marginBottom: 15,
//     elevation: 3,
//     alignItems: "center"
//   },

//   vehicleImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 10,
//     marginRight: 15
//   },

//   vehicleNameInList: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 5
//   },

//   closeButton: {
//     marginTop: 15,
//     backgroundColor: "#0B4DFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center"
//   },

//   closeText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600"
//   },

//   button: {
//     backgroundColor: "#0B4DFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center"
//   },

//   buttonText: {
//     color: "#FFF",
//     fontWeight: "700",
//     fontSize: 16
//   }
// });

import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import VehicleCard from "@/components/vehicle_card";
import {
  deleteVehicle,
  getVehicles
} from "@/features/auth/services/add_vehicle_services";
import { makeHelpRequestHandling } from "@/features/auth/services/help_services";
import { webSocketService } from "@/features/auth/services/websocket_service";
import {
  getAddress,
  getContactNo,
  getName,
  getNIC,
  getUserEmail
} from "@/features/business/services/async_storage_handling";
import { Vehicle } from "@/models/vehicle_model";

export default function DashboardScreen() {
  const [getRequestHelp, setRequestHelp] = useState(false);
  const [user_name, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [currentHelpId, setCurrentHelpId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [locationUpdateStatus, setLocationUpdateStatus] = useState<string>("");
  const locationWatchId = useRef<Location.LocationSubscription | null>(null);
  const isLocationStreaming = useRef(false);

  useEffect(() => {
    initializeApp();

    // Cleanup on unmount
    return () => {
      stopLocationStreaming();
      webSocketService.disconnect();
    };
  }, []);

  const initializeApp = async () => {
    await getUserCurrentLocation();
    getGreeting();
    userNameGet();
    getUserVehicles();

    // Setup WebSocket listeners
    setupWebSocketListeners();
  };

  const setupWebSocketListeners = () => {
    // Listen for connection status
    webSocketService.on("connection-status", (data) => {
      setIsConnected(data.connected);
      if (data.connected) {
        console.log("WebSocket connected successfully");
        // If we have an active help request, rejoin the room
        if (currentHelpId) {
          webSocketService.joinHelpRoom(currentHelpId);
        }
      } else {
        console.log("WebSocket disconnected");
        setLocationUpdateStatus("Connection lost. Attempting to reconnect...");
      }
    });

    // Listen for location update confirmations
    webSocketService.on("location-updated", (data) => {
      if (data.confirmed) {
        setLocationUpdateStatus(
          `Location updated at ${new Date().toLocaleTimeString()}`
        );
        // Clear status after 3 seconds
        setTimeout(() => setLocationUpdateStatus(""), 3000);
      }
    });

    // Listen for reconnection attempts
    webSocketService.on("reconnecting", (data) => {
      setLocationUpdateStatus(`Reconnecting... Attempt ${data.attempt}`);
    });

    // Listen for errors
    webSocketService.on("error", (error) => {
      console.error("WebSocket error:", error);
      Alert.alert(
        "Connection Error",
        "Failed to maintain location streaming. Please check your internet connection."
      );
    });
  };

  const getUserCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please grant location permission to use this feature."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const startLocationStreaming = async (helpId: string) => {
    try {
      if (isLocationStreaming.current) {
        console.log("Location streaming already active");
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please grant location permission to share your real-time location."
        );
        return;
      }

      isLocationStreaming.current = true;
      setCurrentHelpId(helpId);

      // Join the help room
      webSocketService.joinHelpRoom(helpId);

      // Start watching location with high frequency for real-time updates
      locationWatchId.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000, // Update every 2 seconds
          distanceInterval: 5 // Or every 5 meters
        },
        (locationUpdate) => {
          // Update local state
          setLocation(locationUpdate);

          // Send location update via WebSocket
          if (isLocationStreaming.current && webSocketService.is_connected()) {
            webSocketService.sendLocationUpdate(
              helpId,
              locationUpdate.coords.latitude,
              locationUpdate.coords.longitude
            );
          }
        }
      );

      console.log("Location streaming started for help ID:", helpId);
    } catch (error) {
      console.error("Error starting location streaming:", error);
      Alert.alert(
        "Error",
        "Failed to start location tracking. Please try again."
      );
      isLocationStreaming.current = false;
    }
  };

  const stopLocationStreaming = () => {
    if (locationWatchId.current) {
      locationWatchId.current.remove();
      locationWatchId.current = null;
    }

    if (currentHelpId) {
      webSocketService.leaveHelpRoom(currentHelpId);
    }

    isLocationStreaming.current = false;
    setCurrentHelpId(null);
    console.log("Location streaming stopped");
  };

  const getUserVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const nic_ = await getNIC();
      if (!nic_) {
        setVehicles([]);
        return;
      }
      const result = await getVehicles(nic_);
      setVehicles(result);
    } catch (error) {
      console.log(`Dashboard vehicle loading error: ${error}`);
    } finally {
      setLoadingVehicles(false);
    }
  };

  const onPressDeleteVehicle = async (vehicle_no: string) => {
    Alert.alert(
      "Delete Vehicle",
      "Do you want to delete this vehicle?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            handlingVehicleDeletion(vehicle_no);
          }
        }
      ],
      { cancelable: true }
    );
  };

  const handlingVehicleDeletion = async (vehicle_no: string) => {
    try {
      const response = await deleteVehicle(vehicle_no);
      if (response)
        setVehicles((previous) =>
          previous.filter((vehicle) => vehicle.vehicle_no !== vehicle_no)
        );
    } catch (error) {
      console.log(`Vehicle deletion error: ${error}`);
    }
  };

  const handleReqHelp = async () => {
    if (getRequestHelp) {
      Alert.alert(
        "Cancel Request",
        "Do you want to cancel this help request?",
        [
          {
            text: "No",
            style: "destructive",
            onPress: () => {
              setRequestHelp(true);
            }
          },
          {
            text: "Yes",
            style: "cancel",
            onPress: () => {
              // Stop location streaming when cancelling
              stopLocationStreaming();
              setRequestHelp(false);
            }
          }
        ],
        {
          cancelable: true
        }
      );
    } else {
      Alert.alert(
        "Make a Request",
        "Do you want to make a help request?",
        [
          {
            text: "No",
            style: "destructive",
            onPress: () => {
              setRequestHelp(false);
            }
          },
          {
            text: "Yes",
            style: "cancel",
            onPress: () => {
              // Connect WebSocket before making request
              webSocketService.connect();
              setRequestHelp(true);
              displayVehicleList();
            }
          }
        ],
        {
          cancelable: true
        }
      );
    }
  };

  const userNameGet = async () => {
    const username = await getName();
    if (username) {
      setUserName(username);
    } else {
      setUserName("");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      setGreeting("Good Morning");
      return "Good Morning!";
    } else if (hour >= 12 && hour <= 15) {
      setGreeting("Good Afternoon");
      return "Good Afternoon!";
    } else if (hour > 15 && hour <= 23) {
      setGreeting("Good Evening");
      return "Good Evening!";
    } else {
      setGreeting("Good Night");
      return "Good Night!";
    }
  };

  const refreshVehicles = async () => {
    try {
      setRefreshing(true);
      await getUserVehicles();
    } catch (error) {
      console.log(`Refresh error: ${error}`);
    } finally {
      setRefreshing(false);
    }
  };

  const makeHelpRequest = async (
    vehicleImg: String,
    vehicleNo: String,
    vehicleModal: String,
    vehicleType: String,
    vehicleColor: String
  ) => {
    try {
      const user_name = await getName();
      const email = await getUserEmail();
      const nic = await getNIC();
      const contact_no = await getContactNo();
      const address = await getAddress();

      if (!location) {
        Alert.alert(
          "Location Error",
          "Unable to get your current location. Please try again."
        );
        return;
      }

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      const response = await makeHelpRequestHandling(
        user_name!,
        email!,
        vehicleImg,
        vehicleNo,
        vehicleModal,
        vehicleType,
        vehicleColor,
        nic!,
        contact_no!,
        address!,
        lat,
        lon
      );

      if (response && response.help_id) {
        // Start real-time location streaming
        await startLocationStreaming(response.help_id);
        Alert.alert("Success", "Help request created successfully!");
      } else {
        Alert.alert(
          "Error",
          "Failed to create help request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error making help request:", error);
      Alert.alert("Error", "An error occurred while making the help request.");
    }
  };

  const displayVehicleList = () => {
    setVehicleModalVisible(true);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 110
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {greeting ? greeting : "Have a Good Day..!"} 👋
          </Text>

          <Text style={styles.name}>{user_name ? user_name : "Welcome!"}</Text>
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
          style={[
            !getRequestHelp ? styles.helpButton : styles.helpCancelButton
          ]}
          onPress={() => handleReqHelp()}
        >
          <Text style={styles.helpText}>
            {!getRequestHelp ? "Request Help" : "Cancel Request"}
          </Text>
        </TouchableOpacity>

        {/* WebSocket status indicator */}
        {getRequestHelp && (
          <View style={styles.connectionStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isConnected ? "#4CAF50" : "#FF6B6B" }
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? "Connected" : "Disconnected"}
            </Text>
          </View>
        )}
      </View>

      {/* Map Section */}
      {getRequestHelp && (
        <>
          <Text style={styles.sectionTitle}>Live Tracking</Text>

          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={50} color="#94A3B8" />
            <Text>Google Map Here</Text>
            {locationUpdateStatus && (
              <Text style={styles.statusUpdateText}>
                {locationUpdateStatus}
              </Text>
            )}
            {location && (
              <Text style={styles.locationCoords}>
                Lat: {location.coords.latitude.toFixed(6)}, Lng:{" "}
                {location.coords.longitude.toFixed(6)}
              </Text>
            )}
          </View>
        </>
      )}

      {/* Vehicles */}
      <Text style={styles.sectionTitle}>My Vehicles</Text>
      {loadingVehicles ? (
        <Text style={styles.loadingText}>Loading Vehicles...</Text>
      ) : vehicles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={50} color="#CBD5E1" />
          <Text style={styles.emptyText}>No Vehicles Found</Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.vehicle_no}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <VehicleCard vehicle={item} onDelete={onPressDeleteVehicle} />
          )}
          refreshing={refreshing}
          onRefresh={refreshVehicles}
        />
      )}

      {/* Vehicle List Modal */}
      <Modal
        visible={vehicleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVehicleModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pick Your Vehicle</Text>

            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.vehicle_no}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={async () => {
                    await makeHelpRequest(
                      item.image_url,
                      item.vehicle_no,
                      item.model,
                      item.type,
                      item.color
                    );
                    setVehicleModalVisible(false);
                  }}
                >
                  <View style={styles.vehicleCardInList}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.vehicleImage}
                    />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.vehicleNameInList}>{item.model}</Text>
                      <Text>Vehicle No : {item.vehicle_no}</Text>
                      <Text>Type : {item.type}</Text>
                      <Text>Color : {item.color}</Text>
                      <Text>Owner : {item.name}</Text>
                      <Text>Contact : {item.contact_no}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text style={{ textAlign: "center", marginTop: 40 }}>
                  No Vehicles Found
                </Text>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVehicleModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000b58"
  },
  loadingText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "appFont"
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  emptyText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontFamily: "appFont"
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
  helpCancelButton: {
    marginTop: 20,
    backgroundColor: "#ff0000",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50
  },
  helpText: {
    fontFamily: "appFont",
    color: "#F8FAFC",
    fontSize: 14
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  statusText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "appFont"
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: "appFont",
    color: "#ffffff"
  },
  mapPlaceholder: {
    height: 250,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  },
  statusUpdateText: {
    marginTop: 8,
    fontSize: 12,
    color: "#4CAF50",
    fontFamily: "appFont"
  },
  locationCoords: {
    marginTop: 4,
    fontSize: 11,
    color: "#666",
    fontFamily: "appFont"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "92%",
    height: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center"
  },
  vehicleCardInList: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center"
  },
  vehicleImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15
  },
  vehicleNameInList: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#0B4DFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  closeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
