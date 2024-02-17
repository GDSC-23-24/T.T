import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';

const FishBowlRanking = () => {
    // Assume you have a list of rankings data, e.g., [{rank: 1, name: 'John'}, {rank: 2, name: 'Jane'}, ...]
    const rankingsData = [
        { rank: 1, name: 'kespel' },
        { rank: 2, name: 'kespel' },
        { rank: 3, name: 'lika' },
        { rank: 4, name: 'Alice' },
        { rank: 5, name: 'Bob' },
        { rank: 6, name: 'Eve' },
        { rank: 7, name: 'Charlie' },
        { rank: 8, name: 'Grace' },
        { rank: 9, name: 'Frank' },
      ];
      
    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.fishbowl}>Fish Bowl</Text>
                    <TopBar />
                </View>

                {/* Display Top 3 rankings outside the box */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    {rankingsData.slice(0, 3).map((item, index) => (
                        <View key={index} style={styles.rankItem}>
                            <Text style={styles.rankNumber}>{item.rank}</Text>
                            <Text style={styles.rankName}>{item.name}</Text>
                        </View>
                    ))}
                </View>

                {/* Display rankings 4 to 9 inside the box */}
                <View style={styles.rankingBox}>
                    {rankingsData.slice(3, 9).map((item, index) => (
                        <View key={index} style={styles.rankItem}>
                            <Text style={styles.rankNumber}>{item.rank}</Text>
                            <Text style={styles.rankName}>{item.name}</Text>
                        </View>
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
    rankItem: {
        alignItems: 'center',
    },
    rankNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1e1e1e',
    },
    rankName: {
        fontSize: 11,
        color: '#1e1e1e',
    },
    rankingBox: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Corrected property name
        borderRadius: 20,
        padding: 14,
        paddingTop: 0,
        paddingBottom: 5,
        backdropFilter: 'blur(22px)',
        boxShadow: '0 1px 10px 0 rgba(0, 87, 255, 0.15)',
    },
});

export default FishBowlRanking;
