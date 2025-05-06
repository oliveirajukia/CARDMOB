import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


class List extends Component {
 state =  {
    names: [
        { id: 0, name: 'Ben' },
        { id: 1, name: 'Susan' },
        { id: 2, name: 'Roberth' },
        { id: 3, name: 'Chrischarles' }




     ]
   }
   alertItemName = (item) => {
    alert(item.name);
}


render() {
    return (
        <View>
            <Text style={styles.text}>
                Lista de itens "clicáveis"
            </Text>
        </View>
    );
}


}


export default List;


