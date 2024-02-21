import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomBar from '../Common/BottomBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Calendar } from 'react-native-calendars';

const MyPage = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const [calenderData, setCalenderData] = useState([]);
    const [token, setToken] = useState(null);

    const markCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setMarkedDates({
            [formattedDate]: { selected: true, marked: true, selectedColor: '#bdd4ff' },
        });
    };

    const getMarkedDates = (dataList) => {
        const markedDatesObject = {};

        dataList.forEach((item) => {
            const formattedDate = item.date.split('T')[0];
            const status = item.status; // Assuming there is a status field in your data
            markedDatesObject[formattedDate] = {
                customComponent: (
                    <View style={styles.customMarkerContainer}>
                        {getStatusImage(status)}
                    </View>
                ),
            };
        });

        console.log('Marked Dates:', markedDatesObject);

        return markedDatesObject;
    };

    const getStatusImage = (status) => {
        switch (status) {
            case 'complete':
                return <Image source={require('../../Asset/img/award_star.png')} style={styles.awardStar} />;
            case 'waiting':
                return <Image source={require('../../Asset/img/hourglass.png')} style={styles.hourglass} />;
            case 'rejected':
                return <Image source={require('../../Asset/img/rejection.png')} style={styles.rejection} />;
            default:
                return null; // You can return a default image or null based on your requirement
        }
    };

    useEffect(() => {
        // Retrieve token when the component mounts
        retrieveToken();
    }, []);

    useEffect(() => {
        // Fetch data and mark current date when the token changes
        if (token) {
            fetchMyPage();
            markCurrentDate();
        }
    }, [token]);

    const retrieveToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                // Set the token in the component state
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const fetchMyPage = async () => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        };

        try {
            // Fetch user data
            const responseUserData = await fetch('http://10.0.2.2:8080/api/my-page', options);

            if (responseUserData.ok) {
                const userData = await responseUserData.json();
                setUserData(userData.data);
                console.log('User Data:', userData.data.likesCount);
            } else {
                console.error('Error fetching user data:', responseUserData.statusText);
            }

            // Fetch additional data for Certification Calendar
            const responseCalendarData = await fetch('http://10.0.2.2:8080/api/my-page/calender', options);

            if (responseCalendarData.ok) {
                const calendarData = await responseCalendarData.json();
                setMarkedDates(getMarkedDates(calendarData.datalist));
                setCalenderData(calendarData.datalist);
                console.log('Calendar Data:', calendarData.datalist);
            } else {
                console.error('Error fetching calendar data:', responseCalendarData.statusText);
                // Handle error fetching calendar data
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
                        {sectionKey === 'certificationCalendar' && (
                            <>
                                <View style={styles.markImg}>
                                    <Image source={require('../../Asset/img/award_star.png')} style={styles.awardStar} />
                                    <Text >  complete</Text>
                                    <Image source={require('../../Asset/img/hourglass.png')} style={styles.hourglass} />
                                    <Text >Waiting  </Text>
                                    <Image source={require('../../Asset/img/rejection.png')} style={styles.rejection} />
                                    <Text >  Rejection</Text>
                                </View>
                                <Calendar
                                    markedDates={getMarkedDates(calenderData)}
                                    markingType="custom"
                                    theme={{
                                        // Your calendar theme settings
                                    }}
                                    dayComponent={({ date, state }) => (
                                        <View style={styles.dayContainer}>
                                            <Text style={[styles.dayText, { color: state === 'disabled' ? 'gray' : 'black' }]}>
                                                {date.day}
                                            </Text>
                                            {markedDates[date.dateString]?.customComponent && (
                                                <View style={styles.customMarkerContainer}>
                                                    {markedDates[date.dateString].customComponent}
                                                </View>
                                            )}
                                        </View>
                                    )}
                                />

                            </>
                        )}
                    </View>
                )}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    customMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    customMarkerImage: {
        width: 10,
        height: 10,
    },
    dayContainer: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        textAlign: 'center',
        fontSize: 14,
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
    state: {
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
    markImg: {
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 10
    },
    awardStar: {
        width: 17,
        height: 17,

    },
    hourglass: {
        width: 30,
        height: 17,
    },
    rejection: {
        width: 15,
        height: 15,

    },
});

export default MyPage;
