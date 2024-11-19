import { Client } from './../types/ClientType';
import { useState } from "react";
import { deleteClient, getAllClients, getClientById, updateClient } from "@/services/userServices"
import AsyncStorage from '@react-native-async-storage/async-storage';

const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client>();

    const [clientStorage, setClientStorage] = useState<Client>();
     

    const handleClients = async () => {
        await getAllClients() 
            .then((client) => {
                setClients(client);
            })
            .catch((error: any) => {
                console.log(error);
                throw error;
            })
    }

    const handleGetClientyId = async (id: string) => {
        await getClientById(id) 
            .then((client) => {
                setSelectedClient(client);
                // console.log(selectedClient);
            })
            .catch((error: any) => {
                console.log('---handleGetClientyId',error);
                throw error;
            })
    }
    
    const handleUpdateClient = async (client: Client) => {
        const resp = await updateClient(client);
        console.log(resp)

        return resp
    }

    const handleDeleteClient = async (client: Client) => {
        const resp = await deleteClient(client);
        console.log(resp)
    }

    return {
        clients,
        setClients,
        selectedClient,
        setSelectedClient,
        handleClients,
        handleUpdateClient,
        handleDeleteClient,
        handleGetClientyId,
        clientStorage,
        setClientStorage
    }
}

export { useClients };