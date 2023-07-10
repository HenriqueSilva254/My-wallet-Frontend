import { useContext, useState } from "react"
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
  console.log(tipo)
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
    .catch(err => console.log(err.response.data))
  }
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction}>
        <input 
        placeholder="Valor" 
        type="number"
        onChange={(e) => setValue(e.target.value)}/>
        <input 
        placeholder="Descrição" 
        type="text"
        onChange={(e) => setDescription(e.target.value)} />
        <button>Salvar TRANSAÇÃO</button>
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
