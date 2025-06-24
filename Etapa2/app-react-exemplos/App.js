import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, Image, ActivityIndicator } from 'react-native';

const BASE_URL = 'http://10.81.205.22:5000'; 
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/catalog?page=1`);
      const data = await response.json();
      setProdutos(data.catalog);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  const adicionarProduto = async () => {
    if (!name || !description || !price) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          enabled: true
        })
      });

      setName('');
      setDescription('');
      setPrice('');
      buscarProdutos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  const salvarEdicao = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/catalog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          price: parseFloat(editPrice),
          enabled: true
        })
      });

      setEditId(null);
      buscarProdutos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar o produto.');
    }
  };

  const excluirProduto = (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este produto?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await fetch(`${BASE_URL}/api/catalog/${id}`, { method: 'DELETE' });
            buscarProdutos();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        }
      }
    ]);
  };

  const renderProduto = ({ item }) => {
    const imageSource = item.image ? { uri: item.image } : { uri: PLACEHOLDER_IMAGE };

    if (item.id !== editId) {
      return (
        <View style={styles.card}>
          <Image source={imageSource} style={styles.image} />
          <Text style={styles.itemText}>{item.name} - R$ {item.price.toFixed(2)}</Text>
          <Text>{item.description}</Text>
          <View style={styles.buttons}>
            <Button title="Editar" onPress={() => {
              setEditId(item.id);
              setEditName(item.name);
              setEditDescription(item.description);
              setEditPrice(String(item.price));
            }} />
            <Button title="Excluir" onPress={() => excluirProduto(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.card}>
          <TextInput style={styles.input} value={editName} onChangeText={setEditName} placeholder="Nome" />
          <TextInput style={styles.input} value={editDescription} onChangeText={setEditDescription} placeholder="Descrição" />
          <TextInput style={styles.input} value={editPrice} onChangeText={setEditPrice} placeholder="Preço" keyboardType="numeric" />
          <Button title="Salvar" onPress={() => salvarEdicao(item.id)} />
        </View>
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A1B9A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produtos</Text>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Adicionar Produto" onPress={adicionarProduto} />

      <FlatList
        data={produtos}
        renderItem={renderProduto}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    backgroundColor: '#F3E5F5',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A1B9A',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#BA68C8',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    color: '#4A148C'
  },
  card: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginVertical: 5,
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
    borderRadius: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '80%'
  }
});
