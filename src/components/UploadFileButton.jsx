import React, { useEffect, useState } from 'react'
import { Textinput } from './Textinput'
import { Button, IconButton, InputAdornment, styled } from '@mui/material'
import { CloudUploadOutlined } from '@mui/icons-material'
import { count } from 'firebase/firestore';

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


export default function UploadFileButton({ isPhotos = false }) {
    const [numFiles, setNumFiles] = useState(0);

    const countFile = (e) => {
        setNumFiles(e.target.files.length);
    }


    let text = !isPhotos ? "העלאת קבצים" : "העלאת תמונות"
    let textNumFile = !isPhotos ? `העלת ${numFiles} קבצים` : `העלת ${numFiles} תמונות`
    return (
        <Textinput
            label={numFiles == 0 ? text : null}
            size='small'
            InputProps={{
                endAdornment: <InputAdornment position='end'>
                    <IconButton component="label" role={undefined} tabIndex={-1} edge="end">
                        <CloudUploadOutlined color='primary' />
                        <VisuallyHiddenInput type='file' name='files' multiple={true} onChange={countFile}  />
                    </IconButton>
                </InputAdornment>
            }}
            value={numFiles == 0 ? "" : textNumFile}
        >
        </Textinput>
    )
}
