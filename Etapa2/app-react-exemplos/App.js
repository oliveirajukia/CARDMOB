import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';


import ScrollViewExample from './components/ScrollViewExample';
export default function App() {


    return (
          <View style={styles.container}>
         <ScrollViewExample />
      </View>
    )
  }
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: 600,
    marginTop: 150,
  },


});
