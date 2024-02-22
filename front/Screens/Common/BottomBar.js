import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BottomBar = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [knowledgeData, setKnowledgeData] = useState(null);
    const [userToken, setUserToken] = useState(null);

    const retrieveUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (error) {
            console.error('Error retrieving user token:', error);
        }
    };

    useEffect(() => {
        retrieveUserToken();
    }, []); 

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
    };

    const handleLogoPress = async () => {
        try {
            const response = await fetch('http://10.0.2.2:8080/api/todays-tip', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                setKnowledgeData(data.data);
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const closeModal = () => {
        setModalVisible(false);
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
            
            <TouchableOpacity
                onPress={handleLogoPress} 
            >
                <Image
                    source={require('../../Asset/img/logo.png')}
                    style={styles.ttLogo}
                />
            </TouchableOpacity>

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

            {/* Modal Component */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.HeadContent}>
                            <Text style={styles.HeadText}>Today's Knowledge!</Text>
                        </View>
                        <Text style={styles.dot}>----------------------------------------------------------------------------</Text>
                        {knowledgeData && (
                            <>
                                <Image source={require('../../Asset/img/modal.png')} style={styles.modalImage}/>
                                <Text>{knowledgeData}</Text>
                                <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                                    <Text style={styles.modalText}>Yes, I confirmed it.</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

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
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:242,
        width:350,
        height:290,
        borderWidth:3,
        borderColor:"#rgba(0, 87, 255, 0.5)"
    },
    HeadContent:{
        flexDirection:"row"
    },
    HeadText:{
    fontSize:30,
    color:"#404040"
    },
    modalButton:{
        width:145,
        height:43,
        borderRadius: 10,
        backgroundColor:"rgba(0, 87, 255, 0.5)",
        padding:10,
        margin:10
    },
    modalText:{
        color: "#fff",
        fontSize:17
    },
    modalImage:{
        margin:7,
        width:70,
        height:70,  
    },
    dot:{
        color:"rgba(0, 87, 255, 0.5)",
    }
});

export default BottomBar;
