import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'

const Snacker = ({ open, onClose, message, autoHideDuration = 6000, severity = "error" }) => {
    return (
        <Snackbar
            autoHideDuration={autoHideDuration}
            open={open}
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Snacker