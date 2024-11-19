import { typesOfService } from './../types/TypesOfServiceType';
import { useState } from "react";
import { getAllTypesOfService } from "@/services/userServices";


const useTypeOfService = () => {
    const [typesOfServiceList, setTypesOfServiceList] = useState<typesOfService[]>([]);

    const handleTypeOfService = async () => {
        try {
            const typesOfService = await getAllTypesOfService();
            // console.log('-----handleTypeOfService',typesOfService);
            setTypesOfServiceList(typesOfService); 
            // console.log('-----typeofsevicelist',typesOfServiceList);
        } catch (error: any) {
            console.log('---handleService Deu Erro handleService--- ',error);
            throw error;
        }
    };

    return { typesOfServiceList, handleTypeOfService };
};

export { useTypeOfService };