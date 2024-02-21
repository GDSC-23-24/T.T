import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
    const navigation = useNavigation();

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress('Main')}
            >
                <Image source={require('../../Asset/img/map_gray.png')} />
                <Text style={styles.tabText}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress('TrashCertification')}
            >
                <Image source={require('../../Asset/img/delete.png')} />
                <Text style={styles.tabText}>Upload Img</Text>
            </TouchableOpacity>
            
            <Image
                source={require('../../Asset/img/logo.png')}
                style={styles.ttLogo}
            />
            
            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress('FishBowlHome')}
            >
                <Image source={require('../../Asset/img/bowl.png')} />
                <Text style={styles.tabText}>Fish Bowl</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress('MyPage')}
            >
                <Image source={require('../../Asset/img/mypage.png')} />
                <Text style={styles.tabText}>My Page</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 101,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ttLogo: {
        width: 70,
        height: 70,
        marginTop: 12,
    },
    tabText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#939393',
        marginTop: 5,
    },
});

export default BottomBar;
