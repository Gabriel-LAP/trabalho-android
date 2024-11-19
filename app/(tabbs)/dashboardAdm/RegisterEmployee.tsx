import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { User } from '@/types/UserType';
import { createUser } from '@/services/userServices';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

const RegisterEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState<number>(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState<number>(0);
  const [zipCode, setZipCode] = useState<number>(0);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('funcionario');

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não conferem');
      return;
    }
    const user: User = {
      name,
      email,
      cpf,
      phone,
      password,
      confirmPassword,
      address,
      number,
      zipCode,
      city,
      state,
      type,
    };
    setLoading(true);
    console.log(user);
    await createUser(user).catch((error) => setLoading(false));
    setLoading(false);
    router.navigate({
        pathname: '/(tabbs)/dashboardAdm/RegisteredEmployees',
      });

  };

  return (
    <View style={styles.container}>
        <ScrollView >
        <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={(text) => setName(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone ? phone.toString() : ''}
            onChangeText={(text) => setPhone(parseInt(text))}
        />
        <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
        />
        <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
        />
        <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={address}
            onChangeText={(text) => setAddress(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Número"
            value={number ? number.toString() : ''}
            onChangeText={(text) => setNumber(parseInt(text))}
        />
        <TextInput
            style={styles.input}
            placeholder="CEP"
            value={zipCode ? zipCode.toString() : ''}
            onChangeText={(text) => setZipCode(parseInt(text))}
        />
        <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={city}
            onChangeText={(text) => setCity(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Estado"
            value={state}
            onChangeText={(text) => setState(text)}
        />
        <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
        >
            <Picker.Item label="Funcionário" value="funcionario" />
            <Picker.Item label="Gestor" value="gestor" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#00ff00" />}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterEmployee;
