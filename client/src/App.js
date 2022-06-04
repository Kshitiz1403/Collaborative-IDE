import './App.css';
import CustomRoutes from './Routes/CustomRoutes';
import AuthProvider from './contexts/AuthContext';

export const API_URL = "http://localhost:4000"

function App() {
  return (
    <div>
      <AuthProvider>
        <CustomRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
