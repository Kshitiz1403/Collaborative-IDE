import { AlertProps } from '@mui/material/';

export interface ISnacker {
    open: boolean;
    onClose?: () => void;
    message: string;
    autoHideDuration?: number;
    severity?: AlertProps['severity'];
}
