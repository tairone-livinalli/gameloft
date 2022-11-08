import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

const characters = [
  {
    id: 'cGVvcGxlOjE=',
    name: 'Luke Skywalker',
  },
  {
    id: 'cGVvcGxlOjI=',
    name: 'C-3PO',
  },
  {
    id: 'cGVvcGxlOjM=',
    name: 'R2-D2',
  },
  {
    id: 'cGVvcGxlOjQ=',
    name: 'Darth Vader',
  },
  {
    id: 'cGVvcGxlOjU=',
    name: 'Leia Organa',
  },
];

const Favorites = ({ navigation }) => {
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
      data={characters}
      renderItem={CharacterItem}
      keyExtractor={item => item.id}
    />
  );
};

export default Favorites;
