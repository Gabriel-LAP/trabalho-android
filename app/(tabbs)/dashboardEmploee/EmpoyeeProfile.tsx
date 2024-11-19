import React, { useEffect, useState } from 'react'; // Importa React e hooks useEffect e useState
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'; // Importa componentes do React Native
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenamento local
import { User } from '@/types/UserType'; // Importa o tipo User
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importa ícones do FontAwesome
import { useLogout } from '@/hooks/useLogout'; // Importa o hook de logout

// Define o componente Profile
export default function Profile() {
  // Declara um estado para armazenar o usuário
  const [user, setUser] = useState<User | null>(null); // Inicializa o estado user como null

  // Efeito colateral para buscar o usuário do armazenamento local
  useEffect(() => {
    const getUserFromStorage = async () => { // Função assíncrona para obter o usuário
      const userString = await AsyncStorage.getItem('user'); // Obtém o item 'user' do AsyncStorage
      if (userString) { // Verifica se o usuário existe
        const user = JSON.parse(userString) as User; // Faz o parse da string JSON para um objeto User
        setUser(user); // Atualiza o estado com o usuário
      }
    };

    getUserFromStorage(); // Chama a função para buscar o usuário
  }, []); // O efeito é executado apenas uma vez após a montagem do componente

  // Renderiza o componente se o usuário estiver definido
  return user && (
    <View style={styles.container}> // Contêiner principal
      <View style={styles.header}> // Cabeçalho do perfil
        <FontAwesome name="user-circle" size={60} color="white" style={styles.icon} /> // Ícone do usuário
        <Text style={styles.name}>{user.name}</Text> // Nome do usuário
        <Text style={styles.profession}>Barbeiro</Text> // Profissão do usuário
      </View>
      <ScrollView style={styles.body}> // Corpo do perfil com rolagem
        <Text style={styles.field}>E-mail: {user.email}</Text> // Exibe o e-mail do usuário
        <View style={styles.separator} /> // Separador visual
        <Text style={styles.field}>Telefone: {user.phone}</Text> // Exibe o telefone do usuário
      </ScrollView>
      <Pressable onPress={useLogout} style={styles.logout}> // Botão de logout
        <Text style={styles.logoutText}>Sair</Text> // Texto do botão de logout
      </Pressable>
    </View>
  )
}

// Estilos do componente
const styles = StyleSheet.create({
  container: { // Estilo do contêiner principal
    flex: 1,
  },
  header: { // Estilo do cabeçalho
    height: '30%', // Altura do cabeçalho
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#333', // Cor de fundo
    marginBottom: 20, // Margem inferior
  },
  icon: { // Estilo do ícone
    marginBottom: 20, // Margem inferior
  },
  name: { // Estilo do nome
    fontSize: 24, // Tamanho da fonte
    color: 'white', // Cor do texto
    marginBottom: 6, // Margem inferior
  },
  profession: { // Estilo da profissão
    fontSize: 18, // Tamanho da fonte
    color: 'white', // Cor do texto
  },
  body: { // Estilo do corpo
    flex: 1, // Ocupa o espaço restante
    paddingHorizontal: 20, // Preenchimento horizontal
  },
  field: { // Estilo dos campos de texto
    fontSize: 16, // Tamanho da fonte
    marginBottom: 10, // Margem inferior
  },
  separator: { // Estilo do separador
    height: 1, // Altura do separador
    backgroundColor: '#ccc', // Cor de fundo do separador
    marginBottom: 10, // Margem inferior
  },
  logout: { // Estilo do botão de logout
    backgroundColor: '#333', // Cor de fundo
    padding: 10, // Preenchimento
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
  },
  logoutText: { // Estilo do texto do botão de logout
    fontSize: 16, // Tamanho da fonte
    color: 'white', // Cor do texto
  },
});