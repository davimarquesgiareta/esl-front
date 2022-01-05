import api from '../api';
import history from '../history';
import React, { useState } from 'react';

export default function Register() {
 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [flagEmptyFields, setFlagEmptyFields] = useState(false)
  const [flagConfirmPassword, setFlagConfirmPassword] = useState(false)

  async function submit (){

    if (name === '' || email === '' || password === ''){
      setFlagEmptyFields(true)
    }

    if (password !== confirmPassword){
      setFlagConfirmPassword(true)
    }

    if (password === confirmPassword && password!== '' && email !== '' && name !== ''){
    
      const response = await api.post("/auth/register", {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmPassword 
      }); 

      history.push('/login');
      alert("Usuário criado com  Sucesso!");

    }
  }

  return (
  <>
    <div class="container">
      <h3>Cadastro de Usuários</h3>
    </div>
    <div class="container mt-3 rounded-left" style={{background:"#F8F8FF"}} >
      <div class="form-group" >
        <label for="exampleInputEmail1" ><h4>Nome</h4></label>
        <input type="text" class="form-control"  name="name" aria-describedby="emailHelp" placeholder="Digite seu Nome" onChange={e => setName(e.target.value)}/>
      </div>
      <div class="form-group" >
        <label for="exampleInputEmail1" ><h4>E-mail</h4></label>
        <input type="email" class="form-control"  name="email" aria-describedby="emailHelp" placeholder="Digite seu e-mail" onChange={e => setEmail(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1"><h4>Senha</h4></label>
        <input type="password" class="form-control" name="password" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1"><h4>Confirmar Senha</h4></label>
        <input type="password" class="form-control" name="confirmPassword" placeholder="Digite sua senha" onChange={e => setConfirmPassword(e.target.value)}/>
      </div>
      {
        flagEmptyFields && (
          <div>
            <span  class="badge bg-danger text-white">Preencha todos os campos!</span>
          </div>)
      }
      {
        flagConfirmPassword && (
          <div>
            <span  class="badge bg-warning text-dark">Senha e Confirmar Senha devem ser iguais!</span>
          </div>
        )
      }
      <div class="d-flex justify-content-end align-items-center mb-3">
        <a style={{color:"blue", cursor:"pointer"}} onClick={()=> history.push('/login')} for="exampleInputPassword1" class="mr-3 ">Voltar</a>
      <button type="button" class="btn btn-primary w-25" onClick={()=> submit()}>Criar Conta</button>
      </div>
    </div>    
  </>  
  )
}