import { useState } from "react";
import { getAllServices } from "@/services/userServices";
import { Service } from "@/types/ServiceType";

const useService = () => {
    const [serviceList, setServiceList] = useState<Service[]>([]);

    const priceFormate = (price: number) => {
        return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    };

    const handleService = async () => {
        try {
            const services = await getAllServices();
            // console.log(services);
            setServiceList(services); 
            // console.log(serviceList);
        } catch (error: any) {
            console.log('---handleService Deu Erro handleService--- ',error);
            throw error;
        }
    };

    return { serviceList, handleService, priceFormate };
};

export { useService };