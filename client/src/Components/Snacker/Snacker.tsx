import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { ISnacker } from '../../interfaces/ISnacker';
import { useDispatch } from 'react-redux';
import { resetSnack } from '../../store/reducers/snackSlice';

const Snacker = ({ open, message, severity = 'error' }: ISnacker) => {
   const dispatch = useDispatch();
   const onClose = () => dispatch(resetSnack());

   return (
      <Snackbar open={open} onClose={onClose} autoHideDuration={6000}>
         <Alert onClose={onClose} severity={severity} variant="filled">
            {message}
         </Alert>
      </Snackbar>
   );
};

export default Snacker;
