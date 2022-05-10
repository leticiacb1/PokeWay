import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState } from "react";
import axios from 'axios';
import './loginRegister.css';

import pikachu from "./pikachu.gif";
import logo from "../../logo.png";


// Senha sempre válida: 
// user: teste , senha: 12345

function LoginOrRegister(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    
    function handleUpdate(event){
        event.preventDefault();
        
        if(location.pathname == '/login'){

            // Realizando um post para verificação da existencia ou nao do usuario
            axios({
                method:'post',
                url:"http://localhost:8000/users/login", 
                data:{
                  "name": user,
                  "password": password
                },}).then(
                    (resposta) => {
                        if(resposta.status == 200){
                            navigate('/home');
                        } 
                    }, () => {
                        alert("Usuario e/ou senha incorretos!");
                        navigate('/login');
            });
            
        }else{

            // cadastrando um novo usuario:
            axios({
                method:'post',
                url:"http://localhost:8000/users/register", 
                data:{
                  "name": user,
                  "password": password
                },}).then(
                    (resposta) => {
                        if(resposta.status == 200){
                            navigate('/login');
                        } 
                    }, () => {
                        alert("Usuário ja cadastrado!");
                        navigate('/register');
            });

        }

    }

    return (
        <div className="screen">
            <img className="logo" src={logo} alt="logo PokeWay"/> 
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            
            <div className="backScreenLogin">
                <div className="login">

                    {location.pathname == '/login' ? <h2 className="typeCount">Login to your account</h2> : <h2 className="typeCount" >Create account</h2>}
                    
                    <form className="formLogin" onSubmit={(event)=>{handleUpdate(event)}} >
                        <div class="input-parent">
                            {location.pathname == '/login' ? <label>Username</label> : <label>Create username</label>}
                            <input type="text" id="username" onChange={(name) => setUser(name.target.value)}/>
                        </div>

                        <div class="input-parent">
                            {location.pathname == '/login' ? <label>Password</label> : <label>Create password</label>}
                            <input type="password" id="password" onChange={(senha) => setPassword(senha.target.value)}/>
                        </div>

                        {location.pathname == '/login' ? 
                        <button type="submit" onClick={()=>{}} className="btn_loginRegister">Login</button> : <button className="btn_loginRegister" type="submit" onClick={()=>{}}>Create</button>
                        }
                    </form>

                    {location.pathname == '/login' ? 
                        <span className="containerNewAccount"><Link to = '/register' className="newAccount"> Create an account </Link></span> : <span></span>
                    }

                </div>
            </div>

            <div id="pikachu">
                <img src={pikachu} alt="running pikachu" className="img_pikachu" />
            </div>
        </div>
    );
}

export default LoginOrRegister;