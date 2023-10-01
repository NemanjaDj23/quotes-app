import React from 'react';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { getTokenFromLocalStorage } from './helpers/tokenHelpers';

function App() {
  const isLoggedIn = !!getTokenFromLocalStorage();
  return (
    <Routes>
      {!isLoggedIn && <Route index={true} element={<Login />} />}

      {isLoggedIn && <Route index={true} element={<div>Ulogovan</div>} />}
    </Routes>
  );
}

export default App;
