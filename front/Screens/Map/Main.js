import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  const handlePlaceSelect = (data, details) => {
    setSelectedPlace({ data, details });
  };

  const moveMapToSelectedPlace = () => {
    if (mapRef.current && selectedPlace) {
      const { lat, lng } = selectedPlace.details.geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 35.1085, // 초기위치 사하구
          longitude: 128.9643, // 초기위치 사하구
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          minLength={2}
          placeholder=" Search here"
          query={{
            key: '',
            language: "ko",
            components: "country:kr",
          }}
          keyboardShouldPersistTaps={"handled"}
          fetchDetails={true}
          onPress={(data, details) => handlePlaceSelect(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          enablePoweredByContainer={false}
        />
        <TouchableOpacity style={styles.searchButton} onPress={moveMapToSelectedPlace}>
          <Text style={styles.searchButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    top: 20, 
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'transparent', // 검색창을 투명하게
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#4285F4',
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Main;
