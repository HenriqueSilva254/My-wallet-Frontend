import axios from "axios";


function createConfig(token){
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }
    return config
}
function getTransactions(token){
   
    const promisse = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, createConfig(token))
    return promisse
}
function postTransactions(token, dados){

    const body = {
        value: dados.value,
        description: dados.description
    }
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${dados.params}`, body, createConfig(token))
    return promisse
}
const Bank = {getTransactions, postTransactions}
export default Bank