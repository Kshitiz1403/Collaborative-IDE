import { Alert, AlertProps } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'

interface IProps {
    open: boolean;
    onClose?: ()=>void;
    message: string;
    autoHideDuration?: number ;
    severity?: AlertProps['severity'];

}
const Snacker = ({ open, onClose, message, autoHideDuration = 6000, severity = "error" }: IProps) => {
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