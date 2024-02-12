import React, { useEffect } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "@env";

function Main() {
  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // Access the API key from process.env
        customMapStyle={REACT_APP_GOOGLE_MAPS_API_KEY}
      />
    </View>
  );
}

export default Main;
