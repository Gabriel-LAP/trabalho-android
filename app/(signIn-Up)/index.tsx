import { Link } from 'expo-router'; // Importa o componente Link para navegação entre telas
import React, { useState } from 'react'; // Importa React e o hook useState do React
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'; // Importa componentes do React Native
import useLoginHook from '../../hooks/useLogin'; // Importa um hook personalizado para gerenciar o login

const LoginScreen = () => { // Define o componente funcional LoginScreen

  const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
  const [password, setPassword] = useState(''); // Estado para armazenar a senha do usuário
  const [loading, setLoading] = useState(false); // Estado para controlar se a aplicação está carregando
  
  const handleLogin = async () => { // Função assíncrona para lidar com o login
    setLoading(true); // Ativa o estado de carregamento
    await useLoginHook({email, password}); // Chama o hook de login com email e senha
    setLoading(false); // Desativa o estado de carregamento
  }

  return ( // Retorna o JSX do componente
    <View style={styles.container}> // Contêiner principal do formulário
      <Image style={styles.logo} source={require('../../assets/logo.png')} /> // Imagem do logo

      <TextInput // Campo de entrada para o email
        style={styles.input} 
        placeholder="Email" // Texto de espaço reservado
        value={email} // Valor atual do campo
        onChangeText={setEmail} // Atualiza o estado com o texto inserido
      />

      <TextInput // Campo de entrada para a senha
        style={styles.input} 
        placeholder="Senha" // Texto de espaço reservado
        value={password} // Valor atual do campo
        onChangeText={setPassword} // Atualiza o estado com o texto inserido
        secureTextEntry // Oculta o texto inserido
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}> // Botão para enviar o formulário
        {loading ? ( // Condicional para mostrar o indicador de carregamento ou texto
          <ActivityIndicator size="small" color="#fff" /> // Indicador de carregamento
        ) : (
          <Text style={styles.buttonText}>Login</Text> // Texto do botão
        )}
      </TouchableOpacity>
      
      <Text style={{color: '#000'}}>Não tem conta? <Link href='/Register'>Cadastre-se</Link></Text> // Link para a página de registro
      
    </View>
  );
};

const styles = StyleSheet.create({ // Estilos do componente
  container: {
    flex: 1, // Permite que o contêiner ocupe todo o espaço disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  logo: {
    width: 200, // Largura da imagem do logo
    height: 200, // Altura da imagem do logo
    marginBottom: 150, // Margem inferior da imagem do logo
  },
  input: {
    height: 40, // Altura do campo de entrada
    width: '85%', // Largura do campo de entrada
    borderColor: 'gray', // Cor da borda do campo
    borderWidth: 1, // Largura da borda do campo
    marginBottom: 20, // Margem inferior do campo
    borderRadius: 20, // Bordas arredondadas
    paddingLeft: 10, // Espaçamento interno à esquerda
  },
  button: {
    width: '85%', // Largura do botão
    marginBottom: 20, // Margem inferior do botão
    alignItems: 'center', // Centraliza o conteúdo do botão
    padding: 10, // Espaçamento interno do botão
    borderRadius: 20, // Bordas arredondadas do botão
    backgroundColor: '#000', // Cor de fundo do botão
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontWeight: 'bold', // Define o texto como negrito
  }
});

export default LoginScreen; // Exporta o componente LoginScreen