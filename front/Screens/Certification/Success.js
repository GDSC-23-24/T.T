import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Success = ({ route }) => {
  console.log('Rendering Success component');
  const navigation = useNavigation();
  const { earnedPoints } = route.params; // Extract earnedPoints from route params

  const handleDoOther = async () => {
    navigation.navigate('TrashCertification');
  };
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.message}>Authentication successful! Check out the points.</Text>
          {/* <Image source={SuccessGif} style={styles.image} /> */}

          <Text style={styles.span}>🎉</Text>
          <View style={styles.Vector39} />

          <View style={styles.horizontalContainer}></View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>You earned</Text>
            <Image source={require('../../Asset/img/coin.png')} style={styles.coin}></Image>
            <Text style={styles.points}>{earnedPoints}</Text>
          </View>
          <View style={styles.frame}>
            <TouchableOpacity style={styles.otherContainer} onPress={handleDoOther}>
              <View style={styles.horizontalContainer}>
                <Image source={require('../../Asset/img/cleaning_services.png')} style={styles.otherImg} />
                <Text style={styles.other}>Do Other</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: 440,
    height: 792,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 46,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  title: {
    margin: 19,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0057ff',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#404040',
  },
  frame: {
    flexDirection: 'row',
    margin: 49,
    marginLeft: 150,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#0057ff',
    width: 150,
    height: 50,
  },
  span: {
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e1e1e',
    marginTop:50
  },
  Vector39: {
    width: 300,
    height: 2,
    marginVertical: 29,
    backgroundColor: '#ebf2ff',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 8,
    marginBottom: 20
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#adadad',
  },
  points: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1e1e1e',
  },
  coin: {
    width: 30,
    height:30,
    margin: 10
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  otherImg: {
    width: 30,
    height: 30,
    marginRight: 8,
  },

  other: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
  },
  frame90: {
    width: 73,
    height: 49,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#0057ff',
  },
  doOther: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});

export default Success;