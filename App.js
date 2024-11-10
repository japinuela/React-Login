import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          loginName: username,
          password: password,
        }).toString(),
      });

      const data = await response.text();
      console.log(data);
      if (data == "OK") {
        console.log("Login exitoso");
        Alert.alert('Login exitoso');
      } else {
        Alert.alert('Error en el login', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      Alert.alert('Error', 'Hubo un problema con el inicio de sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Servicios en Movilidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
