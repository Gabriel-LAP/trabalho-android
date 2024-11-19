// Importa tipos necessários para o login, usuário, cliente, serviço e hora
import { Login } from '@/types/LoginType';
import { User } from '@/types/UserType';
import dataBase from './dataBase';
import { Client } from '@/types/ClientType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '@/types/ServiceType';
import { typesOfService } from '@/types/TypesOfServiceType';
import { hour, hourCreate } from '@/types/HourType';

// Função para obter o token de autenticação armazenado
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); // Tenta obter o token do armazenamento assíncrono
        return token; // Retorna o token se obtido com sucesso
    } catch (error) {
        console.log('Erro ao pegar token:', error); // Loga o erro caso ocorra
        return null; // Retorna null se houver erro
    }
};

// Função para fazer login de um usuário
async function loginUser(data: Login) {
    try {
        const response = await dataBase.post('/users/login', data); // Envia os dados de login para a API
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('Dados enviados para login:', data); // Loga os dados enviados
        console.log('Erro ao fazer login:', error); // Loga o erro caso ocorra
        throw error; // Lança o erro para ser tratado em outro lugar
    }
}

// Função para obter todos os usuários
async function getAllUsers(): Promise<User[]> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get('/users/list/all', config); // Faz a requisição para obter todos os usuários
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error.response.data); // Loga o erro da resposta
        throw error; // Lança o erro
    }
}

// Função para obter um usuário pelo ID
async function getUserById(id: string): Promise<User> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/users/list/${id}`, config); // Faz a requisição para obter o usuário pelo ID
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error.response.data); // Loga o erro da resposta
        throw error; // Lança o erro
    }
}

// Função para obter um usuário pelo nome
async function getUserByName(name: string): Promise<User> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/users/list/name?name=${name}`, config); // Faz a requisição para obter o usuário pelo nome
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error.response.data); // Loga o erro da resposta
        throw error; // Lança o erro
    }
}

// Função para criar um novo usuário
async function createUser(user: User): Promise<User> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.post('/users/create', user, config); // Faz a requisição para criar um novo usuário
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error.response.data); // Loga o erro da resposta
        throw error; // Lança o erro
    }
}

// Função para atualizar um usuário existente
async function updateUser(user: User): Promise<User> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = user._id; // Obtém o ID do usuário
        const response = await dataBase.put(`/users/update/${id}`, user, config); // Faz a requisição para atualizar o usuário
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para deletar um usuário
async function deleteUser(user: User): Promise<User> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = user._id; // Obtém o ID do usuário
        const response = await dataBase.delete(`/users/delete/${id}`, config); // Faz a requisição para deletar o usuário
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error.response.data); // Loga o erro da resposta
        throw error; // Lança o erro
    }
}

// Função para obter todos os clientes
async function getAllClients(): Promise<Client[]> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get('/users/list/client/all', config); // Faz a requisição para obter todos os clientes
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('getAllClients deu erro: ', error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um cliente pelo ID
async function getClientById(id: string): Promise<Client> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/users/list/client/${id}`, config); // Faz a requisição para obter o cliente pelo ID
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um cliente pelo nome
async function getClientByName(name: string): Promise<Client> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/users/list/client/name?name=${name}`, config); // Faz a requisição para obter o cliente pelo nome
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um cliente pelo telefone
async function getClientByPhone(phone: Number): Promise<Client> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/users/list/client/phone?phone=${phone}`, config); // Faz a requisição para obter o cliente pelo telefone
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para atualizar um cliente existente
async function updateClient(data: Client): Promise<Client> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do cliente
        const response = await dataBase.put(`/clients/update/${id}`, data, config); // Faz a requisição para atualizar o cliente
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para criar um novo cliente
async function createClient(data: Client): Promise<Client> {
    try {
        const response = await dataBase.post('/users/create/client', data); // Faz a requisição para criar um novo cliente
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('CreateClient deu erro: ', error); // Loga o erro
        throw new Error('Erro ao criar cliente'); // Lança um erro customizado
    }
}

// Função para deletar um cliente
async function deleteClient(data: Client): Promise<Client> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do cliente
        const response = await dataBase.delete(`/users/delete/client/${id}`, config); // Faz a requisição para deletar o cliente
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter todos os serviços
async function getAllServices(): Promise<Service[]> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get('/services/list/all', config); // Faz a requisição para obter todos os serviços
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('getAllServices deu erro: ', error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um serviço pelo ID
async function getServiceById(id: string): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/services/list/${id}`, config); // Faz a requisição para obter o serviço pelo ID
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um serviço pelo nome
async function getServiceByName(name: string): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/services/list/name?name=${name}`, config); // Faz a requisição para obter o serviço pelo nome
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um serviço pelo status
async function getServiceByPhone(status: Number): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/services/list/status?status=${status}`, config); // Faz a requisição para obter o serviço pelo status
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para atualizar um serviço existente
async function updateService(data: Service): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do serviço
        const response = await dataBase.put(`/services/update/${id}`, data, config); // Faz a requisição para atualizar o serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para criar um novo serviço
