import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

const { width } = Dimensions.get("window");

const banners = [
  "https://cdn.prod.website-files.com/64f8a0ba6a93cc5052e14462/64f8a0ba6a93cc5052e155ad_MECANIQUEC.png",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98"
];

export default function TechnicianDashboard() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex =
        currentIndex === banners.length - 1 ? 0 : currentIndex + 1;

      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Accessing Your Current Location",
          "Location Permission Denied."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      console.log(currentLocation);
      setLocation(currentLocation);

      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          },
          1000
        );
      }, 500);

      const region: Region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };
      //mapRef.current?.animateToRegion(region, 1000);
    } catch (error) {
      console.log(`Current location error: ${error}`);
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Good Morning 👋</Text>
            <Text style={styles.username}>Technician</Text>
          </View>
        </View>

        {/* BANNER */}

        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.bannerCard}>
                <Image source={{ uri: item }} style={styles.bannerImage} />

                {/* Dark Overlay */}
                <View style={styles.imageOverlay} />

                {/* Text Overlay */}
                <View style={styles.overlay}>
                  <Text style={styles.bannerTitle}>Help Users Anytime</Text>

                  <Text style={styles.bannerSubtitle}>
                    View and manage roadside assistance requests.
                  </Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* MAP */}

        <View style={styles.mapCard}>
          <Text style={styles.mapTitle}>Live Tracking</Text>

          {loadingLocation ? (
            <View
              style={{
                height: 350,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>Getting your location...</Text>
            </View>
          ) : (
            <MapView
              loadingEnabled={true}
              showsMyLocationButton={true}
              showsUserLocation={true}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              ref={mapRef}
              region={{
                latitude: location?.coords.latitude ?? 6.9271,
                longitude: location?.coords.longitude ?? 79.8612,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                  }}
                  title="Current Location"
                />
              )}
            </MapView>

            // <MapView
            //   onMapReady={() => console.log("Map is ready")}
            //   ref={mapRef}
            //   provider={PROVIDER_GOOGLE}
            //   style={styles.map}
            //   showsUserLocation={true}
            //   showsMyLocationButton={true}
            //   loadingEnabled={true}
            //   initialRegion={
            //     location
            //       ? {
            //           latitude: location.coords.latitude,
            //           longitude: location.coords.longitude,
            //           latitudeDelta: 0.01,
            //           longitudeDelta: 0.01
            //         }
            //       : {
            //           latitude: 6.9271,
            //           longitude: 79.8612,
            //           latitudeDelta: 0.01,
            //           longitudeDelta: 0.01
            //         }
            //   }
            // >
            //   {location && (
            //     <Marker
            //       coordinate={{
            //         latitude: location.coords.latitude,
            //         longitude: location.coords.longitude
            //       }}
            //       title="My Current Location"
            //       description="Technician Position"
            //     />
            //   )}
            // </MapView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000B58"
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  welcome: {
    fontSize: 16,
    color: "#F8FAFC",
    fontFamily: "appFont"
  },

  username: {
    fontSize: 20,
    fontFamily: "appFontBold",
    color: "#F8FAFC"
  },

  avatarContainer: {
    width: 55,
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  bannerContainer: {
    marginTop: 25
  },

  bannerCard: {
    width: width,
    height: 220,
    paddingHorizontal: 15
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20
  },

  overlay: {
    position: "absolute",
    bottom: 20,
    left: 30
  },

  bannerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700"
  },

  bannerSubtitle: {
    color: "#FFF",
    marginTop: 5
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 20
  },

  statCard: {
    backgroundColor: "#FFF",
    width: "31%",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 20
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10
  },

  statTitle: {
    color: "#666",
    marginTop: 5
  },

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 25
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700"
  },

  requestCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center"
  },

  requestTitle: {
    fontSize: 16,
    fontWeight: "700"
  },

  requestLocation: {
    color: "#666",
    marginTop: 3
  },

  mapCard: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 20,
    padding: 15,
    marginBottom: 100
  },

  mapTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center"
  },

  map: {
    height: 350,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden"
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 15, // same as bannerCard horizontal padding
    right: 15,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20
  }
});
