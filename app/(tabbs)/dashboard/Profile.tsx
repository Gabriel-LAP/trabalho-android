import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLogout } from '@/hooks/useLogout';
import { Client } from '@/types/ClientType';

export default function Profile() {

  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const getClientFromStorage = async () => {
      const clientString = await AsyncStorage.getItem('user');
      if (clientString) {
        const Client = JSON.parse(clientString) as Client;
        setClient(Client);
      }
    };

    getClientFromStorage();
  }, []);

  return client && (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={60} color="white" style={styles.icon} />
        <Text style={styles.name}>{client.name}</Text>
      </View>
      <ScrollView style={styles.body}>
        <Text style={styles.field}>E-mail: {client.email}</Text>
        <View style={styles.separator} />
        <Text style={styles.field}>Telefone: {client.phone}</Text>
      </ScrollView>
      <Pressable onPress={useLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: 'white',
    marginBottom: 6,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  field: {
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  logout: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
});


