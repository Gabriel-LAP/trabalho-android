// Importa bibliotecas e componentes necessários do React e React Native
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useService } from '../../../hooks/useService'; // Hook personalizado para gerenciar serviços
import { updateService } from '@/services/userServices'; // Função para atualizar serviços
import { Service } from '@/types/ServiceType'; // Tipo para serviços
import { User } from '@/types/UserType'; // Tipo para usuários
import AsyncStorage from '@react-native-async-storage/async-storage'; // Biblioteca para armazenamento assíncrono

// Componente principal que exibe os serviços agendados
const ServicosAgendados = () => {
  // Desestruturação do hook useService para obter a lista de serviços e funções
  const { serviceList, handleService, priceFormate } = useService();

  // Estado para armazenar o ID do serviço a ser cancelado
  const [cancelServiceId, setCancelServiceId] = useState<string | null>(null);

  // Estado para armazenar as informações do usuário
  const [user, setUser] = useState<User | null>(null);

  // Efeito colateral para obter o usuário armazenado no AsyncStorage
  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user'); // Obtém o usuário do armazenamento
      if (userString) {
        const user = JSON.parse(userString) as User; // Converte a string em objeto User
        setUser(user); // Atualiza o estado do usuário
      }
    };
    getUserFromStorage(); // Chama a função para obter o usuário
  }, []);

  // Efeito colateral para carregar a lista de serviços
  useEffect(() => {
    handleService(); // Chama a função para obter a lista de serviços
  }, []);

  // Função para cancelar um serviço
  const handleCancelService = useMemo(() => {
    return async (serviceId: Service["_id"]) => {
      try {
        const serviceToUpdate = serviceList.find((service) => service._id === serviceId); // Encontra o serviço a ser atualizado
        if (serviceToUpdate) {
          const updatedService: Service = { ...serviceToUpdate, status: 'Concluido' }; // Atualiza o status do serviço
          const response = await updateService(updatedService); // Chama a função para atualizar o serviço
          handleService(); // Atualiza a lista de serviços
          return response; // Retorna a resposta da atualização
        } else {
          console.error('Service not found'); // Log de erro se o serviço não for encontrado
        }
      } catch (error) {
        console.error('Erro ao cancelar o servico:', error); // Log de erro em caso de falha
      }
    };
  }, [serviceList, handleService]); // Dependências para a função

  // Componente para exibir cada item de serviço
  const ServiceItem = ({ item }: { item: any }) => {
    if (item.professional._id !== user?._id) return null; // Verifica se o profissional é o mesmo que o usuário

    return (
      <View style={styles.service}> // Estilo do item de serviço
        <Text style={styles.professional}>{item.professional.name}</Text> // Nome do profissional
        {/* <Text style={styles.customer}>{item.customer.name}</Text> */} // Nome do cliente (comentado)
        <Text style={{color: '#fff'}}>Data:</Text> // Rótulo para a data
        <Text style={styles.hour}>{item.hour.day![0]}/{item.hour.day![1]}  {item.hour.begin}</Text> // Data e hora do serviço
        <Text style={{color: '#fff'}}>Cliente:</Text> // Rótulo para o cliente
        <Text style={styles.customer}>{item.customer.name}</Text> // Nome do cliente
        {/* <Text style={styles.professional}>{item.professional.name}</Text> */} // Nome do profissional (comentado)
        <Text style={{color: '#fff'}}>Servi o:</Text> // Rótulo para o tipo de serviço
        <Text style={styles.serviceType}>{item.typeOfService.name}</Text> // Nome do tipo de serviço
        <Text style={{color: '#fff'}}>Valor:</Text> // Rótulo para o valor
        <Text style={styles.price}>R$ {priceFormate(item.typeOfService.price)}</Text> // Valor formatado do serviço
        <Text style={{color: '#fff'}}>Forma de Pagamento:</Text> // Rótulo para a forma de pagamento
        <Text style={styles.paymentMethod}>{item.paymentMethod}</Text> // Forma de pagamento
        <Text style={{color: '#fff'}}>Status:</Text> // Rótulo para o status
        {cancelServiceId === item._id ? ( // Verifica se o serviço está cancelado
          <Text style={styles.status}>Cancelado</Text> // Exibe "Cancelado"
        ) : (
          <Text style={styles.status}>{item.status}</Text> // Exibe o status atual
        )}

        {item.status !== 'Agendado' ? null : ( // Verifica se o status é 'Agendado'
          <View style={styles.buttonContainer}> // Contêiner para os botões
            <TouchableOpacity
              style={styles.finishButton} // Estilo do botão de concluir
              onPress={() => handleCancelService(item._id!)} // Chama a função de cancelar ao pressionar
            >
              <Text style={styles.finishButtonText}>Concluir</Text> // Texto do botão
            </TouchableOpacity>
          </View>
        )}

        {item.status == 'Agendado' && ( // Verifica se o status é 'Agendado'
          <View style={styles.buttonContainer}> // Contêiner para os botões
            <TouchableOpacity
              style={styles.cancelButton} // Estilo do botão de cancelar
              onPress={() => handleCancelService(item._id!)} // Chama a função de cancelar ao pressionar
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
      {serviceList.length === 0 ? ( // Verifica se não há serviços agendados
        <Text>Nenhum servico agendado</Text> // Mensagem informando que não há serviços
      ) : (
        <FlatList // Lista para exibir os serviços
          data={serviceList} // Dados da lista
          renderItem={({ item }) => <ServiceItem item={item} />} // Renderiza cada item
          keyExtractor={(item) => item._id!.toString()} // Extrai a chave única para cada item
        />
      )}
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Cor de fundo do contêiner
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Estilo do título
  },
  service: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333', // Cor de fundo do item de serviço
    borderRadius: 5,
     
  },
  professional: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff', // Cor do texto do profissional
    marginBottom: 15
  },
  hour: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff' // Cor do texto da hora
  },
  serviceType: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff' // Cor do texto do tipo de serviço
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff' // Cor do texto do valor
  },
  customer: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff' // Cor do texto do cliente
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff' // Cor do texto da forma de pagamento
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color:'#fff' // Cor do texto do status
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha os botões
  },
  cancelButton: {
    backgroundColor: '#f44336', // Cor de fundo do botão de cancelar
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '35%', // Largura do botão
    alignItems: 'center',
    position: 'relative',
    left: '440%', // Posição do botão
  },
  cancelButtonText: {
    color: '#fff', // Cor do texto do botão de cancelar
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#555', // Cor de fundo do botão de concluir
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '35%', // Largura do botão
    alignItems: 'center',
    position: 'relative',
    left: '440%', // Posição do botão
  },
  finishButtonText: {
    color: '#fff', // Cor do texto do botão de concluir
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Estilo para o carregamento
  },
});

// Exporta o componente principal
export default ServicosAgendados