import  React from "react";
import axios from 'axios';
import './menu.css' ;

import { useLocation, useNavigate} from "react-router-dom";
import Background from "../AnimatedBackground/backgroung.js";

import map1 from "../Menu/img/map1.png";
import map2 from "../Menu/img/map2.png";
import map3 from "../Menu/img/map3.png";
import ashPokemon from "../Menu/img/ashPokemon.gif"

function Menu(){

    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username

    function startGame(){

        let map;

        // Buscando qual checkbox foi selecionado
        if(document.getElementById('mapRadio1').checked) {
            map = 1;
        } else if (document.getElementById('mapRadio2').checked){
            map = 2;
        }else{
            map = 3;
        }

        navigate('/game', {state:{mapSelected:map, username:username}});
    }

    function goToPokeList(){
        navigate('/pokemons', {state:{username:username}})
    }

    function logOut(){
        let musica = document.getElementById('music');
        musica.pause();
        musica.currentTime = 0;
        console.log("dei o PAUSE. Tá tocando?");
        navigate('/');
    }

    return (
        <>  
            <Background></Background>

            <div className="backScreenMenu">
                <div className="container">

                    <div className="cardJogador">

                        <div className="infoPlayer">
                            <div className="avatar">
                                <img src={ashPokemon} alt="avatar" className="img_avatar"/>
                            </div>
                            <div className="infos">
                                <h2 className="user_name">{String(username)[0].toUpperCase() + String(username).substr(1)}</h2>  
                            </div>
                        </div>
                        
                        <div className="pokemons">
                            <button className="botaoPokemons" onClick={goToPokeList}>
                                See your Pokemons
                            </button>
                        </div>

                        <div className="botaoLogout">
                            <button className="botaoOut" onClick={logOut}>Log out</button>
                        </div>

                    </div>

                    <div className="cardGame">
                        
                        <div className="containerMaps">
                            <div className="headerGame">
                                <div className="contentHeaderGame">
                                    <h3 className="opMap">Choose a map for play</h3>
                                </div>  
                            </div>
                            
                            <div className="maps">
                                <div className="mapImg">
                                    <img src={map1} alt="map1" className="map1"></img>
                                    <input type="radio" id="mapRadio1" name="map1" value="dewey" checked></input>
                                </div>

                                <div className="mapImg">
                                    <img  src={map2} alt="map2" className="map2"></img>
                                    <input type="radio" id="mapRadio2" name="map1" value="dewey"></input>
                                </div>

                                <div className="mapImg">
                                    <img  src={map3} alt="map3" className="map3"></img>
                                    <input type="radio" id="mapRadio3" name="map1" value="dewey"></input>
                                </div>
                            </div>
                        </div>

                        <div className= "botaoPlay">
                            <button className="play" onClick={startGame}>Play</button>
                        </div>
                    </div>
                </div>     
            </div>
        </>            
    );
    
}

export default Menu;