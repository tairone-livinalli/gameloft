import { View, Text } from 'react-native';
import React from 'react';

const Character = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <Text style={{ color: '#fff' }}>Character</Text>
    </View>
  );
};

export default Character;
