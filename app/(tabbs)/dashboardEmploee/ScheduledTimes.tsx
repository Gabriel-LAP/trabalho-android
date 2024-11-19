// Importa bibliotecas e tipos necessários
import React, { useEffect, useState } from 'react'; // Importa React e hooks useEffect e useState
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'; // Importa componentes do React Native
import { useHour } from '@/hooks/useHour'; // Importa um hook personalizado para gerenciar horas
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local
import { User } from '@/types/UserType'; // Importa o tipo User

// Define o componente funcional ScheduledTimes
const ScheduledTimes = () => {
  // Usa o hook useHour para obter a lista de horas e a função para manipulá-las
  const { hourList, handleHour } = useHour();
  // Define o estado do usuário e do carregamento
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar o usuário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Efeito colateral para obter o usuário do armazenamento local
  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user'); // Obtém o usuário armazenado
      if (userString) {
        const user = JSON.parse(userString) as User; // Converte a string JSON em um objeto User
        setUser(user); // Atualiza o estado do usuário
      }
    };

    getUserFromStorage(); // Chama a função para obter o usuário
    handleHour(); // Chama a função para manipular as horas
  }, []); // Executa apenas uma vez após a montagem do componente

  // Efeito colateral para atualizar o estado de carregamento
  useEffect(() => {
    if (hourList) {
      setLoading(false); // Atualiza o estado de carregamento para falso se hourList estiver disponível
    }
  }, [hourList]); // Executa sempre que hourList muda

  // Se estiver carregando, exibe um indicador de carregamento
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Exibe um indicador de carregamento
  }

  // Renderiza a lista de horários agendados
  return (
    <View style={styles.container}> // Contêiner principal
      <FlatList
        data={hourList.filter(hour => hour.professional._id === user?._id)} // Filtra a lista de horas pelo ID do profissional
        keyExtractor={(item) => item._id ?? ''} // Extrai a chave única de cada item
        renderItem={({ item }) => ( // Renderiza cada item da lista
          <View style={styles.item}> // Contêiner para cada item
            <Text style={styles.text}>Data: {item.day[0]}/{item.day[1]}</Text> // Exibe a data
            <Text style={styles.text}>Hora: {item.begin}</Text> // Exibe a hora
          </View>
        )}
      />
    </View>
  );
};

// Define os estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Permite que o contêiner ocupe todo o espaço disponível
    padding: 20, // Adiciona preenchimento ao contêiner
  },
  item: {
    marginBottom: 20, // Adiciona margem inferior entre os itens
    padding: 10, // Adiciona preenchimento ao item
    backgroundColor: '#333', // Define a cor de fundo do item
    borderRadius: 5, // Adiciona bordas arredondadas ao item
  },
  text: {
    fontSize: 16, // Define o tamanho da fonte do texto
    color: '#fff', // Define a cor do texto
  },
});

// Exporta o componente ScheduledTimes
export default ScheduledTimes;