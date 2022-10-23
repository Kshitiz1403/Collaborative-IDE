import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogAlert = ({ isDialogOpened, handleClose, title, description, actions }) => {
    return (
        <Dialog open={isDialogOpened} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {actions.map(action => {
                    return (
                        <Button key={action.text}
                            autoFocus={action['autoFocus'] === true ? action.autoFocus : false}
                            onClick={action.onClick}
                        >
                            {action.text}
                        </Button>
                    );
                })}
            </DialogActions>
        </Dialog>
    );
};

export default DialogAlert;
