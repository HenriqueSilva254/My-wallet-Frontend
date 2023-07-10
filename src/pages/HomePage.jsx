import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/userContext"
import Bank from "../services/apiTransactions"
import { useNavigate } from "react-router-dom"

// henri254@gmail.com
export default function HomePage() {
  const { user, setUser } = useContext(UserContext)
  const [transactions, setTransactions] = useState([])
  const [value, setValue] = useState(0)
  const navigate = useNavigate()

  function logout(){
    localStorage.clear()
    setUser()
    navigate("/")
  }

  useEffect(() => {
    if(!user){
      alert("Faça login")
      navigate("/")
    }else{
      Bank.getTransactions(user.token)
      .then(res => {
        setTransactions(res.data)
        let soma = 0
        res.data.forEach(e => {
          
          if(e.info === "entrance"){
            
            soma = soma + Number(e.value) 
          }else{
            soma = soma - Number(e.value)
          }
          console.log(soma)
        })
        const resultado = soma
        setValue(resultado)
        
      })
      .catch(err => {
       console.log(err.response.data)
      })
    }
    
  } ,[])
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {!user? '':`${user.name}`}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>

        <ul>
          {transactions.map(t => (
            <ListItemContainer>
              <div>
                <span>{t.time}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={t.info === "entrance"? 'positivo' : 'negativo'}>{Number(t.value).toFixed(2)}</Value>
            </ListItemContainer>
          ))}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={value >= 0? "positivo":"negativo"}>{Math.abs(Number(value)).toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => {navigate('/nova-transacao/entrada')}}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => {navigate('/nova-transacao/saida')} }>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`