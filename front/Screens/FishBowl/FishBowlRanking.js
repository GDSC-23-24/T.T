import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FishBowlRanking = () => {
    const [rankingsData, setRankingsData] = useState([]);
    const [token, setToken] = useState(null);
    const [likedItems, setLikedItems] = useState([]);

    const navigation = useNavigation();
    const handleGoPress = memberId => {
        navigation.navigate('FishBowlOther', { memberId });
    };

    const toggleLikeStatus = async (memberId) => {
        // Check if the memberId is already in likedItems
        if (likedItems.includes(memberId)) {
            // If yes, remove it from the likedItems
            setLikedItems(likedItems.filter((id) => id !== memberId));
        } else {
            // If no, add it to the likedItems
            setLikedItems([...likedItems, memberId]);
        }
    
        // Send a POST request to update the like status on the server
        const url = `http://10.0.2.2:8080/api/likes/${memberId}`;
        const method = likedItems.includes(memberId) ? 'DELETE' : 'POST';
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({}), // You can include a request body if needed
            });
    
            const data = await response.json();
    
            console.log('Response data:', data); // Log the response data
    
            if (data.success) {
                console.log('Like status updated successfully:', data.message);
            } else {
                console.error('Failed to update like status:', data.message);
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };
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

    useEffect(() => {
        retrieveToken();

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        };

        fetch('http://10.0.2.2:8080/api/fish-bowl/ranking', options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setRankingsData(data.datalist);
                } else {
                    console.error('Failed to fetch data:', data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [token]);

    return (
        <ImageBackground
            source={require('../../Asset/img/background_bowl.png')}
            style={styles.backgroundImage}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.fishbowl}>Fish Bowl</Text>
                        <TopBar />
                    </View>
                    <Text style={styles.RANK}>LIKE RANK 10</Text>
                    {/* Display Top 3 rankings in pyramid style */}
                    <View style={styles.pyramidContainer}>
                        {rankingsData.slice(0, 3).map((item, index) => (
                            <View key={index} style={styles.rankItem}>
                                <Text style={styles.rankNumber}>{index + 1}</Text>
                                <Image
                                    source={
                                        item?.memberDto?.profileImageUrl
                                            ? { uri: item.memberDto.profileImageUrl }
                                            : require('../../Asset/img/none.png')
                                    }
                                    style={styles.profileImage}
                                />
                                <Text style={styles.rankName}>{item?.memberDto?.nickname}</Text>
                                <View style={styles.info}>
                                    <TouchableOpacity onPress={() => toggleLikeStatus(item?.memberDto?.id)}>
                                        <Image
                                            source={
                                                likedItems.includes(item?.memberDto?.id)
                                                    ? require('../../Asset/img/favorite.png')
                                                    : require('../../Asset/img/favorite_none.png')
                                            }
                                            style={styles.favoriteIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.likesCount}>{item?.likesCount}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.goButton}
                                    onPress={() => handleGoPress(item?.memberDto?.id)}>
                                    <Text style={styles.goButtonText}>Go</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Display rankings 4 to 9 inside the box with "Go" button */}
                    <View style={styles.rankingBox}>
                        {rankingsData.slice(3, 9).map((item, index) => (
                            <View key={index} style={styles.rankItem2}>
                                <Text style={styles.rankNumber}>{index + 4}</Text>
                                <Image
                                    source={
                                        item?.memberDto?.profileImageUrl
                                            ? { uri: item.memberDto.profileImageUrl }
                                            : require('../../Asset/img/none.png')
                                    }
                                    style={styles.profileImage}
                                />
                                <View>
                                    <Text style={styles.rankName}>{item?.memberDto?.nickname}</Text>
                                    <View style={styles.info}>
                                        <TouchableOpacity onPress={() => toggleLikeStatus(item?.memberDto?.id)}>
                                            <Image
                                                source={
                                                    likedItems.includes(item?.memberDto?.id)
                                                        ? require('../../Asset/img/favorite.png')
                                                        : require('../../Asset/img/favorite_none.png')
                                                }
                                                style={styles.favoriteIcon}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.likesCount}>{item?.likesCount}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.goButton}
                                    onPress={() => handleGoPress(item?.memberDto?.id)}>
                                    <Text style={styles.goButtonText}>Go</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
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
    RANK: {
        fontSize: 17,
        fontWeight: '700',
        color: 'black',
        marginLeft: 20,
        marginTop: 10,
    },
    rankItem: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    pyramidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    rankItem2: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    info: {
        flexDirection: 'row',
    },
    rankNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#97bbff',
    },
    profileImage: {
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    rankName: {
        fontSize: 11,
        color: '#1e1e1e',
    },
    favorite: {
        marginTop: 2,
    },
    likesCount: {
        fontSize: 13,
        marginLeft: 5,
    },
    rankingBox: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        padding: 14,
    },
    goButton: {
        width: 48,
        height: 29,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#bdd4ff',
        backgroundColor: '#fff',
        marginLeft: 'auto',
        marginRight: 10,
        elevation: 5,
    },
    goButtonText: {
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(0, 87, 255, 0.5)',
    },
});

export default FishBowlRanking;
