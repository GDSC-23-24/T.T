import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity,Alert  } from 'react-native';
import { API_TOKEN } from '../../API'
const MyCloset = ({ route }) => {
    const { data } = route.params;
    const [components, setComponents] = useState([]);
    const [isArranging, setIsArranging] = useState(false); // State to track whether arranging is in progress
    const componentImagePaths = {
        'YellowFish': require('../../Asset/img/Yellowfish.png'),
        'RedFish': require('../../Asset/img/Redfish.png'),
        'MintFish': require('../../Asset/img/Mintfish.png'),
        'GreenFish': require('../../Asset/img/Greenfish.png'),
        'ShellFish': require('../../Asset/img/shellfish.png'),
        'SeaWeed': require('../../Asset/img/seaweed.png'),
        'Seaweed x 2': require('../../Asset/img/seaweeds.png'),
        'Sand': require('../../Asset/img/sand.png'),
        'Rock': require('../../Asset/img/rock.png'),
    };
    if (!data || !data.memberDto || !data.componentResponseDtoList) {
        // If data is undefined or missing expected properties, you can handle it accordingly
        return (
            <View style={styles.container}>
                <Text style={styles.title}>My Closet</Text>
                <Text>Error: Data is undefined or missing properties</Text>
            </View>
        );
    }

    const { memberDto, componentResponseDtoList } = data;
    const placeComponentInBowl = (component) => {
        const coordinates = {
            YellowFish: { x: 30, y: 50, width: 100, height: 100 },
    RedFish: { x: 20, y: 30, width: 80, height: 80 },
    MintFish: { x: 40, y: 5, width: 120, height: 120 },
    GreenFish: { x: 10, y: 20, width: 90, height: 90 },
    ShellFish: { x: 5, y: 15, width: 70, height: 70 },
    SeaWeed: { x: 25, y: 45, width: 110, height: 110 },
    'Seaweed x 2': { x: 15, y: 25, width: 130, height: 130 },
    Sand: { x: 35, y: 40, width: 100, height: 100 },
    Rock: { x: 8, y: 18, width: 85, height: 85 },
          };
        
       // Update the coordinates in the frontend
  setComponents((prevComponents) => [
    ...prevComponents,
    {
      id: component.id,
      componentName: component.componentName,
      x: coordinates[component.componentName].x,
      y: coordinates[component.componentName].y,
      isInBowl: true,
    },
  ]);

  // Update the coordinates in the backend
  const updatedComponents = [
    {
      id: component.id,
      componentName: component.componentName,
      x: coordinates[component.componentName].x,
      y: coordinates[component.componentName].y,
    },
  ];

        
          fetch('http://10.0.2.2:8080/api/component/edit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + API_TOKEN,
            },
            body: JSON.stringify(updatedComponents),
          })
          .then(response => response.json())
          .then(data => {
            // Handle the response from the backend if needed
            console.log('Coordinates updated successfully:', data);
          })
          .catch(error => {
            console.error('Error updating coordinates:', error);
            // Handle errors if necessary
          });
        };
        
      const fishbowlWidth = 250; // Adjust this value based on your fishbowl image width
      const fishbowlHeight = 200; // Adjust this value based on your fishbowl image height
      return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <Text style={styles.title}>My Closet</Text>
            {/* Display user information */}
            <Image source={{ uri: memberDto.profileImageUrl }} style={styles.profileImage} />
            <Text style={styles.nickname}>{memberDto.nickname}</Text>
            {/* Horizontal ScrollView for Aquarium Images */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {/* Display components in the closet */}
              {componentResponseDtoList
                .filter((component) => !component.isInBowl)
                .map((component) => {
                  const componentName = component.componentName;
                  console.log('Looking up image for component:', componentName);
                  return (
                    <TouchableOpacity
                      style={styles.imageBox}
                      key={component.id}
                      onPress={() => {
                        Alert.alert(
                          'Confirm',
                          `Do you want to place ${componentName} in the fishbowl?`,
                          [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                console.log('Placing component:', componentName);
                                placeComponentInBowl(component);
                              },
                            },
                          ],
                        );
                      }}
                    >
                      <View>
                        <Image
                          source={componentImagePaths[componentName]}
                          style={styles.componentImage}
                          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                        />
                        <Text style={styles.componentName}>{componentName}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
            <Image source={require('../../Asset/img/sand.png')} style={styles.sand} />
            <View style={styles.bowlMain}>
              <Image source={require('../../Asset/img/fishbowl0.png')} style={styles.fishbowl0} />
              {/* Display components in the fish bowl */}
              {components.map((component, index) => (
                <Image
                    key={`${component.id}-${index}`} 
                  source={componentImagePaths[component.componentName]}
                  style={{
                    ...styles.fishbowl0,
                    position: 'absolute',
                    top: Math.min(fishbowlHeight - 50, Math.max(0, component.y)), // Clamp the position within fishbowl height
                    left: Math.min(fishbowlWidth - 50, Math.max(0, component.x)), // Clamp the position within fishbowl width
                  }}
                  onError={(e) => console.log(`Error loading image: ${e.nativeEvent.error}`)}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>arrange</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        flex: 1,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    nickname: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollViewContent: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    imageBox: {
        width: 130,
        height: 130,
        marginLeft:10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center'
    },
    componentImage: {
        width: 100,
        height: 100,
    },
    componentName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#404040',
        textAlign: "center"
    },
    Button: {
        marginLeft: 280,
        marginBottom: 10,
        borderRadius: 100,
        backgroundColor: '#0057ff',
        width: 70,
        height: 70,
    },
    ButtonText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#fff',
    },
    bowlMain: {
        width: 368,
        height: 300,
        margin: 10,
        alignSelf: 'center',
    },
    fishbowl0: {
        width: 350,
        height: 350,
        marginLeft: 10
    },
    sand: {
        position: 'absolute',
        width: 250,
        height: 250,
        top: 440,
        left: 80
    },
});

export default MyCloset;
