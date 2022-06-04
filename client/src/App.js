import logo from './logo.svg';
import './App.css';
import Monaco from './Monaco';
import HomePage from './Pages/HomePage';
import CustomRoutes from './Routes/CustomRoutes';

export const API_URL = "http://localhost:4000"

function App() {
  return (
    <div>
      <CustomRoutes/>
    </div>
  );
}

export default App;
