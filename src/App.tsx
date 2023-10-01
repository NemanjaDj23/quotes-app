import React from 'react';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { getTokenFromLocalStorage } from './helpers/tokenHelpers';
import Quotes from './pages/Quotes/Quotes';

function App() {
  const isLoggedIn = !!getTokenFromLocalStorage();
  return (
    <Routes>
      {!isLoggedIn && <Route index={true} element={<Login />} />}
      {isLoggedIn && <Route index={true} element={<Quotes />} />}
    </Routes>
  );
}

export default App;
