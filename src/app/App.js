import pokemon from 'pokemon';
import { useEffect, useState } from 'react';

import Search from '../components/Search';
import './App.css';

function App() {

  const [inputPokemonTeam, setInputPokemonTeam] = useState([]);
  const [pokemonTeamData, setPokemonTeamData] = useState([]);

  return (
    <div>
      <Search 
        inputPokemonTeam={inputPokemonTeam}
        setInputPokemonTeam={setInputPokemonTeam}
        pokemonTeamData={pokemonTeamData}
        setPokemonTeamData={setPokemonTeamData}
      />
      <div  style={{display: 'flex', justifyContent: 'center'}}>
        {pokemonTeamData.map((pokemon, i) => {
          return <img src={pokemon.sprites.front_default} key={i}/>;
        })}
      </div>
    </div>
  );
}

export default App;
