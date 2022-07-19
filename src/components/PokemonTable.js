import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PokemonTable(props){
    
    var pokemonTypes = require('../json/pokemonTypes.json');

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <Table sx={{width: "75%"}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{py: 0.5, width:"12.5%"}}></TableCell>
                        {props.pokemonTeamData.map((pokemon, i) => {
                            return(
                                <TableCell sx={{p: 0, width:"12.5%"}} key={i}>
                                    <img style={{maxWidth: '100%'}} src={pokemon.sprites.front_default}/>
                                </TableCell>
                            );
                        })}
                        {Array.from({length: 6-props.pokemonTeamData.length}, (v, i) => {
                            return <TableCell sx={{p: 0, width:"12.5%"}} key={i}></TableCell>
                        })}
                        <TableCell sx={{py: 0.5, width:"12.5%"}}>Team Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemonTypes.map((t, i) => {
                        return(
                        <TableRow sx={{backgroundColor: (i%2 ? "white" : "whitesmoke")}}>
                            <TableCell sx={{py: 0.5, color: "whitesmoke",backgroundColor: t.color, borderRadius: 3}}>
                                {t.name}
                            </TableCell>
                            {Array.from({length: 7}, (v, i) => {
                                return <TableCell sx={{py: 0.5, width:"12.5%"}} key={i}></TableCell>
                            })}
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};