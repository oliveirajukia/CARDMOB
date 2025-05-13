import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

class List extends Component {
  state = {
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
      <View style={styles.container}>
        <Text style={styles.title}>
          Lista de itens "clicáveis"
        </Text>
        {
          this.state.names.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.item}
              onPress={() => this.alertItemName(item)}
            >
              <Text style={styles.itemText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}


export default List;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5
  },
  itemText: {
    fontSize: 16
  }
});
