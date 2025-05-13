import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button ,Image, TextInput, FlatList } from 'react-native';

import List from './components/List';

export default function App() {

return (
  <View style={styles.container}>
    <List />
      <View style={styles.purplebox}></View>
      <View style={styles.bluebox}></View>
      <View style={styles.pinkbox}></View>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: '#E6E6FA',
   height: 600,
   marginTop: 150,
  },
purplebox: {
  width: 100,
  height: 100,
  backgroundColor: '#4b204b',
  borderRadius: 50,
},
bluebox: {
  width: 100,
  height: 100,
  backgroundColor: '#191970'
},
pinkbox: {
  width: 100,
  height: 100,
  backgroundColor: '#f17ea1'
}


});
