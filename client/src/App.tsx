import './App.css';
import CustomRoutes from './Routes/CustomRoutes';
import Snacker from './Components/Snacker/Snacker';
import { useSelector } from 'react-redux';

function App() {
   const snackerState = useSelector(state => state['snack']);
   return (
      <>
         <Snacker
            message={snackerState['message']}
            open={snackerState['isOpen']}
            autoHideDuration={snackerState['timeout']}
            severity={snackerState['severity']}
         />
         <CustomRoutes />
      </>
   );
}

export default App;
