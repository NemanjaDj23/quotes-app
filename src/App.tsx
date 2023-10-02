import React from 'react';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Quotes from './pages/Quotes/Quotes';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  return (
    <Routes>
      {!isAuthenticated && <Route index={true} element={<Login onLogin={handleLogin} />} />}
      {isAuthenticated && <Route index={true} element={<Quotes onLogout={handleLogout} />}></Route>}
    </Routes>
  );
}

export default App;
