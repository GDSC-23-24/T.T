import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
import { API_TOKEN } from '../../API';
const FishBowlHome = () => {
    const [userData, setUserData] = useState(null);
    const [components, setComponents] = useState([]);

    const componentImagePaths = {
        'yellow fish': require('../../Asset/img/Yellowfish.png'),
        'red fish': require('../../Asset/img/Redfish.png'),
        'mint fish': require('../../Asset/img/Mintfish.png'),
        'green fish': require('../../Asset/img/Greenfish.png'),

    }
    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8080/api/fish-bowl/home', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + API_TOKEN,
                }
            });
            const data = await response.json();
            if (data.success) {
                setUserData(data.data);
                setComponents(data.data.componentResponseDtoList);
            }
        } catch (error) {
            console.error('Error fetching home data:', error);
        }
    };

    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.fishbowl}>Fish Bowl</Text>
                    <TopBar />
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
                <TouchableOpacity style={styles.Rectangle2225}>
                    <Image source={require('../../Asset/img/add.png')} style={styles.add} />
                </TouchableOpacity>
                <Image source={require('../../Asset/img/sand.png')} style={styles.sand} />
                <View style={styles.bowlMain}>
                    <Image source={require('../../Asset/img/fishbowl0.png')} style={styles.fishbowl0} />
                    {/* Display components in the fish bowl */}
                    {components.map((component) => (
                        <Image
                            key={component.id}
                            source={componentImagePaths[component.componentName]}
                            style={{ ...styles.fishbowl0, position: 'absolute', top: component.y, left: component.x }}
                            onError={(e) => console.log(`Error loading image: ${e.nativeEvent.error}`)}
                        />
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
    Rectangle2225: {
        width: 55,
        height: 55,
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#0057ff',
        position: 'absolute',
        top: 570,
        right: 13,
    },
    add: {
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
        top: 320,
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

export default FishBowlHome;
