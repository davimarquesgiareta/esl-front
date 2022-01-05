import React, { useContext, useState } from 'react';
import { Context } from '../Context/AuthContext';
import history from '../history';

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [flagEmptyFields, setFlagEmptyFields] = useState(false)
  const [flagUserExist, setFlagUserExist] = useState(false)

  const token = localStorage.getItem('token')

  function verifyFlag(){
    if (email === '' || password === ''){
      setFlagEmptyFields(true)
    }

    if (email !== '' && password !== ''){
      setFlagEmptyFields(false)
      const promise = handleLogin({email, password}) 
      promise.then(
        (result) => { 
           console.log(result);
        },
        (error) => { 
          setFlagUserExist(true)
           console.log(error);
        }
      ); 
    }
  }

  if (token){
    history.push('/schedules') 
  }
  
   return (
    <>
      <div class="container mt-3 rounded-left" style={{background:"#F8F8FF"}} >
        <div class="form-group" >
          <label for="exampleInputEmail1" ><h4>E-mail</h4></label>
          <input type="email" class="form-control"  name="email" aria-describedby="emailHelp" placeholder="Digite seu e-mail" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1"><h4>Password</h4></label>
          <input type="password" class="form-control" name="password" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/>
        </div>
        {
          flagEmptyFields && (
            <div>
              <span class="badge bg-danger text-white">Preencha todos os campos!</span>
            </div>
          )
        }
        {
          flagUserExist && (
            <div>
              <span class="badge bg-danger text-white">Usuário não cadastrado!</span>
            </div>
          )
        }
        <div class="d-flex justify-content-end align-items-center mb-3">
          <a style={{color:"blue", cursor:"pointer"}} onClick={()=> history.push('/register')} for="exampleInputPassword1" class="mr-3 ">Criar uma conta</a>
          <button type="button" class="btn btn-primary w-25" onClick={ ()=>verifyFlag()  }>Entrar</button>
        </div>
      </div>    
    </>
  )

}