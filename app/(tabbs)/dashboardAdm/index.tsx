import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useService } from '../../../hooks/useService';
import { updateService } from '@/services/userServices';
import { Service } from '@/types/ServiceType';
import { User } from '@/types/UserType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServicosAgendados = () => {
  const { serviceList, handleService, priceFormate } = useService();

  const [cancelServiceId, setCancelServiceId] = useState<string | null>(null);

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

  useEffect(() => {
    handleService();
  }, []);

  const handleCancelService = useMemo(() => {
    return async (serviceId: Service["_id"]) => {
      try {
        const serviceToUpdate = serviceList.find((service) => service._id === serviceId);
        if (serviceToUpdate) {
          const updatedService: Service = { ...serviceToUpdate, status: 'Cancelado' };
          const response = await updateService(updatedService);
          handleService();
          return response;
        } else {
          console.error('Service not found');
        }
      } catch (error) {
        console.error('Erro ao cancelar o serviço:', error);
      }
    };
  }, [serviceList, handleService]);

  const ServiceItem = ({ item }: { item: any }) => {
    
    return (
      <View style={styles.service}>
        <Text style={styles.professional}>{item.professional.name}</Text>
        {/* <Text style={styles.customer}>{item.customer.name}</Text> */}
        <Text style={{color: '#fff'}}>Data:</Text>
        <Text style={styles.hour}>{item.hour.day![0]}/{item.hour.day![1]}  {item.hour.begin}</Text>
        <Text style={{color: '#fff'}}>Cliente:</Text>
        <Text style={styles.customer}>{item.customer.name}</Text>
        {/* <Text style={styles.professional}>{item.professional.name}</Text> */}
        <Text style={{color: '#fff'}}>Serviço:</Text>
        <Text style={styles.serviceType}>{item.typeOfService.name}</Text>
        <Text style={{color: '#fff'}}>Valor:</Text>
        <Text style={styles.price}>{priceFormate(item.typeOfService.price)}</Text>
        <Text style={{color: '#fff'}}>Forma de Pagamento:</Text>
        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
        <Text style={{color: '#fff'}}>Status:</Text>
        {cancelServiceId === item._id ? (
          <Text style={styles.status}>Cancelado</Text>
        ) : (
          <Text style={styles.status}>{item.status}</Text>
        )}

        {item.status == 'Agendado' && (
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelService(item._id!)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {serviceList.length === 0 ? (
        <Text>Nenhum serviço agendado</Text>
      ) : (
        <FlatList
          data={serviceList}
          renderItem={({ item }) => <ServiceItem item={item} />}
          keyExtractor={(item) => item._id!.toString()}
        />
      )}
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
  service: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
     
  },
  professional: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff',
    marginBottom: 15
  },
  hour: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  serviceType: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff'
  },
  customer: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  cancelButtonContainer: {
    alignItems: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicosAgendados