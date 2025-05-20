import React, { Component } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


class ScrollViewExample extends Component {
  state = {
        names: [
            { name: 'Cristina', id: 1 },
            { name: 'Callie', id: 2 },
            { name: 'Meredith', id: 3 },
            { name: 'Derek', id: 4 },
            { name: 'Alex', id: 5 },
            { name: 'Mark', id: 6 },
            { name: 'Lexie', id: 7 },
            { name: 'Jackson', id: 8 },
            { name: 'April', id: 9 },
            { name: 'Addison', id: 10 },
            { name: 'George', id: 11 },
            { name: 'Izzie', id: 12 },
          ]
  }


  render() {
    return (
        <View>
            <ScrollView>
                {
                    this.state.names.map((item, index) => (
                        <View
                           key={item.id}
                           style={styles.item}
                        >
                        <Image source={require('../assets/favicon.png')} />
                        <Text>{item.name}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>


     );
  }
 
}


export default ScrollViewExample;


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});








