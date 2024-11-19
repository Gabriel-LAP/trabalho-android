import { createClient } from '@/services/userServices';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !password || !confirmPassword || !phone) {
            alert('Preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);

        const newClient = {
            name,
            email,
            password,
            confirmPassword,
            phone
        }; 
        // console.log(newClient);
        setLoading(true);
        await createClient(newClient);
        router.replace('./');
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                textContentType='telephoneNumber'
                value={phone ? phone.toString() : ''}
                onChangeText={(text) => setPhone(parseInt(text))}
                keyboardType="phone-pad"
                maxLength={11}
                
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                
            />
            {passwordMismatch && <Text style={styles.errorText}>As senhas não coincidem</Text>}
            <TextInput
                style={styles.input}
                placeholder="Confirme a Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: '85%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 20,
        paddingLeft: 10,
    },
    button: {
        width: '85%',
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default Register;

