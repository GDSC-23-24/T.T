import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ }) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('FishBowlHome');

  const onTabPress = (activeTab) => {
    navigation.navigate(activeTab);
    setSelectedTab(activeTab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onTabPress('FishBowlHome')} style={styles.tab}>
        <Text style={[styles.tabText, selectedTab === 'FishBowlHome' && styles.activeTab]}>home</Text>
        {selectedTab === 'FishBowlHome' && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress('FishBowlRanking')} style={styles.tab}>
        <Text style={[styles.tabText, selectedTab === 'FishBowlRanking' && styles.activeTab]}>ranking</Text>
        {selectedTab === 'FishBowlRanking' && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress('FishBowlCommunity')} style={styles.tab}>
        <Text style={[styles.tabText, selectedTab === 'FishBowlCommunity' && styles.activeTab]}>community</Text>
        {selectedTab === 'FishBowlCommunity' && <View style={styles.line} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress('FishBowlStore')} style={styles.tab}>
        <Text style={[styles.tabText, selectedTab === 'FishBowlStore' && styles.activeTab]}>store</Text>
        {selectedTab === 'FishBowlStore' && <View style={styles.line} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#939393',
    marginBottom: 10
  },
  activeTab: {
    fontWeight: 'bold',
    color: 'rgba(0, 87, 255, 0.5)',
  },
  line: {
    height: 2,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 87, 255, 0.5)',
  },
});

export default TopBar;
