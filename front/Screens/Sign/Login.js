import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [loginId, setloginId] = useState('');
    
    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };
    const handleLoginPress = async () => {
        signInDto = {
          loginId: loginId, // 사용자 ID
          password: password, // 사용자 비밀번호
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
          const response = await fetch('http://10.0.2.2:8080/sign-in', options);
          if (response.ok) {
            const responseJson = await response.json();
            console.log('로그인 성공:', responseJson);
            navigation.navigate('Main');
          } else {
            console.log('로그인 실패:', response.status);
          }
        } catch (error) {
          console.error('로그인 에러:', error);
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
});

export default Login;
