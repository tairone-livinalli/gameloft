import React, { useCallback } from 'react';

import { CharacterItem } from '../../components';
import { useFavorites } from '../../hooks/useFavorites';
import { Container, FavoritesList } from './Favorites.styles';

const Favorites = ({ navigation }) => {
  const { favorites } = useFavorites();

  const handlePressCharacter = useCallback(
    ({ id, name }) => {
      navigation.push('Character', {
        id,
        name,
      });
    },
    [navigation],
  );

  return (
    <Container>
      <FavoritesList
        data={favorites}
        renderItem={props => (
          <CharacterItem {...props} onPress={handlePressCharacter} />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default Favorites;
