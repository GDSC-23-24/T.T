import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { tokens } from '../../atom';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ModalComponent = ({ isVisible, message, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={() => onClose()}
        >
            <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modalContainer}>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: '#404040' }}>{message}</Text>
                    <TouchableOpacity onPress={() => onClose()}>
                        <Text style={{ fontSize: 17, color: '#0057ff', textAlign:"right" }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const Login = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [loginId, setloginId] = useState('');
    const [token, setToken] = useRecoilState(tokens);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        retrieveToken();
    }, []);

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Error storing token:', error);
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

const handleLoginPress = async () => {
    const signInDto = {
        loginId: loginId,
        password: password,
    };
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInDto),
    };

    try {
        const response = await fetch('http://10.0.2.2:8080/api/sign-in', options);

        if (response.ok) {
            const responseJson = await response.json();
            console.log('login success:', responseJson);

            const userToken = responseJson.data;
            
            // Check if userToken is defined before setting and storing
            if (userToken) {
                setToken(userToken);

                // Store the token for future use
                storeToken(userToken);

                // Navigate to the main screen
                navigation.navigate('Main');
            } else {
                console.error('login error: invalid token');
                setModalMessage('Please use it after registering as a member.');
                setIsModalVisible(true);
            }
        } else {
            const responseJson = await response.json();

            if (responseJson.errorName === "USER_NOT_FOUND") {
                console.log('This user does not exist.');
                setModalMessage('Please use it after registering as a member.');
                setIsModalVisible(true);
            } else {
                console.log('login fail:', response.status);
            }
        }
    } catch (error) {
        console.error('login error:', error);
    }
};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.loginText}>Login</Text>
            </View>
            <View style={styles.top}>
                <Text style={styles.enter}>Enter your</Text>
                <View style={styles.highlight}>
                </View>
                <Text style={styles.highlightText}>ID and password</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please Enter A ID"
                    value={loginId}
                    onChangeText={(text) => setloginId(text)}
                />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please Enter Your Password"
                    secureTextEntry={!showPassword} 
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.findIdButton}>
                    <Text style={styles.buttonText}>Find ID</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.findPasswordButton}>
                    <Text style={styles.buttonText}>Find Password</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.containerBlue} onPress={handleLoginPress}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerWhite} onPress={handleSignUpPress}>
                <Text style={[styles.text, styles.blueText]}>SignUp</Text>
            </TouchableOpacity>
            <ModalComponent
                isVisible={isModalVisible}
                message={modalMessage}
                onClose={() => setIsModalVisible(false)}
            >
            </ModalComponent>

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        flex: 1,
        flexDirection: 'columm',
    },
    loginText: {
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
        marginBottom:15
    },
    highlight: {
        width: 149,
        height: 11, 
        backgroundColor: '#bdd4ff',
    },
    highlightText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0057ff',
        position:'absolute',
        bottom:21
    },
    inputContainer: {
        marginBottom: 43,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#404040',
    },
    input: {
        borderBottomWidth: 1.5,
        borderBottomColor: '#939393',
        fontSize: 13,
        color: '#404040',
    },
    show: {
        fontFamily: 'NotoSansKR',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0057ff',
        position:'absolute',
        top: 37,
        right:10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 95,
    },
    findIdButton: {
        marginRight: 30,
    },
    divider: {
        width: 1,
        height: 15,
        backgroundColor: '#939393',
    },
    findPasswordButton: {
        marginLeft: 30,
    },
    containerBlue: {
        width: 353,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0057ff',
        elevation: 5,
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
        elevation: 5,
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
    modalContainer: {
        width:360,
        height:180,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        borderWidth:3,
        borderColor:"rgba(0, 87, 255, 0.5)",
        position:"absolute",
        top:206
    },
});

export default Login;
