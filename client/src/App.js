import './App.css';
import CustomRoutes from './Routes/CustomRoutes';
import AuthProvider from './contexts/AuthContext';
import ProjectProvider from './contexts/ProjectContext';

export const API_URL = "http://localhost:4000"

function App() {
  return (
    <div>
      <AuthProvider>
        <ProjectProvider>
          <CustomRoutes />
        </ProjectProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
