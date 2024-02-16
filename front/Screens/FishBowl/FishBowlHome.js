import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';

const FishBowlHome = () => {
    return (
        <ImageBackground source={require('../../Asset/img/background_bowl.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.fishbowl}>Fish Bowl</Text>
                    <TopBar />
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.column}>
                        <Text style={styles.name}>Name</Text>
                        <View style={styles.info}>
                        <Image source={require('../../Asset/img/badge.png')} style={styles.infoImg} />
                        <Text style={styles.name1}>Salad Bowl</Text>
                        </View>

                        <Text style={styles.name}>Age</Text>
                        <View style={styles.info}>
                        <Image source={require('../../Asset/img/cake.png')} style={styles.infoImg} />
                        <Text style={styles.name1}>1Month</Text>
                        </View>

                        <Text style={styles.name}>Visitor</Text>
                        <View style={styles.info}>
                        <Image source={require('../../Asset/img/group.png')} style={styles.infoImg} />
                        <Text style={styles.name1}>120.9K</Text>
                        </View>


                    </View>

                    <View style={styles.column}>

                        <Text style={styles.name}>Like</Text>
                        <View style={styles.info}>
                        <Image source={require('../../Asset/img/favorite.png')} style={styles.infoImg} />
                        <Text style={styles.name1}>12.4K</Text>
                        </View>
                        
                        <Text style={styles.name}>My Point</Text>
                        <View style={styles.Frame121}>
                            <View style={styles.info}>
                            <Image source={require('../../Asset/img/coin.png')} style={styles.infoImg} />
                            <Text style={styles.name1}>5,300P</Text>
                            </View>
                        </View>


                    </View>
                </View>
                <TouchableOpacity style={styles.Rectangle2225}>
                    <Image source={require('../../Asset/img/add.png')} style={styles.add} />
                </TouchableOpacity>

                <View style={styles.bowlMain}>
                    <Image source={require('../../Asset/img/fishbowl0.png')} style={styles.fishbowl0} />
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
        marginLeft:20
    },
    Frame121: {
        width: 160,
        height: 53,
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 5,
        alignItems:'center'
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
        marginLeft:5
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
        position: 'absolute',
        top: 40,
        right: 35,
    },
    info:{
        flexDirection: 'row',
    }
});

export default FishBowlHome;
