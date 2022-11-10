import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';

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

  const CharacterItem = ({ item: { id, name } }) => (
    <TouchableOpacity
      testID={`${id}-button`}
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 20,
        height: 80,
        backgroundColor: '#171717',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => handlePressCharacter({ id, name })}>
      <Text
        testID={id}
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#fff',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#000', padding: 20 }}
      data={favorites}
      renderItem={CharacterItem}
      keyExtractor={item => item.id}
    />
  );
};

export default Favorites;
