import { useDispatch } from 'react-redux';
import { resetSnack, setSnack } from '../store/reducers/snackSlice';

const useSnack = () => {
   const dispatch = useDispatch();

   const setError = ({ message, timeout = 6000 }) => {
      dispatch(setSnack({ isError: true, message, timeout }));
      setTimeout(() => {
         dispatch(resetSnack());
      }, timeout);
   };

   const setSuccess = ({ message, timeout = 6000 }) => {
      dispatch(setSnack({ isError: false, message, timeout }));
      setTimeout(() => {
         dispatch(resetSnack());
      }, timeout);
   };

   const reset = () => {
      dispatch(resetSnack());
   };

   return { setSuccess, setError, reset };
};

export default useSnack;
