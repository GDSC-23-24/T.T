import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
// Import the aquarium images
import bowl0 from '../../Asset/img/fishbowl0.png';
import bowl1 from '../../Asset/img/fishbowl1.png';
import bowl2 from '../../Asset/img/fishbowl2.png';
import bowl3 from '../../Asset/img/fishbowl3.png';
import bowl4 from '../../Asset/img/fishbowl4.png';
// Import the fish images
import yellowFish from '../../Asset/img/Yellowfish.png';
import mintFish from '../../Asset/img/Mintfish.png';
import redFish from '../../Asset/img/Redfish.png';
import greenFish from '../../Asset/img/Greenfish.png';

// Import the decoration images
import shellfish from '../../Asset/img/shellfish.png';
import seaweed from '../../Asset/img/seaweed.png';
import seaweeds from '../../Asset/img/seaweeds.png';
import sand from '../../Asset/img/sand.png';
import rock from '../../Asset/img/rock.png';
const FishBowlStore = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchText);
    };
    
    const aquariumImages = [bowl0, bowl1, bowl2, bowl3, bowl4];
    const fishImages = [yellowFish, mintFish, redFish, greenFish];
    const fishColorLabels = ['Yellow', 'Mint', 'Red', 'Green'];
    const decorationImages = [shellfish, seaweed, seaweeds, sand, rock];
    const decorationLabels = ['Shellfish', 'Seaweed', 'Seaweed x 2', 'Sand', 'Rock'];

    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search component"
                            placeholderTextColor="#939393"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                    <TopBar />
                </View>
                <ScrollView>
                    {/* Choice Your Fish Bowl */}
                    <Text style={styles.choiceYourFishBowl}>Choice Your Fish Bowl!</Text>

                    {/* Horizontal ScrollView for Aquarium Images */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        {aquariumImages.map((image, index) => (
                            <TouchableOpacity key={index} style={styles.aquariumImageContainer}>
                                <Image
                                    source={image}
                                    style={styles.aquariumImage}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {/* Types of Fish */}
                    <Text style={styles.typesOfFish}>Types of Fish</Text>

                    {/* Horizontal ScrollView for Fish Images */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.fishScrollViewContent}
                    >
                        {fishImages.map((fish, index) => (
                            <View key={index} style={styles.fishContainer}>
                                <View style={styles.imageBox}>
                                    <Image
                                        source={fish}
                                        style={styles.fishImage}
                                    />
                                </View>
                                <Text style={styles.fishLabel}>{fishColorLabels[index]} Fish</Text>
                            </View>
                        ))}
                    </ScrollView>
                    {/* Decoration Items */}
                    <Text style={styles.decoration}>Decoration</Text>

                    {/* Horizontal ScrollView for Decoration Images */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.decorationScrollViewContent}
                    >
                        {decorationImages.map((decoration, index) => (
                            <View key={index} style={styles.decorationContainer}>
                                <View style={styles.imageBox}>
                                    <Image
                                        source={decoration}
                                        style={styles.decorationImage}
                                    />
                                </View>
                                <Text style={styles.decorationLabel}>{decorationLabels[index]}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </ScrollView>
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
    },
    searchContainer: {
        width: 285,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginTop: 25,
        borderRadius: 10,
    },
    searchInput: {
        width: 200,
        height: 30,
        borderRadius: 15,
        padding: 5,
        marginHorizontal: 8,
        fontSize: 17,
        fontWeight: '500',
        color: '#1e1e1e',
    },
    choiceYourFishBowl: {
        width: 130,
        height: 50,
        margin: 22,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0057ff',
    },
    scrollViewContent: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    aquariumImageContainer: {
        marginRight: 10,
    },
    aquariumImage: {
        width: 188,
        height: 192,
        objectFit: 'contain',
    },
    viewAll: {
        width: 40,
        height: 16,
        marginVertical: 24,
        marginRight: 26,
        fontSize: 11,
        fontWeight: '500',
        textAlign: 'right',
        color: '#adadad',
    },
    typesOfFish: {
        width: 108,
        height: 24,
        margin: 36,
        fontSize: 17,
        fontWeight: '500',
        color: '#1e1e1e',
    },
    fishScrollViewContent: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    fishContainer: {
        marginRight: 10,
        alignItems: 'center',
    },
    fishImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 5,
    },
    fishLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#404040',
    },
    decoration: {
        width: 89,
        height: 24,
        margin: '0 174px 25px 20px',
        fontSize: 17,
        fontWeight: '500',
        color: '#1e1e1e',
    },
    decorationScrollViewContent: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    decorationContainer: {
        marginRight: 10,
        alignItems: 'center',
    },
    decorationImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 5,
    },
    decorationLabel: {
        fontSize: 13,
        fontWeight: '500',
        color: '#404040',
    },
    imageBox: {
        width: 120,
        height: 120,
        margin: 0,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        overflow: 'hidden',
    },
});

export default FishBowlStore;