async function createService(data: Service): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.post('/services/create', data, config); // Faz a requisição para criar um novo serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para deletar um serviço
async function deleteService(data: Service): Promise<Service> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do serviço
        const response = await dataBase.delete(`/services/delete/${id}`, config); // Faz a requisição para deletar o serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter todos os tipos de serviço
async function getAllTypesOfService(): Promise<typesOfService[]> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get('/typeOfService/list/all', config); // Faz a requisição para obter todos os tipos de serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('getAllTypesOfService deu erro: ', error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um tipo de serviço pelo ID
async function getTypeOfServiceById(id: string): Promise<typesOfService> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/typeOfService/list/${id}`, config); // Faz a requisição para obter o tipo de serviço pelo ID
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter um tipo de serviço pelo nome
async function getTypeOfServiceByName(name: string): Promise<typesOfService> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/typeOfService/list/name?name=${name}`, config); // Faz a requisição para obter o tipo de serviço pelo nome
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para atualizar um tipo de serviço existente
async function updateTypeOfService(data: typesOfService): Promise<typesOfService> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do tipo de serviço
        const response = await dataBase.put(`/typeOfService/update/${id}`, data, config); // Faz a requisição para atualizar o tipo de serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para criar um novo tipo de serviço
async function createTypeOfService(data: typesOfService): Promise<typesOfService> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.post('/typeOfService/create', data, config); // Faz a requisição para criar um novo tipo de serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para deletar um tipo de serviço
async function deleteTypeOfService(data: typesOfService): Promise<typesOfService> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID do tipo de serviço
        const response = await dataBase.delete(`/typeOfService/delete/${id}`, config); // Faz a requisição para deletar o tipo de serviço
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter todas as horas
async function getAllHours(): Promise<hour[]> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get('/hour/list/all', config); // Faz a requisição para obter todas as horas
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log('getAllHours deu erro: ', error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter uma hora pelo ID
async function getHourById(id: string): Promise<hour> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/hour/list/${id}`, config); // Faz a requisição para obter a hora pelo ID
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para obter uma hora pelo dia
async function getHourByDay(day: string): Promise<hour> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.get(`/hour/list/day?day=${day}`, config); // Faz a requisição para obter a hora pelo dia
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para atualizar uma hora existente
async function updateHour(data: hour): Promise<hour> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID da hora
        const response = await dataBase.put(`/hour/update/${id}`, data, config); // Faz a requisição para atualizar a hora
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para criar uma nova hora
async function createHour(data: hourCreate): Promise<hourCreate> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const response = await dataBase.post('/hour/create', data, config); // Faz a requisição para criar uma nova hora
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Função para deletar uma hora
async function deleteHour(data: hour): Promise<hour> {
    try {
        const token = await getToken(); // Obtém o token
        const config = {
            headers: {
                Authorization: `Bearer ${token?.split('"').join('')}`, // Configura o cabeçalho de autorização
            },
        };
        const id = data._id; // Obtém o ID da hora
        const response = await dataBase.delete(`/hour/delete/${id}`, config); // Faz a requisição para deletar a hora
        return response.data; // Retorna os dados da resposta
    } catch (error: any) {
        console.log(error); // Loga o erro
        throw error; // Lança o erro
    }
}

// Exporta todas as funções para serem utilizadas em outros módulos
export {
    loginUser,
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
    updateUser,
    deleteUser,
    getAllClients,
    getClientById,
    getClientByName,
    getClientByPhone,
    updateClient,
    createClient,
    deleteClient,
    getAllServices,
    getServiceById,
    getServiceByName,
    getServiceByPhone,
    updateService,
    createService,
    deleteService,
    getAllTypesOfService,
    getTypeOfServiceById,
    getTypeOfServiceByName,
    updateTypeOfService,
    createTypeOfService,
    deleteTypeOfService,
    getAllHours,
    getHourById,
    getHourByDay,
    updateHour,
    createHour,
    deleteHour
}