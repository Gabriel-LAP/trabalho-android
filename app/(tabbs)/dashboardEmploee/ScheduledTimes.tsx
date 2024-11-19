import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useHour } from '@/hooks/useHour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/UserType';

const ScheduledTimes = () => {
  const { hourList, handleHour } = useHour();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString) as User;
        setUser(user);
      }
    };

    getUserFromStorage();
    handleHour();
  }, []);

  useEffect(() => {
    if (hourList) {
      setLoading(false);
    }
  }, [hourList]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hourList.filter(hour => hour.professional._id === user?._id)}
        keyExtractor={(item) => item._id ?? ''}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Data: {item.day[0]}/{item.day[1]}</Text>
            <Text style={styles.text}>Hora: {item.begin}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ScheduledTimes;

