import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'; // Importa componentes do React Native
import { User } from '@/types/UserType'; // Importa o tipo User definido em outro arquivo
import { createUser } from '@/services/userServices'; // Importa a função createUser para criar um novo usuário
import { Picker } from '@react-native-picker/picker'; // Importa o componente Picker para seleção
import { router } from 'expo-router'; // Importa o roteador para navegação entre telas

const RegisterEmployee = () => { // Define o componente RegisterEmployee
  const [name, setName] = useState(''); // Estado para armazenar o nome
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const [cpf, setCpf] = useState(''); // Estado para armazenar o CPF
  const [phone, setPhone] = useState<number>(0); // Estado para armazenar o telefone
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para armazenar a confirmação da senha
  const [address, setAddress] = useState(''); // Estado para armazenar o endereço
  const [number, setNumber] = useState<number>(0); // Estado para armazenar o número do endereço
  const [zipCode, setZipCode] = useState<number>(0); // Estado para armazenar o CEP
  const [city, setCity] = useState(''); // Estado para armazenar a cidade
  const [state, setState] = useState(''); // Estado para armazenar o estado
  const [type, setType] = useState('funcionario'); // Estado para armazenar o tipo de usuário (funcionário ou gestor)

  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const handleRegister = async () => { // Função para lidar com o registro do usuário
    if (password !== confirmPassword) { // Verifica se as senhas conferem
      alert('As senhas não conferem'); // Alerta se as senhas não conferem
      return; // Sai da função
    }
    const user: User = { // Cria um objeto user com os dados do formulário
      name,
      email,
      cpf,
      phone,
      password,
      confirmPassword,
      address,
      number,
      zipCode,
      city,
      state,
      type,
    };
    setLoading(true); // Ativa o estado de carregamento
    console.log(user); // Exibe o objeto user no console
    await createUser(user).catch((error) => setLoading(false)); // Tenta criar o usuário e desativa o carregamento em caso de erro
    setLoading(false); // Desativa o estado de carregamento
    router.navigate({ // Navega para a tela de funcionários cadastrados
        pathname: '/(tabbs)/dashboardAdm/RegisteredEmployees',
      });
  };

  return ( // Retorna o JSX do componente
    <View style={styles.container}> // Contêiner principal
        <ScrollView > // Permite rolagem do conteúdo
        <TextInput // Campo para o nome
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={(text) => setName(text)} // Atualiza o estado do nome
        />
        <TextInput // Campo para o email
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)} // Atualiza o estado do email
        />
        <TextInput // Campo para o CPF
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={(text) => setCpf(text)} // Atualiza o estado do CPF
        />
        <TextInput // Campo para o telefone
            style={styles.input}
            placeholder="Telefone"
            value={phone ? phone.toString() : ''} // Converte o telefone para string
            onChangeText={(text) => setPhone(parseInt(text))} // Atualiza o estado do telefone
        />
        <TextInput // Campo para a senha
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)} // Atualiza o estado da senha
            secureTextEntry // Oculta o texto da senha
        />
        <TextInput // Campo para confirmar a senha
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)} // Atualiza o estado da confirmação da senha
            secureTextEntry // Oculta o texto da confirmação da senha
        />
        <TextInput // Campo para o endereço
            style={styles.input}
            placeholder="Endereço"
            value={address}
            onChangeText={(text) => setAddress(text)} // Atualiza o estado do endereço
        />
        <TextInput // Campo para o número do endereço
            style={styles.input}
            placeholder="Número"
            value={number ? number.toString() : ''} // Converte o número para string
            onChangeText={(text) => setNumber(parseInt(text))} // Atualiza o estado do número
        />
        <TextInput // Campo para o CEP
            style={styles.input}
            placeholder="CEP"
            value={zipCode ? zipCode.toString() : ''} // Converte o CEP para string
            onChangeText={(text) => setZipCode(parseInt(text))} // Atualiza o estado do CEP
        />
        <TextInput // Campo para a cidade
            style={styles.input}
            placeholder="Cidade"
            value={city}
            onChangeText={(text) => setCity(text)} // Atualiza o estado da cidade
        />
        <TextInput // Campo para o estado
            style={styles.input}
            placeholder="Estado"
            value={state}
            onChangeText={(text) => setState(text)} // Atualiza o estado do estado
        />
        <Picker // Componente para seleção do tipo de usuário
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)} // Atualiza o estado do tipo
        >
            <Picker.Item label="Funcionário" value="funcionario" /> // Opção para funcionário
            <Picker.Item label="Gestor" value="gestor" /> // Opção para gestor
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleRegister}> // Botão para cadastrar
            <Text style={styles.buttonText}>Cadastrar</Text> // Texto do botão
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#00ff00" />} // Exibe indicador de carregamento se loading for true
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({ // Define os estilos do componente
  container: { // Estilo do contêiner
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: { // Estilo do título
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: { // Estilo dos campos de entrada
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: { // Estilo do botão
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: { // Estilo do texto do botão
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegisterEmployee; // Exporta o componente RegisterEmployee