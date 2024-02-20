import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
import { useNavigation } from '@react-navigation/native';
const FishBowlRanking = () => {
    const [rankingsData, setRankingsData] = useState([]);
    const navigation = useNavigation();
    const handleGoPress = (memberId) => {
        navigation.navigate('FishBowlOther', { memberId });
    };
    useEffect(() => {
        fetch('http://10.0.2.2:8080/api/fish-bowl/ranking')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setRankingsData(data.datalist);
                } else {
                    console.error('Failed to fetch data:', data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.fishbowl}>Fish Bowl</Text>
                        <TopBar />
                    </View>
                    <Text style={styles.RANK}>LIKE RANK 10</Text>
                    {/* Display Top 3 rankings in pyramid style */}
                    <View style={styles.pyramidContainer}>
                        {/* 2nd place on the left */}
                        <View style={styles.rankItem}>
                            <Text style={styles.rankNumber}>2</Text>
                            <Image
                                source={
                                    rankingsData.length > 1 && rankingsData[1].memberDto.profileImageUrl
                                        ? { uri: rankingsData[1].memberDto.profileImageUrl }
                                        : require('../../Asset/img/none.png') // Default image when profileImageUrl is null
                                }
                                style={styles.profileImage}
                            />
                            <Text style={styles.rankName}>{rankingsData.length > 1 && rankingsData[1].memberDto.nickname}</Text>
                            <View style={styles.info}>
                                <Image source={require('../../Asset/img/favorite_none.png')} style={styles.favorite_none} />
                                <Text style={styles.likesCount}>{rankingsData.length > 1 && rankingsData[1].likesCount}</Text>
                            </View>
                            <TouchableOpacity style={styles.goButton} onPress={() => handleGoPress(rankingsData[1].memberDto.id)}>
                            <Text style={styles.goButtonText}>Go</Text>
                            </TouchableOpacity>
                        </View>
                        {/* 1st place in the middle */}
                        <View style={styles.rankItem}>
                            <Text style={styles.rankNumber}>1</Text>
                            <Image
                                source={
                                    rankingsData.length > 0 && rankingsData[0].memberDto.profileImageUrl
                                        ? { uri: rankingsData[0].memberDto.profileImageUrl }
                                        : require('../../Asset/img/none.png') // Default image when profileImageUrl is null
                                }
                                style={styles.profileImage}
                            />
                            <Text style={styles.rankName}>{rankingsData.length > 0 && rankingsData[0].memberDto.nickname}</Text>
                            <View style={styles.info}>
                                <Image source={require('../../Asset/img/favorite_none.png')} style={styles.favorite_none} />
                                <Text style={styles.likesCount}>{rankingsData.length > 0 && rankingsData[0].likesCount}</Text>
                            </View>
                            <TouchableOpacity style={styles.goButton} onPress={() => handleGoPress(rankingsData[0].memberDto.id)}>
                            <Text style={styles.goButtonText}>Go</Text>
                            </TouchableOpacity>
                        </View>
                        {/* 3rd place on the right */}
                        <View style={styles.rankItem}>
                            <Text style={styles.rankNumber}>3</Text>
                            <Image
                                source={
                                    rankingsData.length > 2 && rankingsData[2].memberDto.profileImageUrl
                                        ? { uri: rankingsData[2].memberDto.profileImageUrl }
                                        : require('../../Asset/img/none.png') // Default image when profileImageUrl is null
                                }
                                style={styles.profileImage}
                            />
                            <Text style={styles.rankName}>{rankingsData.length > 2 && rankingsData[2].memberDto.nickname}</Text>
                            <View style={styles.info}>
                                <Image source={require('../../Asset/img/favorite_none.png')} style={styles.favorite_none} />
                                <Text style={styles.likesCount}>{rankingsData.length > 2 && rankingsData[2].likesCount}</Text>
                            </View>
                            <TouchableOpacity style={styles.goButton} onPress={() => handleGoPress(rankingsData[2].memberDto.id)}>
                            <Text style={styles.goButtonText}>Go</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Display rankings 4 to 9 inside the box with "Go" button */}
                    <View style={styles.rankingBox}>
                        {rankingsData.slice(3, 9).map((item, index) => (
                            <View key={index} style={styles.rankItem2}>
                                <Text style={styles.rankNumber}>{index + 4}</Text>
                                <Image
                                    source={
                                        item.memberDto.profileImageUrl
                                            ? { uri: item.memberDto.profileImageUrl }
                                            : require('../../Asset/img/none.png') // Default image when profileImageUrl is null
                                    }
                                    style={styles.profileImage}
                                /><View>
                                    <Text style={styles.rankName}>{item.memberDto.nickname}</Text>
                                    <View style={styles.info}>
                                        <Image source={require('../../Asset/img/favorite_none.png')} style={styles.favorite_none}></Image>
                                        <Text style={styles.likesCount}>{item.likesCount}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.goButton} onPress={() => handleGoPress(item.memberDto.id)}>
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
        marginTop: 10
    },
    rankItem: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    pyramidContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    rankItem2: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    info: {
        flexDirection: 'row'
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
    favorite_none: {
        marginTop: 2
    },
    likesCount: {
        fontSize: 13,
        marginLeft: 5
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
        borderColor: "#bdd4ff",
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
