import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomBar from '../Common/BottomBar';
import { useNavigation } from '@react-navigation/native';
import { API_TOKEN } from '../../API';
const MyPage = () => {

    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchMyPage();
    }, []);
    const fetchMyPage = async () => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + API_TOKEN,
            },
        };

        try {
            const response = await fetch('http://10.0.2.2:8080/api/my-page', options);
            if (response.ok) {
                const data = await response.json();
                setUserData(data.data);
                console.log('User Data:', data.data.likesCount);
            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleLogOutPress = () => {
        navigation.navigate('Welcome');
    }; 
    const initialSectionVisibility = {
        certificationCalendar: false,
        myInfo: false,
        thrownAwayTrash: false,
        termsAndConditions: false,
        customerService: false,
      };
    
      const [sectionVisibility, setSectionVisibility] = useState(initialSectionVisibility);
    
      const toggleSection = (section) => {
        setSectionVisibility((prevVisibility) => ({
          ...prevVisibility,
          [section]: !prevVisibility[section],
        }));
      };
    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.MyPage}>My Page</Text>
                </View>

                {/* User Information */}
                <View style={styles.userInfoContainer}>
                    <Text style={styles.name}>Name</Text>
                    <Text style={styles.name1}> {userData?.nickname || ''} </Text>
                </View>
                    <Text style={styles.name}>About me</Text>
                

                {/* User Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <View style={styles.statBox1}>
                        <Text style={styles.state}> {userData?.likesCount || ''} </Text>
                        <Text style={styles.state}> {userData?.point || ''} </Text>
                        <Text style={styles.state}> {userData?.waitingCount || ''} </Text>
                        <Text style={styles.state}> {userData?.completeCount || ''} </Text>
                        </View>
                        <View style={styles.statBox2}>
                        <Text style={styles.statText}>Likes</Text>
                        <Text style={styles.statText}>My Point</Text>
                        <Text style={styles.statText}>Waiting</Text>
                        <Text style={styles.statText}>complete</Text>
                        </View>
                    </View>
                </View>

        {/* Other Sections */}
        <View style={styles.sectionsContainer}>
          {renderSection('Certification Calendar', 'certificationCalendar')}
          {renderSection('My Info', 'myInfo')}
          {renderSection('Thrown Away Trash', 'thrownAwayTrash')}
          {renderSection('Terms and Conditions of Use', 'termsAndConditions')}
          {renderSection('Customer Service', 'customerService')}
        </View>
        
        <TouchableOpacity style={styles.LogOutContainer} onPress={handleLogOutPress}>
                <Text style={[styles.text, styles.LogOutText]}>Log Out</Text>
            </TouchableOpacity>
      </ScrollView>

            {/* Bottom Bar */}
            <BottomBar />
        </View>
    );
    function renderSection(title, sectionKey) {
        const isSectionVisible = sectionVisibility[sectionKey];
    
        return (
          <View key={sectionKey}>
            <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(sectionKey)}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <View style={styles.arrowButton}>
                <Text style={styles.arrowButtonText}>{isSectionVisible ? '▼' : '▶'}</Text>
              </View>
            </TouchableOpacity>
    
            {isSectionVisible && (
              <View style={styles.sectionContent}>
                {/* Add content for the section here */}
              </View>
            )}
          </View>
        );
      }
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MyPage: {
        width: 79,
        height: 29,
        margin: 25,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e1e1e',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    userInfoContainer: {
        marginTop: 25,
        flexDirection: 'row',
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
        color: '#adadad',
    },
    name1: {
        fontSize: 20,
        fontWeight: '600',
        color: '#404040',
    },
    statsContainer: {
        marginTop: 26.5,
        flexDirection: 'row',
    },
    statBox: {
        flexDirection: 'columm',
        width: 353,
        height: 78,
        padding: 18,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#bdd4ff',
        borderWidth: 1,
        justifyContent: 'space-around'
    },
    statBox1: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    statBox2: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 26.5,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#404040',
    },
    arrowButton: {
        marginLeft: 'auto',
    },
    arrowButtonText: {
        fontSize: 20,
        color: '#0057ff',
    },
    state:{
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#3d3d3d',
        fontWeight: '500'
    },
    statText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: '#939393',
    },
    SectionsContainer: {
        marginTop: 26.5,
    },
    LogOutContainer: {
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
    LogOutText: {
        color: '#74a3ff',
    },
});

export default MyPage;
