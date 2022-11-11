import React from 'react';
import Animated, { BounceInLeft } from 'react-native-reanimated';
import styled from 'styled-components/native';

const CharacterButton = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 20px;
  height: 80px;
  background-color: #171717;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const CharacterName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const CharacterItem = ({ item: { id, name }, onPress }) => {
  return (
    <Animated.View entering={BounceInLeft}>
      <CharacterButton
        testID={`${id}-button`}
        onPress={() => onPress({ id, name })}>
        <CharacterName testID={id}>{name}</CharacterName>
      </CharacterButton>
    </Animated.View>
  );
};

export default CharacterItem;
