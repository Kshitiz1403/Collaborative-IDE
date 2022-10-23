import { Alert, AlertProps } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { ISnacker } from '../../interfaces/ISnacker'


const Snacker = ({ open, onClose, message, autoHideDuration = 6000, severity = "error" }: ISnacker) => {
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