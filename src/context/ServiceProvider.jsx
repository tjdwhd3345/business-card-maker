import React, { createContext, useContext } from 'react';
import AuthService from '../services/authService';
import DbService from '../services/dbService';
import ImageUploadService from '../services/imageUploadService';

const Context = createContext(null);

export function ServiceProvider({ children }) {
  const authService = new AuthService();
  const dbService = new DbService();
  const imageUploadService = new ImageUploadService();

  return (
    <Context.Provider value={{ authService, dbService, imageUploadService }}>
      {children}
    </Context.Provider>
  );
}

export function useService() {
  const context = useContext(Context);
  if (!context) throw Error('context is null');
  return context;
}
