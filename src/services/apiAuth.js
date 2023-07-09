import axios from "axios";

const URL_BASE = "http://localhost:5000/"

function signUp(body){
    const promisse = axios.post(`${URL_BASE}sign-up`, body)
    return promisse
}
function signIn(body){
    const promisse = axios.post(`${URL_BASE}sign-in`, body)
    return promisse 
}
const Auth = {signIn, signUp}
export default Auth