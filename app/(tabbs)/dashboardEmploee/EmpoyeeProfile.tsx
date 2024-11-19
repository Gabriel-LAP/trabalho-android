import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/UserType';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLogout } from '@/hooks/useLogout';

export default function Profile() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString) as User;
        setUser(user);
      }
    };

    getUserFromStorage();
  }, []);

  return user && (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={60} color="white" style={styles.icon} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.profession}>Barbeiro</Text>
      </View>
      <ScrollView style={styles.body}>
        <Text style={styles.field}>E-mail: {user.email}</Text>
        <View style={styles.separator} />
        <Text style={styles.field}>Telefone: {user.phone}</Text>
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
  profession: {
    fontSize: 18,
    color: 'white',
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
    justifyContent: 'center',
    
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
  },
});


