import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../contexts/userContext"
import { useNavigate, useParams } from "react-router-dom"
import Bank from "../services/apiTransactions"


export default function TransactionsPage() {
  const [value, setValue] = useState()
  const [description, setDescription] = useState()
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const {tipo} = useParams()

  useEffect(() => {
    if(user === null) {
        navigate("/")
    }
  }, [])

  function newTransaction(e){
    e.preventDefault()
    const dados = {
      value,
      description,
      params: tipo
    }
    Bank.postTransactions(user.token, dados)
    .then(res => {
      navigate('/home')
    })
    .catch(err => alert("preencha todos os campos"))
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo === 'entrada'? "entrada":"saída"}</h1>
      <form onSubmit={newTransaction}>

        <input 
        data-test="registry-amount-input"
        placeholder="Valor" 
        type="number"
        min={0}
        step="0.01"
        required
        onChange={(e) => setValue(e.target.value)}/>
        
        <input 
        data-test="registry-name-input"
        placeholder="Descrição" 
        type="text"
        required
        onChange={(e) => setDescription(e.target.value)} />

        <button data-test="registry-save">Salvar TRANSAÇÃO</button>

      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
