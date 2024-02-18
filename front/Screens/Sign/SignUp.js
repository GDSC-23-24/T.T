import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
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

    const handleImageSelect = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.uri) {
                setProfileImageUri(response.uri);
            }
        });
    };

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
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
                <TouchableOpacity style={styles.add} onPress={handleImageSelect}>
                    {profileImageUri ? (
                        <Image source={{ uri: profileImageUri }} style={styles.addImage} />
                    ) : (
                        <Image source={require('../../Asset/img/person.png')} style={styles.personImage} />
                        
                    )}
                                <Image source={require('../../Asset/img/addIcon.png')}style={styles.addIcon} />
                </TouchableOpacity>
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
                <Text style={styles.available}>Available</Text>
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
                    <Text>{showPassword ? 'Hide' : 'Show'}</Text>
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
                    <Text>{showPassword ? 'Hide' : 'Show'}</Text>
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
    available: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#adadad',
        position: 'absolute',
        right: 10,
        top: 100
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
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0057ff',
        position: 'absolute',
        top: 180,
        right: 10,
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
