import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

const tableCellDefaultSyle = {py: 0.5, width: "12.5%", borderRadius: 1, border: 'none', color: "whitesmoke", textAlign: 'center'};

export default function PokemonTable(props){
    
    var pokemonTypes = require('../json/pokemonTypes.json');

    const tableCellRefs = useRef(Array.from(Array(18), () => new Array(7)));
    const [tableCells, setTableCells] = useState(Array.from(Array(18), () => Array.from(new Array(7), () => '')));
    const [getTeamTotals, setGetTeamTotals] = useState(false);

    const clearTableCells = () => {
        for(let i=0;i<18;i++){
            for(let j=0;j<7;j++){
                tableCellRefs.current[i][j].style = tableCellDefaultSyle;
            }
        }
    }

    useEffect(() => {
        clearTableCells();
        let newTableCells = Array.from(Array(18), () => Array.from(new Array(7), () => ''));
        if(props.pokemonTeamData.length === 0) setTableCells(newTableCells);

        props.pokemonTeamData.forEach((p, pIndex) => {
            p.types.forEach((t) => {
                fetch('https://pokeapi.co/api/v2/type/'+t.type.name)
                .then(res => res.json())
                .then(type1 => {
                    pokemonTypes.forEach((type2, tIndex) => {
                        if(type1.damage_relations.no_damage_from.filter((ty) => ty.name === type2.name.toLowerCase()).length > 0){
                            //setTableCells(old => old.map((row, i) => i === tIndex ? row.map((col, j) => j === pIndex ? 'X' : col) : row));
                            newTableCells[tIndex][pIndex] = 'X';
                            tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "rgb(170,170,170)";
                        } else if(type1.damage_relations.double_damage_from.filter((ty) => ty.name === type2.name.toLowerCase()).length > 0){
                            if(newTableCells[tIndex][pIndex] === ''){
                                newTableCells[tIndex][pIndex] = '2';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "rgba(170,0,0,0.5)";
                            } else if(newTableCells[tIndex][pIndex] === '2'){
                                newTableCells[tIndex][pIndex] = '4';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "rgba(170,0,0,0.8)";
                            } else if(newTableCells[tIndex][pIndex] === '½'){
                                newTableCells[tIndex][pIndex] = '';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "initial";
                            }
                        } else if(type1.damage_relations.half_damage_from.filter((ty) => ty.name === type2.name.toLowerCase()).length > 0){
                            if(newTableCells[tIndex][pIndex] === ''){
                                newTableCells[tIndex][pIndex] = '½';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "rgba(0,170,0,0.5)";
                            } else if(newTableCells[tIndex][pIndex] === '½'){
                                newTableCells[tIndex][pIndex] = '¼';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "rgba(0,170,0,0.8)";
                            } else if(newTableCells[tIndex][pIndex] === '2'){
                                newTableCells[tIndex][pIndex] = '';
                                tableCellRefs.current[tIndex][pIndex].style.backgroundColor = "initial";
                            }
                        }
                        
                    });
                    if(pIndex === props.pokemonTeamData.length-1) {
                        setTableCells(newTableCells);
                        setGetTeamTotals(true);
                    }
                });
            });
        });
    }, [props.pokemonTeamData]);

    useEffect(() => {
        if(getTeamTotals){
            console.log('getTeamTotals');
            setGetTeamTotals(false);
        }
    }, [getTeamTotals]);

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}> 
            <Table sx={{width: "75%", border: '1px solid rgb(224,224,224)', borderRadius: 1, borderCollapse: 'separate'}}>
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
                            <TableCell sx={{py: 0.5, color: "whitesmoke", backgroundColor: t.color, borderRadius: 1}}>
                                {t.name}
                            </TableCell>
                            {Array.from({length: 7}, (v, j) => {
                                return <TableCell sx={tableCellDefaultSyle} key={j} ref={el => tableCellRefs.current[i][j] = el}>{tableCells[i][j]}</TableCell>
                            })}
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};