import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import Auth from "../services/apiAuth"

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate()

  // function para fazer login
  function HeadSignUp(e){
  e.preventDefault()
  const body = {name, email, password}
  Auth.signUp(body)
  .then(res => {
    navigate("/")
    console.log(res)
  }
  )
  .catch(err => {
    alert(err.response.data)
    })

  }

  return (
    <SingUpContainer>
      <form onSubmit={HeadSignUp}>
        <MyWalletLogo />
        <input 
        data-test="name"
        placeholder="Nome" 
        type="text" 
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
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
        <input 
        data-test="conf-password"
        placeholder="Confirme a senha" 
        type="password" 
        autoComplete="new-password" 
        required
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
