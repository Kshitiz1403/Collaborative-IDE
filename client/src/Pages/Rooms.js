import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import { FilledInput } from '@mui/material'

const Rooms = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: "#0E1525", color: 'whitesmoke' }}>
            <h1 style={{ textShadow: "rgba(255,255,255,0.58) 0px 0px 13px" }}>
                Create Room
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <TextField
                        required
                        id="outlined-basic"
                        label="What do you want to be called?"
                        autoComplete='off'
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        inputProps={{ sx: { color: 'whitesmoke' } }}
                        InputLabelProps={{
                            style: { color: "whitesmoke" },
                        }}
                        sx={{
                            ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
                                color: "whitesmoke",
                            },
                        }}
                        InputProps={{
                            sx: {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid whitesmoke",
                                },
                                "&:hover": {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "2px solid whitesmoke",
                                    },
                                },
                            },
                        }}
                        autoFocus
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password (optional)"
                        type={'password'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        variant="outlined"
                        inputProps={{ sx: { color: 'whitesmoke' } }}
                        InputLabelProps={{
                            style: { color: "whitesmoke" },
                        }}
                        sx={{
                            ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
                                color: "whitesmoke",
                            },
                        }}
                        InputProps={{
                            sx: {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid whitesmoke",
                                },
                                "&:hover": {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "2px solid whitesmoke",
                                    },
                                },
                            },
                        }}
                    />
                </Box>
                <Button variant={!name.length == 0 ? 'contained' : 'outlined'} style={{ borderColor: 'whitesmoke', color: 'whitesmoke', margin: 8 }}>
                    Join/Create
                </Button>
            </div>
        </div>
    )
}

export default Rooms