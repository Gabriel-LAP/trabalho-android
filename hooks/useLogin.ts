import { loginUser } from "@/services/userServices";
import { Login } from "@/types/LoginType";
import { Href, Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLoginHook = async(data: Login) =>{
    try{
        // const test = await AsyncStorage.getAllKeys()
        //     console.log('test--------',test);
            // console.log(data);
            const resp = await loginUser(data);
            // console.log(resp)
            const token = resp.token;
            const user = resp.userOrClient;
            // console.log(user);
            // setUser(suser);
           
            const path = user.type === 'cliente' ? '/(tabbs)/dashboard' : user.type === 'funcionario' ? '/(tabbs)/dashboardEmploee' : user.type === 'gestor' ? '/(tabbs)/dashboardAdm' : '';
            // console.log(path);

            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('user', JSON.stringify(user)); 
            const testUser = await AsyncStorage.getItem('user');
            const usetTest = JSON.parse(testUser as string);
            // console.log(usetTest);
            
            // console.log('token llog:', token);
            // console.log('use login:', user);
            

            return (router.replace(path as Href<string | object>), usetTest)

        }catch(err){
            console.error(err);   
        }
        
};

export default useLoginHook;

