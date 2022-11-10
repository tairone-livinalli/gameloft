import React from 'react';
import { FavoritesProvider } from './FavoritesContext';

const RootContext = ({ children }) => {
  return <FavoritesProvider>{children}</FavoritesProvider>;
};

export default RootContext;
