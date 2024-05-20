import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useContext, useState } from 'react';
import { ShelterContext } from '../context/ShelterContextProvider';

export default function CellsBox({ cells, setVal, val }) {

    const [color, setColor] = useState("rgb(131,140,59,0.4)");

    const calcEmptyNum = (cell) => {
        return cell.capacity - cell.dogsInCell.length;
    }

    const filterCells = cells.filter((c) => calcEmptyNum(c) > 0);

    let maxEmpty = calcEmptyNum(filterCells[0]);

    for (let i = 1; i < filterCells.length; i++) {
        let temp = calcEmptyNum(filterCells[i]);
        if (temp > maxEmpty) {
            maxEmpty = temp;
        }
    }



    return (
        <Box sx={{
            backgroundColor: '#fff',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '20px',
            display: 'flex',
            alignItems:'center',
            flexDirection:'column',
        }}>
            <Typography>שיוך לתא</Typography>
            <Box sx={{display: 'flex', flexDirection:'row',flexWrap:'wrap', width:'100%', justifyContent:'center'}}>
                {
                    filterCells.map((c) => (
                                <Skeleton
                                    key={c.number}
                                    variant='h4'
                                    animation = {(c.capacity - c.dogsInCell.length != maxEmpty || val == c.number    ? false : 'pulse')}
                                    onClick={()=> setVal(c.number)}
                                    sx={{
                                        minWidth: '50px',
                                        height:'50px',
                                        textAlign:'center',
                                        alignContent:'center',
                                        m: '2%',
                                        backgroundColor: (c.capacity - c.dogsInCell.length == maxEmpty&&val==null || (val == c.number )) ? color : '',
                                    }}>
                                    {c.number}
                                </Skeleton>
                    ))
                }
            </Box>
        </Box>
    )
}