import { Link, useNavigate , useLocation } from "react-router-dom";
import  React , { useState, useEffect } from "react";
import axios from 'axios';

import './loginRegister.css';

import pikachu from "./pikachu.gif";
import Background from "../AnimatedBackground/backgroung.js";


// Senha sempre válida: 
// user: teste , senha: 12345

function LoginOrRegister(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    async function getMessage(){
        let username = 'lorrancml';
        let response = await axios.get(`https://enigmatic-bayou-56424.herokuapp.com/${username}/token`);
        console.log("O token é: "+ response.data.token);
        let token = response.data.token;
        console.log("Agora, vamos pegar a mensagem");

        axios({
            method:'post',
            url:`https://enigmatic-bayou-56424.herokuapp.com/${username}/message`, 
            data:{
              "token": token
            },}).then(
                (resposta) => {
                    console.log("A mensagem é:");
                    console.log(resposta.data.mensagem);
                    setMessage(resposta.data.mensagem);
                    } 
        );
    }
    
    useEffect(()=>{
        console.log("Primeiro pegamos o token:");
        getMessage();
    },[]);

    
    function handleUpdate(event){
        event.preventDefault();
        
        if(location.pathname == '/'){

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
                            console.log("entrou aqui");

                            // Realizando um get para verificação da existencia ou nao de pokemon inicial 
                            axios({
                                method:'get',
                                url:"http://localhost:8000/users/"+user + "/", 
                            }).then(
                                    (resposta) => {
                                         if(resposta.data.selectedFirtsPokemon == false){
                                             console.log("Não tem pokemon inicial");
                                             navigate('/home', {state:{username:user, password:password}});
                                         } 
                                        
                                        else{
                                            console.log(resposta.data);
                                            navigate('/menu', {state:{username:user}});
                                    }
                            });
                        }


                            // navigate('/home', {state:{username:user}});
                        } 
                    , () => {
                        alert("Usuario e/ou senha incorretos!");
                        navigate('/');
            });
            
        }else{

            // cadastrando um novo usuario:
            axios({
                method:'post',
                url:"http://localhost:8000/users/register", 
                data:{
                  "name": user,
                  "password": password,
                  "selectedFirtsPokemon": false
                },}).then(
                    (resposta) => {
                        if(resposta.status == 200){
                            navigate('/');
                        } 
                    }, () => {
                        alert("Usuário ja cadastrado!");
                        navigate('/register');
            });

        }



    }


    useEffect(()=>{
        document.getElementById('musicTheme').play();
        console.log("dei o playyyyy. Tá tocando?");
        
        
    }, [])

    return (
        <>
            
            <Background></Background>

            <div className="backScreenLogin">
                <div className="login">
                    <h5 className="msg">{message}</h5>

                    {location.pathname == '/' ? <h2 className="typeCount">Login to your account</h2> : <h2 className="typeCount" >Create account</h2>}
                    
                    <form className="formLogin" onSubmit={(event)=>{handleUpdate(event)}} >
                        <div class="input-parent">
                            {location.pathname == '/' ? <label>Username</label> : <label>Create username</label>}
                            <input type="text" id="username" onChange={(name) => setUser(name.target.value)}/>
                        </div>

                        <div class="input-parent">
                            {location.pathname == '/' ? <label>Password</label> : <label>Create password</label>}
                            <input type="password" id="password" onChange={(senha) => setPassword(senha.target.value)}/>
                        </div>

                        {location.pathname == '/' ? 
                        <button type="submit" className="btn_loginRegister">Login</button> : <button className="btn_loginRegister" type="submit" onClick={()=>{}}>Create</button>
                        }
                    </form>

                    {location.pathname == '/' ? 
                        <span className="containerNewAccount"><Link to = '/register' className="newAccount"> Create an account </Link></span> : <span></span>
                    }

                </div>
            </div>

            <div id="pikachu">
                <img src={pikachu} alt="running pikachu" className="img_pikachu" />
            </div>
        </>
               
            
    );
}

export default LoginOrRegister;