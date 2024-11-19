import React, { useEffect, useMemo, useState } from 'react'; // Importa React e hooks necessários
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import { useService } from '../../../hooks/useService'; // Importa um hook personalizado para serviços
import { updateService } from '@/services/userServices'; // Importa função para atualizar serviços
import { Service } from '@/types/ServiceType'; // Importa tipo Service
import { Client } from '@/types/ClientType'; // Importa tipo Client
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local

const ServicosAgendados = () => { // Componente principal
  const { serviceList, handleService, priceFormate } = useService(); // Desestrutura dados do hook useService

  const [cancelServiceId, setCancelServiceId] = useState<string | null>(null); // Estado para armazenar ID do serviço a ser cancelado

  const [client, setClient] = useState<Client | null>(null); // Estado para armazenar informações do cliente

  useEffect(() => { // Efeito para buscar cliente do armazenamento local
    const getClientFromStorage = async () => { // Função assíncrona para obter cliente
      const clientString = await AsyncStorage.getItem('user'); // Obtém string do cliente
      if (clientString) { // Se a string existir
        const Client = JSON.parse(clientString) as Client; // Faz parse da string para objeto Client
        setClient(Client); // Atualiza estado do cliente
      }
    };

    getClientFromStorage(); // Chama a função para obter cliente
  }, []); // Executa apenas uma vez ao montar o componente
  
  useEffect(() => { // Efeito para manipular serviços
    handleService(); // Chama função para manipular serviços
  }, []); // Executa apenas uma vez ao montar o componente

  const handleCancelService = useMemo(() => { // Memoiza a função para cancelar serviços
    return async (serviceId: Service["_id"]) => { // Função assíncrona que recebe ID do serviço
      try {
        const serviceToUpdate = serviceList.find((service) => service._id === serviceId); // Busca serviço na lista
        if (serviceToUpdate) { // Se o serviço for encontrado
          const updatedService: Service = { ...serviceToUpdate, status: 'Cancelado' }; // Atualiza status do serviço
          const response = await updateService(updatedService); // Chama função para atualizar serviço
          return response; // Retorna resposta
        } else {
          console.error('Service not found'); // Log de erro se serviço não for encontrado
        }
      } catch (error) {
        console.error('Erro ao cancelar o serviço:', error); // Log de erro em caso de falha
      }
    };
  }, [serviceList]); // Dependência da lista de serviços

  const ServiceItem = ({ item }: { item: any }) => { // Componente para renderizar item de serviço
    return (
      <View style={styles.service}> // Contêiner para o item de serviço
        <Text style={styles.customer}>{item.customer.name}</Text> // Nome do cliente
        <Text style={styles.text}>Data</Text> // Rótulo para data
        <Text style={styles.hour}>{item.hour.day![0]}/{item.hour.day![1]}  {item.hour.begin}</Text> // Data e hora do serviço
        <Text style={styles.text}>Serviço</Text> // Rótulo para tipo de serviço
        <Text style={styles.serviceType}>{item.typeOfService.name}</Text> // Nome do tipo de serviço
        <Text style={styles.text}>Valor</Text> // Rótulo para valor
        <Text style={styles.price}>{priceFormate(item.typeOfService.price)}</Text> // Valor formatado do serviço
        <Text style={styles.text}>Profissional</Text> // Rótulo para profissional
        <Text style={styles.professional}>{item.professional.name}</Text> // Nome do profissional
        <Text style={styles.text}>Forma de Pagamento</Text> // Rótulo para forma de pagamento
        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text> // Método de pagamento
        <Text style={styles.text}>Status</Text> // Rótulo para status
        {cancelServiceId === item._id ? ( // Verifica se o serviço está cancelado
          <Text style={styles.status}>Cancelado</Text> // Exibe status como "Cancelado"
        ) : (
          <Text style={styles.status}>{item.status}</Text> // Exibe status atual do serviço
        )}

        {item.status == 'Agendado' && ( // Se o status do serviço for "Agendado"
          <View style={styles.cancelButtonContainer}> // Contêiner para botão de cancelar
            <TouchableOpacity
              style={styles.cancelButton} // Estilo do botão
              onPress={() => handleCancelService(item._id!)} // Chama função de cancelar ao pressionar
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text> // Texto do botão
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}> // Contêiner principal
      {serviceList.length === 0 ? ( // Verifica se a lista de serviços está vazia
        <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> // Exibe indicador de carregamento
      ) : (
        <FlatList // Lista de serviços
          data={serviceList.filter((item) => item.customer._id === client!._id)} // Filtra serviços pelo ID do cliente
          renderItem={({ item }) => <ServiceItem item={item} />} // Renderiza cada item usando o componente ServiceItem
          keyExtractor={(item) => item._id!.toString()} // Extrai chave única para cada item
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({ // Estilos do componente
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
  customer: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff',
    marginBottom: 15
  },
  hour: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff',
  },
  serviceType: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff',
  },
  professional: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff',
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff',
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff',
  },
  cancelButtonContainer: {
    alignItems: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
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
  text: {
    color: '#fff',
  },
});

export default ServicosAgendados; // Exporta o componente