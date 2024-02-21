import React, { useState, useRef, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomBar from '../Common/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const [mapData, setMapData] = useState([]);
  const [token, setToken] = useState(null);

  // Function to retrieve token from AsyncStorage
  const retrieveToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        // Set the token in the component state
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const handlePlaceSelect = (data, details) => {
    setSelectedPlace({ data, details });
  };

  const fetchMapData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}` // Include the token in the request headers
      },
    };
    console.log('token:', token);
    try {
      const response = await fetch('http://10.0.2.2:8080/api/map', options);
      if (response.ok) {
        const data = await response.json();
        setMapData(data.datalist);
      } else {
        console.log('Map data fetch failed');
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
    }
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

  useEffect(() => {
    // Retrieve token when the component mounts
    retrieveToken();
  }, []);

  useEffect(() => {
    // Fetch map data when the token changes
    fetchMapData();
  }, [token]);

  return (
    <View style={styles.container}>
      <MapView
         ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 35.045775,
          longitude: 128.964464,
          latitudeDelta: 0.01, 
          longitudeDelta: 0.01,
        }}
      >
        {mapData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={`${marker.createdAt || ''}`}
            description="Did you clean up? Move to Upload Img Tab"
      
            
          />
        ))}
      </MapView>
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          minLength={2}
          placeholder=" Search here"
          query={{
            key: 'API_key',
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
       
      {/* Bottom Bar */}
      <BottomBar />
      
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
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
    backgroundColor: 'transparent', // Make the search bar transparent
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0057ff',
    borderRadius: 8,
    marginLeft:10
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Main;
