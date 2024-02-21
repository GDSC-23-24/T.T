import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomBar from '../Common/BottomBar';
import TopBar from '../Common/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FishBowlCommunity = () => {
  const [searchText, setSearchText] = useState('');
  const [trashDtos, setTrashDtos] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [token, setToken] = useState(null);

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    retrieveToken();
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(token);
    try {
      // Make a GET request to the API endpoint for community data
      const communityResponse = await fetch(
        'http://10.0.2.2:8080/api/fish-bowl/community',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      // Parse the response as JSON and set the trashDtos state with the received data
      const communityData = await communityResponse.json();
      setTrashDtos(communityData.data.trashDtos);

      // Make a GET request to the API endpoint for likes data
      const likesResponse = await fetch(
        'http://10.0.2.2:8080/api/fish-bowl/likes',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      // Parse the response as JSON and set the likesData state with the received data
      const likesData = await likesResponse.json();
      setLikesData(likesData.datalist);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../Asset/img/background_bowl.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search component"
              placeholderTextColor="#939393"
              value={searchText}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TopBar />
        </View>
        <ScrollView>
          {/* Recent posts */}
          <Text style={styles.title}>Recent Posts</Text>

          {/* ScrollView to display trash images */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            {trashDtos.map(trash => (
              <View key={trash.id} style={styles.trashContainer}>
                <Image
                  source={{uri: trash.trashImageUrl}}
                  style={styles.trashImage}
                />
                <Text style={styles.createdAtText}>{trash.createdAt}</Text>
                <View style={styles.userInfoContainer}>
                  <Image
                    source={{uri: trash.member.profileImageUrl}}
                    style={styles.profileImage}
                  />
                  <Text style={styles.nicknameText}>
                    {trash.member.nickname}
                  </Text>
                  <TouchableOpacity style={styles.goButton}>
                    <Text style={styles.goButtonText}>Go</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Likes Section */}
          <Text style={styles.title}>Likes</Text>

          {/* ScrollView to display likes data */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.likesScrollView}>
            {likesData.map(like => (
              <View key={like.id} style={styles.likesContainer}>
                <Image
                  source={
                    like.memberDto.profileImageUrl
                      ? {uri: like.memberDto.profileImageUrl}
                      : require('../../Asset/img/none.png') // Default image when profileImageUrl is null
                  }
                  style={styles.likesProfileImage}
                />
                <Text style={styles.likesNicknameText}>
                  {like.memberDto.nickname}
                </Text>
                <Text style={styles.likesCountText}>
                  {like.likesCount} Likes
                </Text>
                <TouchableOpacity style={styles.goButton2}>
                  <Text style={styles.goButtonText}>Go</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
      {/* Bottom Bar */}
      <BottomBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
  },
  searchContainer: {
    width: 285,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 10,
  },
  searchInput: {
    width: 200,
    height: 30,
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 8,
    fontSize: 17,
    fontWeight: '500',
    color: '#1e1e1e',
  },
  title: {
    margin: 22,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  trashContainer: {
    marginRight: 10,
  },
  trashImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  createdAtText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(0, 87, 255, 0.5)',
    marginLeft: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 5,
  },
  nicknameText: {
    fontSize: 12,
    color: '#1e1e1e',
    fontWeight: '600',
  },
  goButton: {
    width: 48,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#bdd4ff',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 10,
    elevation: 5,
  },
  goButton2: {
    width: 48,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#bdd4ff',
    backgroundColor: '#fff',
    elevation: 5,
  },
  goButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(0, 87, 255, 0.5)',
  },
  likesScrollView: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  likesContainer: {
    width: 110,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  likesProfileImage: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  likesNicknameText: {
    fontSize: 12,
    color: '#1e1e1e',
    fontWeight: '600',
  },
  likesCountText: {
    fontSize: 12,
    color: '#939393',
    fontWeight: '600',
  },
});

export default FishBowlCommunity;