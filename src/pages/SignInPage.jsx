import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import Auth from "../services/apiAuth"
import { UserContext } from "../contexts/userContext"


export default function SignInPage() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)

  // function para fazer login
  function HeadLogin(e){
  e.preventDefault()
  const body = {email, password}
  Auth.signIn(body)
  .then(res => {
    const {token, name} = res.data
    localStorage.setItem("user",JSON.stringify({token, name}))
    setUser(JSON.parse(localStorage.getItem("user")))
    navigate("/home")
  }
  )
  .catch(err => console.log(err.response.data))
  }

  // layout da page login
  return (
    <SingInContainer>
      <form onSubmit={HeadLogin}>
        <MyWalletLogo />
        <input
        data-test="email"
        placeholder="E-mail" 
        type="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        data-test="password"
        placeholder="Senha" 
        type="password" 
        autoComplete="new-password" 
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        
        <button data-test="sign-in-submit" >Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
 
