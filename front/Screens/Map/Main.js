import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Main = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 35.1085, // 초기위치 사하구
            longitude: 128.9643, // 초기위치 사하구
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Main;