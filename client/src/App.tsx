import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthProvider from './contexts/AuthContext';
import ProjectProvider from './contexts/ProjectContext';
import EditorProvider from './contexts/EditorContext';
import CustomRoutes from './Routes/CustomRoutes';

export const API_URL = "http://localhost:4000/api"


function App() {
  return (
    <div>
      <AuthProvider>
        <ProjectProvider>
          <EditorProvider>
            <CustomRoutes />
          </EditorProvider>
        </ProjectProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
