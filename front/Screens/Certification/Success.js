import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import SuccessGif from '../../Asset/gif/success.gif';
const Success = () => {
  console.log('Rendering Success component');
  return (
    <View style={styles.container}>
      <ScrollView style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.message}>Authentication successful! Check out the points.</Text>
          <Image source={SuccessGif} style={styles.image} />
          <View style={styles.frame}>
            <Text style={styles.span}>🎉</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>You earned</Text>
              <Text style={styles.database}>💰</Text>
            </View>
            <View style={styles.actionContainer}>
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: 440,
    height: 732,
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
    margin: 49,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#0057ff',
  },
  span: {
argin: 17,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#1e1e1e',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  info: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: '#adadad',
  },
  database: {
    width: 22.5,
    height: 22.5,
    backgroundColor: '#ffe500',
  },
  actionContainer: {
    marginTop: 8,
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
