import { Height } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function UseHookForm() {
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.5)', width: '100%', borderRadius: '10px' }}>
            <form style={{ alignItems: 'center' }}>
                <TextField
                    label="אימייל או שם משתמש"
                    size='small'
                    required
                    type='email'
                    sx={{
                        
                        width: '250px',
                        "& .MuiOutlinedInput-root": {
                            fontSize: "12px",
                            
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8c6849",
                                borderWidth: "2px",
                            }
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "12px",
                            
                        },
                        "& .MuiInputLabel-outlined": {
                            fontSize: "10px",
                            "&.Mui-focused": {
                                color: 'rgba(255,255,255,0.5)',
                                fontWeight: "bold",
                              },
                        },
                    }}
                ></TextField>
                <br />
                <TextField
                    label="אימייל או שם משתמש"
                    size='small'
                    required
                    type='password'
                    sx={{
                        width: '250px',
                        "& .MuiOutlinedInput-root": {
                            fontSize: "12px",
                            marginRight: '15px',
                            marginLeft: '15px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8c6849",
                                borderWidth: "2px",
                            }
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "12px",
                            marginRight: '15px',
                            marginLeft: '15px',
                            marginTop: '10px',
                            marginBottom: '10px',
                        },
                        "& .MuiInputLabel-outlined": {
                            fontSize: "10px",
                        },
                    }}
                ></TextField>
                <br />
                    <Button variant="contained" size='small' sx={{ display:'block', margin:'0px 93px 20px 93px' ,height: '20px' }}>היכנס</Button>
            </form>
        </div>
    )
}
