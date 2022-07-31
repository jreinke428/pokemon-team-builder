import { deprecatedPropType, TextField, Autocomplete, createFilterOptions } from '@mui/material';
import { useState,useEffect } from 'react';

const pokemon = require('pokemon');

export default function Search(props){

    const [fetchPokemonTeamData, setFetchPokemonTeamData] = useState(false);

     var handleInputChange = (v) => {
        if(v.length <= 6){
            props.setInputPokemonTeam(v);
            setFetchPokemonTeamData(true);
        }
     };

     useEffect(() => {
        if(fetchPokemonTeamData){
            props.setPokemonTeamData([]);
            for(var p of props.inputPokemonTeam){
                if(p.includes("♀")) p = "nidoran-f";
                if(p.includes("♂")) p = "nidoran-m";
                if(p === "Mr. Mime") p = "mr-mime";
                if(p === "Mr. Rime") p = "mr-rime";
                if(p === "Mime Jr.") p = "mime-jr";
                fetch("https://pokeapi.co/api/v2/pokemon/" + p.toLowerCase())
                .then((res) => {
                    return res.json();
                })
                .then((resJson) => {
                    props.setPokemonTeamData(old => [...old, resJson]);
                });
            }
            setFetchPokemonTeamData(false);
        }
     }, [fetchPokemonTeamData]);

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <Autocomplete
                multiple
                autoHighlight
                id="pokemonTeam"
                value={props.inputPokemonTeam}
                options={pokemon.all()}
                sx={{width: '50%', m: 5}}
                filterOptions={createFilterOptions({matchFrom: 'start'})}
                onChange = {(e, v) => {handleInputChange(v)}}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Pokemon Team" />}
            />
        </div>
    );
};