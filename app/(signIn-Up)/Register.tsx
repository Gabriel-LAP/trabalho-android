import { createClient } from '@/services/userServices'; // Importa a função para criar um novo cliente
import { router } from 'expo-router'; // Importa o roteador para navegação entre telas
import { useState } from 'react'; // Importa o hook useState do React para gerenciar estados
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'; // Importa componentes do React Native

const Register = () => { // Define o componente funcional Register
    const [name, setName] = useState(''); // Estado para armazenar o nome do usuário
    const [email, setEmail] = useState(''); // Estado para armazenar o email do usuário
    const [password, setPassword] = useState(''); // Estado para armazenar a senha do usuário
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para armazenar a confirmação da senha
    const [phone, setPhone] = useState<number>(0); // Estado para armazenar o telefone do usuário
    const [loading, setLoading] = useState(false); // Estado para controlar se a aplicação está carregando
    const [passwordMismatch, setPasswordMismatch] = useState(false); // Estado para verificar se as senhas coincidem

    const handleSubmit = async () => { // Função assíncrona para lidar com o envio do formulário
        if (!name || !email || !password || !confirmPassword || !phone) { // Verifica se todos os campos estão preenchidos
            alert('Preencha todos os campos'); // Alerta o usuário se algum campo estiver vazio
            return; // Interrompe a execução da função
        }

        if (password !== confirmPassword) { // Verifica se a senha e a confirmação da senha coincidem
            setPasswordMismatch(true); // Define o estado de mismatch para verdadeiro
            return; // Interrompe a execução da função
        }
        setPasswordMismatch(false); // Reseta o estado de mismatch se as senhas coincidem

        const newClient = { // Cria um objeto com os dados do novo cliente
            name,
            email,
            password,
            confirmPassword,
            phone
        }; 
        // console.log(newClient); // (Comentado) Para depuração, pode ser usado para verificar os dados do novo cliente
        setLoading(true); // Ativa o estado de carregamento
        await createClient(newClient); // Chama a função para criar um novo cliente com os dados fornecidos
        router.replace('./'); // Redireciona para a página inicial após o registro
        setLoading(false); // Desativa o estado de carregamento
    };

    return ( // Retorna o JSX do componente
        <View style={styles.container}> // Contêiner principal do formulário
            <Text style={styles.title}>Cadastro</Text> // Título do formulário de registro
            <TextInput // Campo de entrada para o nome
                style={styles.input}
                placeholder="Nome" // Texto de espaço reservado
                value={name} // Valor atual do campo
                onChangeText={setName} // Atualiza o estado com o texto inserido
            />
            <TextInput // Campo de entrada para o email
                style={styles.input}
                placeholder="E-mail" // Texto de espaço reservado
                value={email} // Valor atual do campo
                onChangeText={setEmail} // Atualiza o estado com o texto inserido
                keyboardType="email-address" // Define o tipo de teclado para email
            />
            <TextInput // Campo de entrada para o telefone
                style={styles.input}
                placeholder="Telefone" // Texto de espaço reservado
                textContentType='telephoneNumber' // Define o tipo de conteúdo como número de telefone
                value={phone ? phone.toString() : ''} // Converte o telefone para string se não for zero
                onChangeText={(text) => setPhone(parseInt(text))} // Atualiza o estado com o número de telefone
                keyboardType="phone-pad" // Define o tipo de teclado para números de telefone
                maxLength={11} // Limita o número de caracteres a 11
            />
            <TextInput // Campo de entrada para a senha
                style={styles.input}
                placeholder="Senha" // Texto de espaço reservado
                value={password} // Valor atual do campo
                onChangeText={setPassword} // Atualiza o estado com o texto inserido
                secureTextEntry // Oculta o texto inserido
            />
            {passwordMismatch && <Text style={styles.errorText}>As senhas não coincidem</Text>} // Mensagem de erro se as senhas não coincidirem
            <TextInput // Campo de entrada para a confirmação da senha
                style={styles.input}
                placeholder="Confirme a Senha" // Texto de espaço reservado
                value={confirmPassword} // Valor atual do campo
                onChangeText={setConfirmPassword} // Atualiza o estado com o texto inserido
                secureTextEntry // Oculta o texto inserido
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}> // Botão para enviar o formulário
                {loading ? ( // Condicional para mostrar o indicador de carregamento ou texto
                    <ActivityIndicator size="small" color="#fff" /> // Indicador de carregamento
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text> // Texto do botão
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ // Estilos do componente
    container: {
        flex: 1, // Permite que o contêiner ocupe todo o espaço disponível
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    title: {
        fontSize: 24, // Tamanho da fonte do título
        marginBottom: 20, // Margem inferior do título
        textAlign: 'center', // Alinha o texto ao centro
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
    },
    errorText: {
        color: 'red', // Cor do texto de erro
        marginBottom: 10, // Margem inferior do texto de erro
        textAlign: 'center', // Alinha o texto de erro ao centro
    }
});

export default Register; // Exporta o componente Register