import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '@/types/ClientType';
import { useHour } from '@/hooks/useHour';
import { Service } from '@/types/ServiceType';
import { useTypeOfService } from '@/hooks/useTypeOfService';
import { typesOfService } from '@/types/TypesOfServiceType';
import { hour } from '@/types/HourType';
import { User } from '@/types/UserType';
import { createService } from '@/services/userServices';
import { router } from 'expo-router';
import { useService } from '@/hooks/useService';
import { useClients } from '@/hooks/useClient';

const AppointmentScheduler = () => {

  const { handleHour, hourList } = useHour();
  const { handleTypeOfService, typesOfServiceList } = useTypeOfService();
  const { handleService } = useService();

  const [date, setDate] = useState<hour>();
  const [time, setTime] = useState<hour>();
  const [employee, setEmployee] = useState<User>();
  const [service, setService] = useState<typesOfService>();
  const [paymentMethod, setPaymentMethod] = useState('');

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

  const handleSubmit = () => {
    handleCreateService();
    handleService();
    
  };

  const handleCreateService = async () => {
      
    if (client) {
      const newService = {
        typeOfService: {
          _id: service?._id
        },
        customer: {
          _id: client._id
        },
        professional: {
          _id: employee?._id
        },
        hour: {
          _id:time?._id
        },
        paymentMethod: paymentMethod,
        price: service?.price
      };
      await createService(newService); 
      

      setDate(undefined)
      setTime(undefined)
      setEmployee(undefined)
      setService(undefined)
      setPaymentMethod('')
      await handleService();
      return router.replace('/dashboard')
    } else {
      console.log('Client not found');
    }
  };

  useEffect(() => {
    handleHour();
    handleTypeOfService();
    handleService();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Funcionário:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={employee}
          onValueChange={(itemValue) => setEmployee(itemValue)}
        >
          <Picker.Item label="Selecione um funcionário" value="" />
          {hourList.map(hour => (
            <Picker.Item key={hour._id} label={hour.professional.name} value={hour.professional} />
          ))}
        </Picker>
        
        <Text style={styles.label}>Data:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={date}
          onValueChange={(itemValue) => setDate(itemValue)}
        >
          <Picker.Item label="Selecione uma data" value="" />
          {hourList.filter(hour => hour.professional._id === employee?._id).map(hour => (
            <Picker.Item key={hour._id} label={`${hour.day[0]}/${hour.day[1]}`} value={hour} />
          ))}
        </Picker>
        
        <Text style={styles.label}>Hora:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={time}
          onValueChange={(itemValue) => setTime(itemValue)}
        >
          <Picker.Item label="Selecione uma hora" value="" />
          {hourList.filter(hour => date && hour.day[0] === date.day[0] && hour.day[1] === date.day[1]).map(hour => (
            <Picker.Item key={hour._id} label={hour.begin} value={hour} />
          ))}
        </Picker>
        <Text style={styles.label}>Serviço:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={service}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          <Picker.Item label="Selecione um serviço" value="" />
          {typesOfServiceList.map(typesOfService => (
            <Picker.Item key={typesOfService._id} label={typesOfService.name} value={typesOfService} />
          ))}
        </Picker>
        <Text style={styles.label}>Método de Pagamento:</Text>
        <Picker
          style = {styles.picker}
          selectedValue={paymentMethod}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)} 
        >
          <Picker.Item label="Selecione um método de pagamento" value="" />
          <Picker.Item label="Pix" value="pix" />
          <Picker.Item label="Dinheiro" value="dinheiro" />
          <Picker.Item label="Cartão" value="cartao" />
        </Picker>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker:{ 
    borderColor: '#333', 
    borderWidth: 1, 
    borderRadius: 5,
    marginBottom: 10
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#000',
    color: 'white',
    alignItems: 'center',
    borderRadius: 5,
    cursor: 'pointer',
  },
  buttonText: {

    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScheduler;


