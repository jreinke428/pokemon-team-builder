import { deprecatedPropType, TextField, Autocomplete, createFilterOptions } from '@mui/material';
import { useState,useEffect } from 'react';

const pokemon = require('pokemon');

export default function Search(){

    const [pokemonTeam, setPokemonTeam] = useState([]);

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <Autocomplete
                multiple
                autoSelect
                autoHighlight
                id="pokemonTeam"
                value={pokemonTeam}
                options={pokemon.all()}
                sx={{width: '50%', m: 5}}
                filterOptions={createFilterOptions({matchFrom: 'start'})}
                onChange = {(e, v) => {if(pokemonTeam.length < 6) setPokemonTeam(v)}}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Pokemon Team" />}
            />
        </div>
    );
};