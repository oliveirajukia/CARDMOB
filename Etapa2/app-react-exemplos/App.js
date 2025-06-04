import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Button, Alert } from 'react-native';

const BASE_URL = 'http://10.81.205.22:3000';

export default function App5() {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantidade, setEditQuantidade] = useState('');

  const fetchCompras = async () => {
    try {
      const response = await fetch(`${BASE_URL}/compras`);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  const addCompra = async () => {
    if (!item.trim() || !quantidade.trim()) return;
    try {
      await fetch(`${BASE_URL}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.trim(), quantidade: parseInt(quantidade) }),
      });
      setItem('');
      setQuantidade('');
      fetchCompras();
    } catch (error) {
      console.error('Erro ao adicionar compra:', error);
    }
  };

  const updateCompra = async (id) => {
    try {
      await fetch(`${BASE_URL}/compras/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: editItem, quantidade: parseInt(editQuantidade) }),
      });
      setEditId(null);
      setEditItem('');
      setEditQuantidade('');
      fetchCompras();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const deleteCompra = async (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este item?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await fetch(`${BASE_URL}/compras/${id}`, { method: 'DELETE' });
            fetchCompras();
          } catch (error) {
            console.error('Erro ao excluir:', error);
          }
        }
      }
    ]);
  };

  const renderItem = ({ item: compra }) => {
    if (compra.id !== editId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{compra.item} - {compra.quantidade} und</Text>
          <View style={styles.buttons}>
            <Button title="Editar" onPress={() => {
              setEditId(compra.id);
              setEditItem(compra.item);
              setEditQuantidade(String(compra.quantidade));
            }} />
            <Button title="Excluir" onPress={() => deleteCompra(compra.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            placeholder="Item"
            value={editItem}
            onChangeText={setEditItem}
          />
          <TextInput
            style={styles.editInput}
            placeholder="Qtd"
            value={editQuantidade}
            onChangeText={setEditQuantidade}
            keyboardType="numeric"
          />
          <Button title="Salvar" onPress={() => updateCompra(compra.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={addCompra} />
      <FlatList
        data={compras}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50, backgroundColor: '#FFF8DC' }, // fundo creme
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFF'
  },
  item: {
    backgroundColor: '#E6F7FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  itemText: { fontSize: 16, color: '#333' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#FFF'
  }
});
