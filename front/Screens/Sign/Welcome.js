import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };
    return (
        <LinearGradient
            colors={['rgba(189, 212, 255, 0.6)', '#fff']}
            style={styles.Rectangle2206}
        >
            <Image source={require('../../Asset/img/logo_title.png')} style={styles.ttLogo1} />
            <TouchableOpacity style={styles.containerBlue} onPress={handleSignUpPress}>
                <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerWhite}onPress={handleLoginPress}>
                <Text style={[styles.text, styles.blueText]}>Login</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    Rectangle2206: {
        width: 393,
        height: 852,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ttLogo1: {
        width: 297,
        height: 389,
        margin: 0,
        marginBottom: 70,
    },
    containerBlue: {
        width: 353,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0057ff',
        elevation: 5
    },
    containerWhite: {
        width: 353,
        height: 50,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#bdd4ff',
        marginBottom: 60,
        backgroundColor: 'white',
        elevation: 5
    },

    text: {
        fontFamily: 'NotoSansKR',
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff',
    },
    blueText: {
        color: '#74a3ff',
    },
});

export default Welcome;
