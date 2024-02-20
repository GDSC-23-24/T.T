import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
import { API_TOKEN } from '../../API';
import { useNavigation } from '@react-navigation/native';
const FishBowlOther = () => {
    const [userData, setUserData] = useState(null);
    const [components, setComponents] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const memberId = route.params?.memberId;
    const componentImagePaths = {
        'YellowFish': require('../../Asset/img/Yellowfish.png'),
        'RedFish': require('../../Asset/img/Redfish.png'),
        'MintFish': require('../../Asset/img/Mintfish.png'),
        'GreenFish': require('../../Asset/img/Greenfish.png'),
        'ShellFish': require('../../Asset/img/shellfish.png'),
        'SeaWeed': require('../../Asset/img/seaweed.png'),
        'SeaWeeds': require('../../Asset/img/seaweeds.png'),
        'Sand': require('../../Asset/img/sand.png'),
        'Rock': require('../../Asset/img/rock.png'),
    };
    useEffect(() => {
        fetchHomeData();
        if (memberId) {
            fetchHomeData(memberId);
        }
    },[memberId]);

    const fetchHomeData = async (memberId) => {
        try {
            const response = await fetch(`http://10.0.2.2:8080/api/fish-bowl/${memberId}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + API_TOKEN,
                },
            });
    
            const data = await response.json();
            console.log('Fetched data:', data);
    
            if (data.success) {
                setUserData(data.data);
                setComponents(data.data.componentResponseDtoList);
            } else {
                console.error('Error fetching data:', data.message);
            }
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    };

    const handleAddPress = () => {
        // Toggle the visibility of the buttons
        setShowButtons(!showButtons);
    };

    const handleSharePress = () => {
        // Implement the logic for the Share button press
        console.log('Share button pressed');
    };

    const handleClosetPress = () => {
        console.log('My Closet button pressed, userData:', userData);
        if (userData) {
            navigation.navigate('MyCloset', { data: userData });
        } else {
            console.error('Error: userData is undefined');
        }
    };

    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.fishbowl}>Fish Bowl</Text>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.column}>
                        {/* Display user information */}
                        <Text style={styles.name}>Name</Text>
                        <View style={styles.info}>
                            <Image source={require('../../Asset/img/badge.png')} style={styles.infoImg} />
                            <Text style={styles.name1}>{userData && userData.memberDto.nickname}</Text>
                        </View>

                        <Text style={styles.name}>Visitor</Text>
                        <View style={styles.info}>
                            <Image source={require('../../Asset/img/group.png')} style={styles.infoImg} />
                            <Text style={styles.name1}>{userData && userData.viewCount}</Text>
                        </View>
                    </View>

                    <View style={styles.column}>
                        {/* Display additional information */}
                        <Text style={styles.name}>Like</Text>
                        <View style={styles.info}>
                            <Image source={require('../../Asset/img/favorite.png')} style={styles.infoImg} />
                            <Text style={styles.name1}>{userData && userData.likesCount}</Text>
                        </View>

                        <Text style={styles.name}>My Point</Text>
                        <View style={styles.Frame121}>
                            <View style={styles.info}>
                                <Image source={require('../../Asset/img/coin.png')} style={styles.infoImg} />
                                <Text style={styles.name1}>{userData && userData.coin}P</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Image source={require('../../Asset/img/sand.png')} style={styles.sand} />
                <View style={styles.bowlMain}>
                    <Image source={require('../../Asset/img/fishbowl0.png')} style={styles.fishbowl0} />
                    {/* Display components in the fish bowl */}
                    {components.map((component) => (
                        // Check if the component should be in the bowl
                        component.isInBowl && (
                            <Image
                                key={component.id}
                                source={componentImagePaths[component.componentName]}
                                style={{
                                    ...styles.fishbowl0,
                                    position: 'absolute',
                                    top: component.y,
                                    left: component.x,
                                }}
                                onError={(e) => console.log(`Error loading image: ${e.nativeEvent.error}`)}
                            />
                        )
                    ))}
                </View>
            </View>
            {/* Bottom Bar */}
            <BottomBar />
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fishbowl: {
        margin: 25,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e1e1e',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
    },
    Frame121: {
        width: 160,
        height: 53,
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 5,
        alignItems: 'center',
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#adadad',
    },
    name1: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e1e1e',
        marginLeft: 5,
    },
    infoImg: {
        width: 30,
        height: 30,
    },
    bowlMain: {
        width: 368,
        height: 230,
        margin: 10,
        padding: 10,
        alignSelf: 'center',
    },
    fishbowl0: {
        width: 300,
        height: 300,
        marginLeft: 30
    },
    sand: {
        position: 'absolute',
        width: 250,
        height: 250,
        top: 270,
        left:80
    },
    fishbowl1: {
        width: 30,
        height: 30,
    },
    info: {
        flexDirection: 'row',
    },
});

export default FishBowlOther;
