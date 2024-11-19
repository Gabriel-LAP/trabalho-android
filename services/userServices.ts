import { Login } from '@/types/LoginType';
import {User} from '@/types/UserType'
import dataBase from './dataBase'
import { Client } from '@/types/ClientType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service } from '@/types/ServiceType';
import { typesOfService } from '@/types/TypesOfServiceType';
import { hour, hourCreate } from '@/types/HourType';

// const token = AsyncStorage.getItem('token') 
// console.log(token)

// const config = {
//     headers: { Authorization: `Bearer ${token}` }
// };

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // console.log('token:', token);
      return token;
    } catch (error) {
      console.log('Erro ao pegar token:', error);
      return null;
    }
  };
  
  export default getToken;

async function loginUser(data: Login) {
    try {
        // console.log('Dados enviados para login:', data);
        const response = await dataBase.post('/users/login', data)
        // console.log('Resposta da API:', response.data.user);
        return response.data;
    } catch (error: any) {
        console.log('Dados enviados para login:', data);
        console.log('Erro ao fazer login:', error );
        throw error;
    }
}

async function getAllUsers(): Promise<User[]> { 
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const tk = await getToken()
        const response = await dataBase.get('/users/list/all', config)
        return response.data

    } catch (error: any) {
               console.log(error.response.data)

        throw error
    }
    
}

async function getUserById(id: string): Promise<User> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/users/list/${id}`, config)
        // console.log(response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error.response.data)

        throw error
    }
}

async function getUserByName(name:string): Promise<User> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/users/list/name?name=${name}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error.response.data)

        throw error
    }
    
}

async function createUser(user: User): Promise<User> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.post('/users/create', user, config)
        // console.log(response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error.response.data) 
               throw error
               
    }
}

async function updateUser(user: User): Promise<User> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const id = user._id
        const response = await dataBase.put(`/users/update/${id}`, user, config)
        console.log(response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error) 
               throw error
               
    }
}

async function deleteUser(user: User): Promise<User> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const id = user._id
        const response = await dataBase.delete(`/users/delete/${id}`, config)
        // console.log(response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error.response.data) 
               throw error
               
    }
}


async function getAllClients():Promise<Client[]> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get('/users/list/client/all', config)
        return response.data
        
    } catch (error: any) {
        console.log('getAllClients deu erro: ',error)
        throw error
    }
    
}

async function getClientById(id:string): Promise<Client> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/users/list/client/${id}`, config)
        return response.data
        
    } catch (error: any) {
                console.log(error)

        throw error
    }
    
}

async function getClientByName(name:string): Promise<Client> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/users/list/client/name?name=${name}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function getClientByPhone(phone:Number): Promise<Client> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/users/list/client/phone?phone=${phone}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function updateClient(data: Client): Promise<Client> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('updateClient log:', data)
        const id = data._id
        const response = await dataBase.put(`/clients/update/${id}`,data, config)
        console.log('updateClient log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function createClient(data: Client): Promise<Client> {
    try {
        
        // console.log('createClient log:', data)
        const response = await dataBase.post('/users/create/client',data)
        console.log('createClient log:', response.data)
        
        return response.data
        
    } catch (error: any) {
               console.log('CreateClient deu erro: ',error)

               throw new Error('Erro ao criar cliente');
    }
    
}

async function deleteClient(data: Client): Promise<Client> {
    
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        console.log('deleteClient log:', data)
        const id = data._id
        const response = await dataBase.delete(`/users/delete/client/${id}`, config)
        console.log('deleteClient log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}


async function getAllServices():Promise<Service[]> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('getAllServices log:', config);
        const response = await dataBase.get('/services/list/all', config)
        return response.data
        
    } catch (error: any) {
        console.log('getAllServices deu erro: ',error)
        throw error
    }
    
}

async function getServiceById(id:string): Promise<Service> {
    try {
      const token = await getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token?.split('"').join('')}`,
        },
      };
        const response = await dataBase.get(`/services/list/${id}`, config)
        return response.data
        
    } catch (error: any) {
                console.log(error)

        throw error
    }
    
}

async function getServiceByName(name:string): Promise<Service> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/services/list/name?name=${name}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function getServiceByPhone(status:Number): Promise<Service> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/services/list/status?status=${status}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function updateService(data: Service): Promise<Service> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('updateClient log:', data)
        const id = data._id
        const response = await dataBase.put(`/services/update/${id}`,data, config)
        // console.log('updateService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function createService(data: Service): Promise<Service> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('createClient log:', data)
        const response = await dataBase.post('/services/create',data, config)
        // console.log('createService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function deleteService(data: Service): Promise<Service> {
    
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        console.log('deleteClient log:', data)
        const id = data._id
        const response = await dataBase.delete(`/services/delete/${id}`, config)
        console.log('deleteService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function getAllTypesOfService():Promise<typesOfService[]> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get('/typeOfService/list/all', config)
        return response.data
        
    } catch (error: any) {
        console.log('getAllTypesOfService deu erro: ',error)
        throw error
    }
    
}

async function getTypeOfServiceById(id:string): Promise<typesOfService> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/typeOfService/list/${id}`, config)
        return response.data
        
    } catch (error: any) {
                console.log(error)

        throw error
    }
    
}

async function getTypeOfServiceByName(name:string): Promise<typesOfService> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/typeOfService/list/name?name=${name}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function updateTypeOfService(data: typesOfService): Promise<typesOfService> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('updateClient log:', data)
        const id = data._id
        const response = await dataBase.put(`/typeOfService/update/${id}`,data, config)
        console.log('updateTypeOfService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function createTypeOfService(data: typesOfService): Promise<typesOfService> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('createClient log:', data)
        const response = await dataBase.post('/typeOfService/create',data, config)
        console.log('createTypeOfService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function deleteTypeOfService(data: typesOfService): Promise<typesOfService> {
    
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        console.log('deleteClient log:', data)
        const id = data._id
        const response = await dataBase.delete(`/typeOfService/delete/${id}`, config)
        console.log('deleteService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function getAllHours():Promise<hour[]> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get('/hour/list/all', config)
        return response.data
        
    } catch (error: any) {
        console.log('getAllHours deu erro: ',error)
        throw error
    }
    
}

async function getHourById(id:string): Promise<hour> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/hour/list/${id}`, config)
        return response.data
        
    } catch (error: any) {
                console.log(error)

        throw error
    }
    
}

async function getHourByDay(day:string): Promise<hour> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        const response = await dataBase.get(`/hour/list/day?day=${day}`, config)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function updateHour(data: hour): Promise<hour> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        // console.log('updateClient log:', data)
        const id = data._id
        const response = await dataBase.put(`/hour/update/${id}`,data, config)
        console.log('updateService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}

async function createHour(data: hourCreate): Promise<hourCreate> {
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        console.log('createHour log:', data)
        const response = await dataBase.post('/hour/create',data, config)
        console.log('createService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
    
}

async function deleteHour(data: hour): Promise<hour> {
    
    try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token?.split('"').join('')}`,
          },
        };
        console.log('deleteClient log:', data)
        const id = data._id
        const response = await dataBase.delete(`/hour/delete/${id}`, config)
        console.log('deleteService log:', response.data)
        return response.data
        
    } catch (error: any) {
               console.log(error)

        throw error
    }
}


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