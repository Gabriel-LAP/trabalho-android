import { useState } from "react";
import { deleteHour, getAllHours, updateHour } from "@/services/userServices";
import { hour } from "@/types/HourType";

const useHour = () => {
    const [hourList, setHourList] = useState<hour[]>([]);

    const handleHour = async () => {
        
        
        try {
            const hours = await getAllHours();
            // console.log(hours);
            setHourList(hours); 
            // console.log('-----hourlist',hourList);
        } catch (error: any) {
            console.log('---handleHoour Deu Erro handleHoour--- ',error);
            throw error;
        }
    };

    const handleUpdateHour = async (hour: hour) => {
        const resp = await updateHour(hour);
        console.log(resp)

        return resp
    }

    const handleDeleteHour = async (hour: hour) => {
        const resp = await deleteHour(hour);
        console.log(resp)
    }

    return { hourList, handleHour, handleUpdateHour, handleDeleteHour };
};

export { useHour };