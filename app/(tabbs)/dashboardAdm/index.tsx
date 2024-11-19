import React, { useEffect, useMemo, useState } from 'react'; // Importa React e hooks necessários
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import { useService } from '../../../hooks/useService'; // Importa um hook personalizado para serviços
import { updateService } from '@/services/userServices'; // Importa função para atualizar serviços
import { Service } from '@/types/ServiceType'; // Importa tipo Service
import { User } from '@/types/UserType'; // Importa tipo User
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local

const ServicosAgendados = () => { // Componente principal
  const { serviceList, handleService, priceFormate } = useService(); // Desestrutura dados do hook useService

  const [cancelServiceId, setCancelServiceId] = useState<string | null>(null); // Estado para armazenar ID do serviço a ser cancelado

  const [user, setUser] = useState<User | null>(null); // Estado para armazenar informações do usuário

  useEffect(() => { // Efeito para buscar usuário do armazenamento local
    const getUserFromStorage = async () => { // Função assíncrona para obter usuário
      const userString = await AsyncStorage.getItem('user'); // Obtém string do usuário
      if (userString) { // Se a string do usuário existir
        const user = JSON.parse(userString) as User; // Faz parse da string para objeto User
        setUser(user); // Atualiza estado do usuário
      }
    };
    getUserFromStorage(); // Chama a função
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => { // Efeito para chamar a função de serviços
    handleService(); // Chama a função para obter serviços
  }, []); // Executa apenas uma vez ao montar o componente

  const handleCancelService = useMemo(() => { // Memoriza a função de cancelar serviço
    return async (serviceId: Service["_id"]) => { // Função assíncrona que recebe ID do serviço
      try {
        const serviceToUpdate = serviceList.find((service) => service._id === serviceId); // Busca serviço na lista
        if (serviceToUpdate) { // Se o serviço for encontrado
          const updatedService: Service = { ...serviceToUpdate, status: 'Cancelado' }; // Atualiza status do serviço
          const response = await updateService(updatedService); // Chama função para atualizar serviço
          handleService(); // Atualiza a lista de serviços
          return response; // Retorna resposta
        } else {
          console.error('Service not found'); // Log de erro se serviço não for encontrado
        }
      } catch (error) {
        console.error('Erro ao cancelar o serviço:', error); // Log de erro em caso de falha
      }
    };
  }, [serviceList, handleService]); // Dependências para memorizar a função

  const ServiceItem = ({ item }: { item: any }) => { // Componente para renderizar item de serviço
    return (
      <View style={styles.service}> // Contêiner para o item de serviço
        <Text style={styles.professional}>{item.professional.name}</Text> // Nome do profissional
        {/* <Text style={styles.customer}>{item.customer.name}</Text> */} // Nome do cliente (comentado)
        <Text style={{color: '#fff'}}>Data:</Text> // Rótulo para data
        <Text style={styles.hour}>{item.hour.day![0]}/{item.hour.day![1]}  {item.hour.begin}</Text> // Data e hora do serviço
        <Text style={{color: '#fff'}}>Cliente:</Text> // Rótulo para cliente
        <Text style={styles.customer}>{item.customer.name}</Text> // Nome do cliente
        {/* <Text style={styles.professional}>{item.professional.name}</Text> */} // Nome do profissional (comentado)
        <Text style={{color: '#fff'}}>Serviço:</Text> // Rótulo para tipo de serviço
        <Text style={styles.serviceType}>{item.typeOfService.name}</Text> // Nome do tipo de serviço
        <Text style={{color: '#fff'}}>Valor:</Text> // Rótulo para valor
        <Text style={styles.price}>{priceFormate(item.typeOfService.price)}</Text> // Valor formatado do serviço
        <Text style={{color: '#fff'}}>Forma de Pagamento:</Text> // Rótulo para forma de pagamento
        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text> // Método de pagamento
        <Text style={{color: '#fff'}}>Status:</Text> // Rótulo para status
        {cancelServiceId === item._id ? ( // Verifica se o serviço está cancelado
          <Text style={styles.status}>Cancelado</Text> // Exibe status como "Cancelado"
        ) : (
          <Text style={styles.status}>{item.status}</Text> // Exibe status atual
        )}

        {item.status == 'Agendado' && ( // Se o status for "Agendado"
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
        <Text>Nenhum serviço agendado</Text> // Mensagem se não houver serviços
      ) : (
        <FlatList // Renderiza lista de serviços
          data={serviceList} // Dados da lista
          renderItem={({ item }) => <ServiceItem item={item} />} // Renderiza cada item usando ServiceItem
          keyExtractor={(item) => item._id!.toString()} // Extrai chave única para cada item
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({ // Estilos do componente
  container: { // Estilo do contêiner principal
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: { // Estilo do título
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  service: { // Estilo do item de serviço
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  professional: { // Estilo do nome do profissional
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff',
    marginBottom: 15
  },
  hour: { // Estilo da hora
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  serviceType: { // Estilo do tipo de serviço
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  price: { // Estilo do valor
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff'
  },
  customer: { // Estilo do nome do cliente
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  paymentMethod: { // Estilo da forma de pagamento
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  status: { // Estilo do status
    fontSize: 16,
    marginBottom: 10,
    color:'#fff'
  },
  cancelButtonContainer: { // Estilo do contêiner do botão de cancelar
    alignItems: 'flex-end',
  },
  cancelButton: { // Estilo do botão de cancelar
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  cancelButtonText: { // Estilo do texto do botão de cancelar
    color: '#fff',
    fontSize: 16,
  },
  loading: { // Estilo para carregamento
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicosAgendados; // Exporta o componente