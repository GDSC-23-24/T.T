import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BottomBar = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [knowledgeData, setKnowledgeData] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const modalImages = [
        require('../../Asset/img/dorpin.png'),
        require('../../Asset/img/turttle.png'),
    ];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * modalImages.length);
        return modalImages[randomIndex];
    };
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
                            <Text style={styles.HeadText}> Marine News </Text>
                        </View>
                        {knowledgeData && (
                            <>
                                <Text style={styles.knowledgeData}>{knowledgeData}</Text>
                                <Image source={getRandomImage()} style={styles.modalImage} />
                                <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                                    <Text style={styles.modalButtonText}>Okay, I got it</Text>
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
        marginTop: 50,
        width: 350,
        height: 380,
    },
    HeadContent: {
        flexDirection: "row"
    },
    HeadText: {
        fontSize: 30,
        color: "#000",
        fontWeight: "600"
    },
    knowledgeData: {
        fontSize: 17,
        color: '#939393',
        fontWeight: "500",
        textAlign:"center"
    },
    modalButton: {
        width: 296,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#0057ff",
        padding: 10,
        marginTop: 30
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 19,
        fontWeight: "400",
        textAlign: "center",
    },
    modalImage: {
        margin: 7,
        width: 151,
        height: 153,
    },

});

export default BottomBar;
