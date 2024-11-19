import React, { useEffect, useState } from 'react'; // Importa React e os hooks useEffect e useState
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import { Picker } from '@react-native-picker/picker'; // Importa o componente Picker para seleção
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local
import { Client } from '@/types/ClientType'; // Importa o tipo Client
import { useHour } from '@/hooks/useHour'; // Importa o hook useHour
import { Service } from '@/types/ServiceType'; // Importa o tipo Service
import { useTypeOfService } from '@/hooks/useTypeOfService'; // Importa o hook useTypeOfService
import { typesOfService } from '@/types/TypesOfServiceType'; // Importa os tipos de serviço
import { hour } from '@/types/HourType'; // Importa o tipo hour
import { User } from '@/types/UserType'; // Importa o tipo User
import { createService } from '@/services/userServices'; // Importa a função para criar um novo serviço
import { router } from 'expo-router'; // Importa o roteador para navegação
import { useService } from '@/hooks/useService'; // Importa o hook useService
import { useClients } from '@/hooks/useClient'; // Importa o hook useClients

const AppointmentScheduler = () => { // Define o componente funcional AppointmentScheduler

  const { handleHour, hourList } = useHour(); // Desestrutura o hook useHour para obter a lista de horas
  const { handleTypeOfService, typesOfServiceList } = useTypeOfService(); // Desestrutura o hook useTypeOfService para obter a lista de tipos de serviço
  const { handleService } = useService(); // Desestrutura o hook useService

  const [date, setDate] = useState<hour>(); // Estado para armazenar a data selecionada
  const [time, setTime] = useState<hour>(); // Estado para armazenar a hora selecionada
  const [employee, setEmployee] = useState<User>(); // Estado para armazenar o funcionário selecionado
  const [service, setService] = useState<typesOfService>(); // Estado para armazenar o serviço selecionado
  const [paymentMethod, setPaymentMethod] = useState(''); // Estado para armazenar o método de pagamento

  const [client, setClient] = useState<Client | null>(null); // Estado para armazenar o cliente, que pode ser nulo

  useEffect(() => { // Hook useEffect para executar código ao montar o componente
    const getClientFromStorage = async () => { // Função assíncrona para obter o cliente do armazenamento
      const clientString = await AsyncStorage.getItem('user'); // Obtém o item 'user' do AsyncStorage
      if (clientString) { // Verifica se o cliente foi encontrado
        const Client = JSON.parse(clientString) as Client; // Faz o parse do cliente armazenado
        setClient(Client); // Atualiza o estado do cliente
      }
    };

    getClientFromStorage(); // Chama a função para obter o cliente
  }, []); // Executa apenas uma vez ao montar o componente

  const handleSubmit = () => { // Função para lidar com o envio do formulário
    handleCreateService(); // Chama a função para criar o serviço
    handleService(); // Chama a função para lidar com serviços
  };

  const handleCreateService = async () => { // Função assíncrona para criar um novo serviço
    if (client) { // Verifica se o cliente está definido
      const newService = { // Cria um objeto com os dados do novo serviço
        typeOfService: {
          _id: service?._id // ID do tipo de serviço
        },
        customer: {
          _id: client._id // ID do cliente
        },
        professional: {
          _id: employee?._id // ID do funcionário
        },
        hour: {
          _id: time?._id // ID da hora
        },
        paymentMethod: paymentMethod, // Método de pagamento
        price: service?.price // Preço do serviço
      };
      await createService(newService); // Chama a função para criar o serviço com os dados fornecidos

      // Reseta os estados após a criação do serviço
      setDate(undefined);
      setTime(undefined);
      setEmployee(undefined);
      setService(undefined);
      setPaymentMethod('');
      await handleService(); // Atualiza a lista de serviços
      return router.replace('/dashboard'); // Redireciona para a página do dashboard
    } else {
      console.log('Client not found'); // Loga se o cliente não for encontrado
    }
  };

  useEffect(() => { // Hook useEffect para executar código ao montar o componente
    handleHour(); // Chama a função para lidar com horas
    handleTypeOfService(); // Chama a função para lidar com tipos de serviço
    handleService(); // Chama a função para lidar com serviços
  }, []); // Executa apenas uma vez ao montar o componente

  return ( // Retorna o JSX do componente
    <View style={styles.container}> // Contêiner principal
      <View style={styles.form}> // Contêiner do formulário
        <Text style={styles.label}>Funcionário:</Text> // Rótulo para o campo de funcionário
        <Picker // Componente Picker para selecionar o funcionário
          style={styles.picker}
          selectedValue={employee} // Valor selecionado
          onValueChange={(itemValue) => setEmployee(itemValue)} // Atualiza o estado com o funcionário selecionado
        >
          <Picker.Item label="Selecione um funcionário" value="" /> // Opção padrão
          {hourList.map(hour => ( // Mapeia a lista de horas para criar opções
            <Picker.Item key={hour._id} label={hour.professional.name} value={hour.professional} /> // Opção para cada funcionário
          ))}
        </Picker>
        
        <Text style={styles.label}>Data:</Text> // Rótulo para o campo de data
        <Picker // Componente Picker para selecionar a data
          style={styles.picker}
          selectedValue={date} // Valor selecionado
          onValueChange={(itemValue) => setDate(itemValue)} // Atualiza o estado com a data selecionada
        >
          <Picker.Item label="Selecione uma data" value="" /> // Opção padrão
          {hourList.filter(hour => hour.professional._id === employee?._id).map(hour => ( // Filtra as horas pelo funcionário selecionado
            <Picker.Item key={hour._id} label={`${hour.day[0]}/${hour.day[1]}`} value={hour} /> // Opção para cada data disponível
          ))}
        </Picker>
        
        <Text style={styles.label}>Hora:</Text> // Rótulo para o campo de hora
        <Picker // Componente Picker para selecionar a hora
          style={styles.picker}
          selectedValue={time} // Valor selecionado
          onValueChange={(itemValue) => setTime(itemValue)} // Atualiza o estado com a hora selecionada
        >
          <Picker.Item label="Selecione uma hora" value="" /> // Opção padrão
          {hourList.filter(hour => date && hour.day[0] === date.day[0] && hour.day[1] === date.day[1]).map(hour => ( // Filtra as horas pela data selecionada
            <Picker.Item key={hour._id} label={hour.begin} value={hour} /> // Opção para cada hora disponível
          ))}
        </Picker>
        <Text style={styles.label}>Serviço:</Text> // Rótulo para o campo de serviço
        <Picker // Componente Picker para selecionar o serviço
          style={styles.picker}
          selectedValue={service} // Valor selecionado
          onValueChange={(itemValue) => setService(itemValue)} // Atualiza o estado com o serviço selecionado
        >
          <Picker.Item label="Selecione um serviço" value="" /> // Opção padrão
          {typesOfServiceList.map(typesOfService => ( // Mapeia a lista de tipos de serviço para criar opções
            <Picker.Item key={typesOfService._id} label={typesOfService.name} value={typesOfService} /> // Opção para cada tipo de serviço
          ))}
        </Picker>
        <Text style={styles.label}>Método de Pagamento:</Text> // Rótulo para o campo de método de pagamento
        <Picker // Componente Picker para selecionar o método de pagamento
          style={styles.picker}
          selectedValue={paymentMethod} // Valor selecionado
          onValueChange={(itemValue) => setPaymentMethod(itemValue)} // Atualiza o estado com o método de pagamento selecionado
        >
          <Picker.Item label="Selecione um método de pagamento" value="" /> // Opção padrão
          <Picker.Item label="Pix" value="pix" /> // Opção para Pix
          <Picker.Item label="Dinheiro" value="dinheiro" /> // Opção para Dinheiro
          <Picker.Item label="Cartão" value="cartao" /> // Opção para Cartão
        </Picker>
        <View style={{ marginTop: 20 }}> // Conteiner para o botao
          <TouchableOpacity style={styles.button} onPress={handleSubmit}> // Botão para enviar o formulário
            <Text style={styles.buttonText}>Agendar</Text> // Texto do botão
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ // Estilos do componente
  container: {
    flex: 1, // Permite que o contêiner ocupe todo o espaço disponível
  },
  title: {
    fontSize: 24, // Tamanho da fonte do título
    fontWeight: 'bold', // Define o texto como negrito
    marginBottom: 20, // Margem inferior do título
  },
  form: {
    flex: 1, // Permite que o formulário ocupe todo o espaço disponível
    width: '100%', // Largura do formulário
    padding: 20, // Espaçamento interno do formulário
    backgroundColor: '#f9f9f9' // Cor de fundo do formulário
  },
  label: {
    fontSize: 16, // Tamanho da fonte do rótulo
    fontWeight: 'bold', // Define o texto como negrito
    marginBottom: 10, // Margem inferior do rótulo
  },
  picker:{ 
    borderColor: '#333', // Cor da borda do Picker
    borderWidth: 1, // Largura da borda do Picker
    borderRadius: 5, // Bordas arredondadas do Picker
    marginBottom: 10 // Margem inferior do Picker
  },
  input: {
    width: '100%', // Largura do campo de entrada
    padding: 10, // Espaçamento interno do campo de entrada
    marginBottom: 10, // Margem inferior do campo de entrada
    borderColor: '#ccc', // Cor da borda do campo de entrada
    borderWidth: 1, // Largura da borda do campo de entrada
    borderRadius: 5, // Bordas arredondadas do campo de entrada
  },
  button: {
    width: '100%', // Largura do botão
    padding: 10, // Espaçamento interno do botão
    backgroundColor: '#000', // Cor de fundo do botão
    color: 'white', // Cor do texto do botão
    alignItems: 'center', // Centraliza o conteúdo do botão
    borderRadius: 5, // Bordas arredondadas do botão
    cursor: 'pointer', // Cursor de ponteiro para o botão
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte do texto do botão
    fontWeight: 'bold', // Define o texto como negrito
  },
});

export default AppointmentScheduler; // Exporta o componente AppointmentScheduler