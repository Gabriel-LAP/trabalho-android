import React, { useEffect, useState } from 'react'; // Importa React e hooks useEffect e useState
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'; // Importa componentes do React Native
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importa ícones do FontAwesome
import { useLogout } from '@/hooks/useLogout'; // Importa hook personalizado para logout
import { Client } from '@/types/ClientType'; // Importa tipo Client

export default function Profile() { // Define o componente Profile

  const [client, setClient] = useState<Client | null>(null); // Estado para armazenar informações do cliente

  useEffect(() => { // Hook para executar código após a renderização
    const getClientFromStorage = async () => { // Função assíncrona para obter dados do cliente
      const clientString = await AsyncStorage.getItem('user'); // Obtém a string do cliente do AsyncStorage
      if (clientString) { // Verifica se a string existe
        const Client = JSON.parse(clientString) as Client; // Converte a string em objeto Client
        setClient(Client); // Atualiza o estado com os dados do cliente
      }
    };

    getClientFromStorage(); // Chama a função para obter os dados do cliente
  }, []); // Executa apenas uma vez após a montagem do componente

  return client && ( // Renderiza o componente apenas se client não for nulo
    <View style={styles.container}> // Contêiner principal
      <View style={styles.header}> // Cabeçalho do perfil
        <FontAwesome name="user-circle" size={60} color="white" style={styles.icon} /> // Ícone do usuário
        <Text style={styles.name}>{client.name}</Text> // Nome do cliente
      </View>
      <ScrollView style={styles.body}> // ScrollView para permitir rolagem
        <Text style={styles.field}>E-mail: {client.email}</Text> // Exibe o e-mail do cliente
        <View style={styles.separator} /> // Separador visual
        <Text style={styles.field}>Telefone: {client.phone}</Text> // Exibe o telefone do cliente
      </ScrollView>
      <Pressable onPress={useLogout} style={styles.logout}> // Botão para logout
        <Text style={styles.logoutText}>Sair</Text> // Texto do botão de logout
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({ // Define os estilos do componente
  container: { // Estilo do contêiner principal
    flex: 1,
  },
  header: { // Estilo do cabeçalho
    height: '30%', // Altura do cabeçalho
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#333', // Cor de fundo do cabeçalho
    marginBottom: 20, // Margem inferior
  },
  icon: { // Estilo do ícone
    marginBottom: 20, // Margem inferior do ícone
  },
  name: { // Estilo do nome do cliente
    fontSize: 24, // Tamanho da fonte
    color: 'white', // Cor do texto
    marginBottom: 6, // Margem inferior
  },
  body: { // Estilo do corpo do perfil
    flex: 1, // Permite que o corpo ocupe o espaço restante
    paddingHorizontal: 20, // Preenchimento horizontal
  },
  field: { // Estilo dos campos de texto
    fontSize: 16, // Tamanho da fonte
    marginBottom: 10, // Margem inferior
  },
  separator: { // Estilo do separador
    height: 1, // Altura do separador
    backgroundColor: '#ccc', // Cor do separador
    marginBottom: 10, // Margem inferior
  },
  logout: { // Estilo do botão de logout
    backgroundColor: '#333', // Cor de fundo do botão
    padding: 10, // Preenchimento interno
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center' // Centraliza verticalmente
  },
  logoutText: { // Estilo do texto do botão de logout
    fontSize: 16, // Tamanho da fonte
    color: 'white', // Cor do texto
  },
});