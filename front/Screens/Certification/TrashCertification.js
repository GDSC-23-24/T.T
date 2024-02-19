import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View, TextInput, Button, Alert, Image, Platform, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { API_TOKEN } from '../../API';
const TrashCertification = () => {
    const navigation = useNavigation();
    const [response, setResponse] = useState(null);
    const [defaultImageVisible, setDefaultImageVisible] = useState(false);

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
        formData.append('additionalField', 'additionalValue'); // Add additional fields as needed

        try {
            const serverEndpoint = 'http://10.0.2.2:8080/api/trash'; 
            const uploadResponse = await fetch(serverEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + API_TOKEN,
                },
            });

            const result = await uploadResponse.json();
            console.log(result);

            // Navigate or perform further actions based on the response
            if (result.success) {
                // Handle success
                console.log('Image uploaded successfully');
                navigation.navigate('Success');
            } else {
                // Handle failure
                console.log('Image upload failed:', result.error);
                navigation.navigate('Failure'); // Navigate to 'Failure' screen if upload fails
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image');
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
                    setDefaultImageVisible(false); // Reset to hide the default image when a new image is selected
                }
            },
        );
    };

    useEffect(() => {
    }, []);

    return (
        <View style={styles.block}>
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
                <Text> After you finish cleaning, take a picture of the clean sea.</Text>
                <View style={styles.buttons}>
                    <Button title="Upload" onPress={uploadImage} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    circle: {
        width: 300,
        height: 300,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    form: {

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default TrashCertification;
