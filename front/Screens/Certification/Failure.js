import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import failGif from '../../Asset/gif/fail.gif';
import { useNavigation } from '@react-navigation/native';
const Failure = () => {
    const navigation = useNavigation();
    const handleTryagain = () => {
        navigation.navigate('TrashCertification');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.background}>
                <View style={styles.card}>
                    <Text style={styles.title}>Fail!</Text>
                    <Image source={failGif} style={styles.image} />
                    <Text style={styles.message}> Authentication failed..</Text>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.tryButton} onPress={handleTryagain}>
                            <Text style={styles.buttonText}>try again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contactButton}>
                            <Text style={styles.buttonText}>contact us</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: 440,
        height: 732,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        margin: 46,
        padding: 20,
        borderRadius: 30,

        backgroundColor: '#fff',
    },
    title: {
        margin: 19,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f00',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    message: {
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        color: '#404040',
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:30
    },
    tryButton: {
        width : 150,
        height:50,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#bdd4ff',
    },
    contactButton: {
        width : 150,
        height:50,
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#0057ff',
    },
});

export default Failure;
