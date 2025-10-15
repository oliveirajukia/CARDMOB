import React, {useState} from "react";
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView} from "react-native";


import { requestRegister } from "../services/authService";
// import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
   // const { login } = useAuth();

    const handleRegister = async () => {
        try {
            // Lógica de login / conexão com backend.
            const token = await requestRegister(name, email, password);
           // login(token);
            console.log('Login ok');
        } catch (err: any) {
            setError(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <View>
            <Text>Nome:</Text>
            <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
             <Text>Email:</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <Text>Senha:</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            { error ? 
                <Text 
                    style={{ color: 'red'}}
                >
                {error}
                </Text> :
                null
            }
            <Button title="Entrar" onPress={handleRegister} />
            <Button title="Já tem conta? Faça o Login!" onPress={ () => navigation.navigate('Register') }/>

        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
    }
});