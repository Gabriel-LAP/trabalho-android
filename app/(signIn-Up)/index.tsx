import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import useLoginHook from '../../hooks/useLogin';
const LoginScreen = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async () => {
    setLoading(true);
    await useLoginHook({email, password});
    
    setLoading(false);
    
  }

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/logo.png')} />

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        />

      <TextInput 
      style={styles.input} 
      placeholder="Senha" 
      value={password} 
      onChangeText={setPassword} 
      secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      
      <Text style={{color: '#000'}}>Não tem conta? <Link href='/Register'>Cadastre-se</Link></Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 150,
  },
  input: {
    height: 40,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 20,
    paddingLeft: 10,
  },
  button: {
    width: '85%',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#000',
    
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default LoginScreen;

