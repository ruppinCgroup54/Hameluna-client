import React from 'react'
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
    return (
        <Textinput
        label="העלאת קבצים"
            size='small'
            InputProps={{
                endAdornment: <InputAdornment position='end'>
                    <IconButton  component="label" role={undefined} tabIndex={-1} edge="end">
                        <CloudUploadOutlined color='primary' />
                        <VisuallyHiddenInput type='file' />
                    </IconButton>
                </InputAdornment>
            }}
        >
        </Textinput>
    )
}
