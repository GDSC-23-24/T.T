import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';



const SignUp = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [userID, setUserID] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [profileImageUri, setProfileImageUri] = useState(null);
    const [response, setResponse] = useState(null);
    const [defaultImageVisible, setDefaultImageVisible] = useState(false);


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


    const handleSignUpPress = async () => {
        // Perform additional validation or checks as needed
        if (!nickname || !userID || !password || !verifyPassword) {
            Alert.alert('Please fill in all the fields');
            return;
        }

        // Perform the signup API call
        if (!response && !defaultImageVisible) {
            Alert.alert('Please select an image first');
            return;
        }

        // The rest of your upload logic...

        // If the image is not selected and the default image is visible, handle the default image logic
        if (!response && defaultImageVisible) {
            console.log('Handling default image logic');
            // Add your logic to handle the default image scenario
        }

        try {
            const formData = new FormData();
            formData.append('loginId', userID);
            formData.append('password', password);
            formData.append('nickname', nickname);

            if (profileImageUri) {
                const imageFileName = profileImageUri.split('/').pop();
                formData.append('profileImage', {
                    uri: profileImageUri,
                    type: 'image/jpeg',
                    name: 'profileImage.jpg',
                });
                
            }
            const response = await fetch('http://10.0.2.2:8080/api/sign-up', {
                method: 'POST',
                body: formData,
            });

            // Handle the response
            const result = await response.json();
            console.log(result);

            // Navigate to the next screen if signup is successful
            if (result.success) {
                navigation.navigate('Login'); // Replace 'Login' with the actual screen name you want to navigate to
            } else {
                // Handle unsuccessful signup
                console.log('Signup failed:', result.error);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </View>

            <View style={styles.top}>
                <View style={styles.enterContainer}>
                    <Text style={styles.enter}>Enter your</Text>
                    <Text style={styles.highlightText}>Information And Photo</Text>
                </View>
                <Pressable style={styles.circle} onPress={onSelectImage}>
                {(response && !defaultImageVisible) ? (
                    <Image source={{ uri: response.assets[0].uri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                ) : (
                    <Image
                        source={require('../../Asset/img/none.png')}
                        style={{ width: 100, height: 100, borderRadius: 50, resizeMode: 'contain' }}
                    />
                )}
            </Pressable>

            </View>
            <View style={styles.box} >
                <Text style={styles.nickname}>Nickname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter a nickname"
                    value={nickname}
                    onChangeText={setNickname}
                />
                <View style={styles.vector4}></View>

                <Text style={styles.ID}>ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter an ID"
                    value={userID}
                    onChangeText={setUserID}
                />
                <View style={styles.vector4}></View>

                <Text style={styles.password}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter a password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.show} onPress={() => setShowPassword(!showPassword)}>
                </TouchableOpacity>
                <View style={styles.vector4}></View>

                <Text style={styles.verifyPassword}>Verify Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter the password again"
                    secureTextEntry={!showPassword}
                    value={verifyPassword}
                    onChangeText={setVerifyPassword}
                />
                <TouchableOpacity style={styles.show} onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.vector4}></View>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignUpPress}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signUpText: {
        fontFamily: 'NotoSansKR',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    rectangle24: {
        width: 161,
        height: 10,
        backgroundColor: '#bdd4ff',
    },
    enter: {
        fontSize: 28,
        fontWeight: '600',
        color: '#404040',
    },
    highlightText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0057ff',
        position: 'absolute',
        top: 40,
    },
    box: {
        marginTop: 30
    },
    nickname: {
        fontSize: 13,
        fontWeight: '500',
        color: '#404040',
    },
    enterNickname: {
        fontSize: 13,
        color: '#939393',
    },
    ID: {
        fontSize: 13,
        fontWeight: '500',
        color: '#404040',
    },
    enterID: {
        width: 104,
        height: 22,
        flex: 0,
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'left',
        color: '#939393',
    },
    password: {
        width: 60,
        height: 22,
        flex: 0,
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'left',
        color: '#404040',
    },
    enterPassword: {
        width: 151,
        height: 22,
        flex: 0,
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'left',
        color: '#939393',
    },
    show: {
        position: 'absolute',
        top: 170,
        right: 10,
    },
    showText:{
        color: '#0057ff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    vector4: {
        width: 353,
        height: 1.5,
        backgroundColor: '#939393',
    },
    verifyPassword: {
        width: 99,
        height: 22,
        flex: 0,
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'left',
        color: '#404040',
    },
    enterVerifyPassword: {
        width: 214,
        height: 22,
        flex: 0,
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'left',
        color: '#939393',
    },
    signupButton: {
        width: 353,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#adadad',
        elevation: 5,
        marginTop: 50,
    },
    signupButtonText: {
        fontFamily: 'NotoSansKR',
        fontSize: 17,
        color: '#fff',
    },
    input: {
        fontfamily: 'NotoSansKR',
        fonsize: 13,
        color: '#939393',
    },
    selectedImage: {
        width: 150,
        height: 150,
        marginVertical: 20,
        borderRadius: 75,
    },
    enterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addImage: {
        width: 23.3,
        height: 23.3,
        borderRadius: 12,
    },
    personImage: {
        width: 150,
        height: 150,
        borderRadius: 12,
        resizeMode: 'contain',
    },
    addIcon:{
        position:'absolute',
        top: 45,
        right: 55
    }
});

export default SignUp;
