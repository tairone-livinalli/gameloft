import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  return context;
};

export { useFavorites };
