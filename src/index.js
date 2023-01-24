import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { auth, db, storage } from './firebase';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { Context } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <AuthContextProvider>
  <Context.Provider value={{
    auth,
    storage,
    db
  }}>
    <RouterProvider router={router} />
  </Context.Provider>
  // </AuthContextProvider>
);