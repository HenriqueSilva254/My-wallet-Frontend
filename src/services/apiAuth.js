import axios from "axios";



function signUp(body){
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}sign-up`, body)
    return promisse
}
function signIn(body){
    const promisse = axios.post(`${import.meta.env.VITE_API_URL}sign-in`, body)
    return promisse 
}

const Auth = {signIn, signUp}
export default Auth