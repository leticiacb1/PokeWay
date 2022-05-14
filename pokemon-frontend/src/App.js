import { BrowserRouter as Router , Route, Routes  } from "react-router-dom";
import './App.css';
import Sound from 'react-sound';

import LoginOrRegister from './components/LoginOrRegister/loginRegister.js'
import Home from './components/Home/home.js'
import Menu from './components/Menu/menu.js'
import Game from './components/Game/game.js';
import MyPokemons from "./components/MyPokemons/myPokemons";

import PokemonTheme from "./PokemonTheme.mp3";

function App() {
  return (
    
    <div className="App">
      <audio id="music" src={PokemonTheme} type="audio/mp3" loop={true}/>
      <Router>  
        <Routes >
          <Route exact path="/" element={<LoginOrRegister/>}/>
          <Route exact path="/register" element={<LoginOrRegister/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/menu" element={<Menu/>}/>
          <Route exact path="/game" element={<Game/>}/>
          <Route exact path="/pokemons" element={<MyPokemons/>}/>
        </Routes >
      </Router>
    </div>
  );
}

export default App;