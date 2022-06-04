import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import isRoomIdValid from '../utils/checkValidRoomId'
import { generateSlug } from 'random-word-slugs'
import Snacker from '../Components/Snacker/Snacker'

const Rooms = () => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const searchRoomID = searchParams.get("room")

    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isCreating, setIsCreating] = useState(true)
    const [errorModal, setIsErrorModal] = useState(false)

    // check whether the room id in search params is valid or not. If it is, then proceed to join room else proceed to create a new room while giving an error like "room id is not valid" 

    useEffect(() => {

        if (searchParams.has("room") && searchParams.get("room")) {
            if (isRoomIdValid(searchParams.get("room"))) {
                // join
                setRoomId(searchParams.get("room"))

                // display join instead of create
                setIsCreating(false)

            } else {
                // joining using invalid room id => throw error and proceed to creating new room id 
                setIsErrorModal(true)

                const slug_word = generateSlug();
                setRoomId(slug_word)
            }
        } else {
            // create room => create a new room id
            const slug_word = generateSlug();
            setRoomId(slug_word)
        }

    }, [location])



    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: "#0E1525", color: 'whitesmoke' }}>
            <h1 style={{ textShadow: "rgba(255,255,255,0.58) 0px 0px 13px" }}>
                {isCreating ? "Create Room" : "Join Room"}
            </h1>

            <Snacker open={errorModal} message={"Invalid room"} onClose={() => setIsErrorModal(false)} />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <TextField
                        required
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
                        label="Password (optional)"
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <Button variant={!name.length == 0 ? 'contained' : 'outlined'} style={{ borderColor: 'whitesmoke', color: 'whitesmoke', margin: 8 }} >
                    Join/Create
                </Button>
            </div>
        </div>
    )
}

export default Rooms