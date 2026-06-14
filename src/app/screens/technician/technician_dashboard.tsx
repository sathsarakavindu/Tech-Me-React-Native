import { useEffect, useRef, useState } from "react";
import {
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
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

const banners = [
  "https://cdn.prod.website-files.com/64f8a0ba6a93cc5052e14462/64f8a0ba6a93cc5052e155ad_MECANIQUEC.png",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98"
];

export default function TechnicianDashboard() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.mapTitle}>Live Technician Tracking</Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 6.9271,
              longitude: 79.8612,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          >
            <Marker
              coordinate={{
                latitude: 6.9271,
                longitude: 79.8612
              }}
              title="Current Location"
            />
          </MapView>
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
    marginBottom: 15
  },

  map: {
    height: 350,
    borderRadius: 15
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
