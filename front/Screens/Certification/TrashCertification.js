import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, Alert, Image, Platform, Text, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../Common/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrashCertification = () => {
    const navigation = useNavigation();
    const [response, setResponse] = useState(null);
    const [defaultImageVisible, setDefaultImageVisible] = useState(false);
    const [token, setToken] = useState(null);

    const uploadImage = async () => {
        if (!response && !defaultImageVisible) {
            Alert.alert('Please select an image first');
            return;
        }
        const formData = new FormData();
        formData.append('trashImage', {
            uri: response.assets[0].uri,
            type: 'image/jpg',
            name: 'trash.jpg',
        });
        formData.append('additionalField', 'additionalValue'); 

        try {
            const serverEndpoint = 'http://10.0.2.2:8080/api/trash'; 
            const uploadResponse = await fetch(serverEndpoint, {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }),
            });

            const result = await uploadResponse.json();
            console.log(result);

            if (result.success) {
                console.log('Image uploaded successfully');
                navigation.navigate('Success', { earnedPoints: result.data });
            } else {
                console.log('Image upload failed:', result.error);
                navigation.navigate('Failure');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image');
        }
    };
    const retrieveToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };


    const onSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                includeBase64: Platform.OS === 'android',
            },
            (response) => {
                if (!response.didCancel) {
                    setResponse(response);
                    setDefaultImageVisible(false);
                }
            },
        );
    };
    useEffect(() => {
        retrieveToken();
    }, []);
    return (
        <View style={styles.block}>
            <View style={styles.background}>
                <View style={styles.card}>
                    <Pressable style={styles.circle} onPress={onSelectImage}>
                        {(response && !defaultImageVisible) ? (
                            <Image source={{ uri: response.assets[0].uri }} style={{ width: 300, height: 300, borderRadius: 50 }} />
                        ) : (
                            <Image
                                source={require('../../Asset/img/addIcon.png')}
                                style={{ width: 100, height: 100, borderRadius: 50, resizeMode: 'contain' }}
                            />
                        )}
                    </Pressable>
                    <View style={styles.form}>
                        <View style={styles.comment} >
                            <Image source={require('../../Asset/img/feedback.png')}
                                style={{ width: 22, height: 22, marginTop: 6 }}></Image>
                            <Text style={styles.commentText}>comment</Text>
                        </View>
                        <Text style={styles.infoText}>After you finish cleaning, take a picture of the clean sea.</Text>
                        <Text style={styles.infoText}>Upload takes a while</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={uploadImage}>
                        <Image source={require('../../Asset/img/upload.png')}
                            style={{ width: 20, height: 20 }}></Image>
                        <Text style={styles.buttonText}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Bottom Bar */}
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    background: {
        flex: 1,
        width: 440,
        height: 792,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        margin: 46,
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundcolor: 'rgba(255, 255, 255, 0.7)',
        padding: 8,
        marginTop: 10,
    },

    commentText: {
        color: "#939393",
        fontSize: 17,
        marginLeft: 8,
    },
    infoText: {
        color: '#1e1e1e',
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 8,
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 50,
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 3,
        borderColor: "#bdd4ff"
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 148,
        height: 50,
        marginTop: 16,
        backgroundColor: '#0057ff',
        margin: 20,
        marginLeft: 150,
        padding: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        marginLeft: 8,
    },
});

export default TrashCertification;
