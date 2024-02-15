import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({ }) => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('Main');

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
        setSelectedTab(tabName);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Main' && styles.selectedTab]}
                onPress={() => handleTabPress('Main')}
            >
                <Image  source={require('../../Asset/img/map.png')}></Image>
                <Text style={[styles.tabText, selectedTab === 'Main' && styles.selectedTabText]}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, selectedTab === 'TrashAmount' && styles.selectedTab]}
                onPress={() => handleTabPress('TrashAmountScreen')}
            >
                <Image style={styles.bottomImg} source={require('../../Asset/img/delete.png')}></Image>
                <Text style={[styles.tabText, selectedTab === 'TrashAmount' && styles.selectedTabText]}>Trash Amount</Text>
            </TouchableOpacity>
            <Image
                source={require('../../Asset/img/logo.png')}
                style={styles.ttLogo}
            />
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'FishBowl' && styles.selectedTab]}
                onPress={() => handleTabPress('FishBowlScreen')}
            >
                <Image  source={require('../../Asset/img/bowl.png')}></Image>
                <Text style={[styles.tabText, selectedTab === 'FishBowl' && styles.selectedTabText]}>Fish Bowl</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, selectedTab === 'MyPage' && styles.selectedTab]}
                onPress={() => handleTabPress('MyPage')}
            >
                <Image  source={require('../../Asset/img/mypage.png')}></Image>
                <Text style={[styles.tabText, selectedTab === 'MyPage' && styles.selectedTabText]}>My Page</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 101,
        backgroundColor: '#fff',
        justifyContent:'space-between'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ttLogo: {
        width: 70,
        height: 70,
       marginTop:12
    },
    map: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#939393',
    },
    trashAmount: {
        fontSize: 11,
        fontWeight: '500',
        color: '#939393',
    },
    fishBowl: {
        fontSize: 11,
        fontWeight: '500',
        color: '#939393',
    },
    myPage: {
        fontSize: 11,
        fontWeight: '500',
        color: '#939393',
    },
    selectedTabText: {
        color: '#0057ff', 
    },
    bottomImg:{
        marginTop:5
    }
});

export default BottomBar;
