// Importa a biblioteca axios, que é usada para fazer requisições HTTP
import axios from 'axios';

// Cria uma instância do axios com uma URL base específica
const dataBase = axios.create({ baseURL: 'http://192.168.1.4:3000' })

// Exporta a instância criada para que possa ser utilizada em outros arquivos
export default dataBase