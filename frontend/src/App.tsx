import { useState } from 'react';
import './App.scss'

import Select from './components/Select';
import Sprite from './components/Sprite';

function App() {
  const [pokemonName, setPokemonName] = useState("pikachu")

  return (
    <div className="App">
      <div className="container">
        <Select className="search" selected={setPokemonName}/>
        <Sprite pokemonName={pokemonName}/>
      </div>
    </div>
  );
}

export default App;
