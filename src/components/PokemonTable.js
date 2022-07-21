import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PokemonTable(props){
    
    var pokemonTypes = require('../json/pokemonTypes.json');

    const [tableCells, setTableCells] = useState(new Array(18).fill(new Array(7).fill('')));

    const updateTableCell = (row, col ,e) => {
        let newTableCells = [];
        tableCells.forEach((r) => {
            let newRow = [];
            r.forEach((c) => {
                newRow.push(c);
            });
            newTableCells.push(newRow);
        });
        newTableCells[row][col] = e;
        setTableCells(newTableCells);
    };

    useEffect(() => {
        props.pokemonTeamData.forEach((p, pIndex) => {
            p.types.forEach((t) => {
                fetch('https://pokeapi.co/api/v2/type/'+t.type.name)
                .then(res => res.json())
                .then(type1 => {
                    console.log(type1.damage_relations.no_damage_from);
                    pokemonTypes.forEach((type2, tIndex) => {
                        if(type1.damage_relations.no_damage_from.filter((ty) => ty.name === type2.name.toLowerCase()).length > 0){
                            updateTableCell(tIndex,pIndex,'X');
                        }
                    });
                });
            })
        });
    }, [props.pokemonTeamData]);

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <Table sx={{width: "75%", border: 'whitesmoke'}}>
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
                        <TableRow sx={{backgroundColor: (i%2 ? "white" : "whitesmoke")}} key={i}>
                            <TableCell sx={{py: 0.5, color: "whitesmoke",backgroundColor: t.color, borderRadius: 3}}>
                                {t.name}
                            </TableCell>
                            {Array.from({length: 7}, (v, j) => {
                                return <TableCell sx={{py: 0.5, width:"12.5%"}} key={j}>{tableCells[i][j]}</TableCell>
                            })}
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};