import { useState } from 'react';
import './App.scss'

import PokeSearch from './resources/PokeSearch.png'

import Select from './components/Select';
import Sprite from './components/Sprite';
import Abilities from './components/Abilities';

function App() {
  const [pokemonName, setPokemonName] = useState("pikachu")

  return (
    <div className="App">
      <img className="logo" src={PokeSearch} alt=""/>
      <div className="container">
        <Select className="search" selected={setPokemonName}/>
        <Sprite pokemonName={pokemonName}/>
        <Abilities pokemonName={pokemonName}/>
      </div>
    </div>
  );
}

export default App;
