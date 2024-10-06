import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EditEmployeePage from './components/EditEmployeePage'; // Make sure to create this page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/edit/:id" 
            element={isLoggedIn ? <EditEmployeePage /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
