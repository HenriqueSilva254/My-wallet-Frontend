import axios from "axios";

const URL_BASE = "http://localhost:5000"
function createConfig(token){
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        } 
    }
    return config
}
function getTransactions(token){
   
    const promisse = axios.get(`${URL_BASE}/transactions`, createConfig(token))
    return promisse
}
function postTransactions(token, dados){

    const body = {
        value: dados.value,
        description: dados.description
    }
    const promisse = axios.post(`${URL_BASE}/nova-transacao/${dados.params}`, body, createConfig(token))
    return promisse
}
const Bank = {getTransactions, postTransactions}
export default Bank