import React, { useState } from 'react'
import { Textinput } from './Textinput'
import { Button, IconButton, InputAdornment, styled } from '@mui/material'
import { CloudUploadOutlined } from '@mui/icons-material'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function UploadFileButton() {
    const [numFiles, setNumFiles] = useState(0);
    
    const countFile = (e) => {
        setNumFiles(e.target.files.length);
    }


    return (
        <Textinput
            label={numFiles == 0 ? "העלאת קבצים" : null}
            size='small'
            InputProps={{
                endAdornment: <InputAdornment position='end'>
                    <IconButton component="label" role={undefined} tabIndex={-1} edge="end">
                        <CloudUploadOutlined color='primary' />
                        <VisuallyHiddenInput type='file' name='files' multiple={true} onChange={countFile} />
                    </IconButton>
                </InputAdornment>
            }}
            value={numFiles == 0 ? "" : `העלת ${numFiles} קבצים`}
        >
        </Textinput>
    )
}
