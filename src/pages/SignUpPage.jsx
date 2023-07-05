import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input 
        placeholder="Nome" 
        type="text" 
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        placeholder="E-mail" 
        type="email" 
        required
        value={email}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password" 
        required
        value={password}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        placeholder="Confirme a senha" 
        type="password" 
        autocomplete="new-password" 
        required
        value={passwordConfirm}
        onChange={(e) => setName(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <Link>
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
