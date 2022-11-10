import React, { createContext, useCallback, useState } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = useCallback(
    favorite => {
      if (!favorite || !favorite.id || !favorite.name) {
        throw new Error('Invalid favorite');
      }

      setFavorites([...favorites, favorite]);
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    id => {
      if (!id) {
        throw new Error('Invalid id');
      }

      const newFavorites = favorites.filter(favorite => favorite.id !== id);

      setFavorites([...newFavorites]);
    },
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
