import React from 'react';
import Animated, { BounceInLeft } from 'react-native-reanimated';
import styled from 'styled-components/native';

const FilmButton = styled.TouchableOpacity`
  flex: 1;
  border-radius: 8px;
  padding: 10px;
  background-color: #171717;
  margin-bottom: 10px;
`;

const FilmTitle = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 40px;
`;

const FilmReleaseDate = styled.Text`
  text-align: right;
  color: #fff;
`;

const FilmItem = ({ item: { id, title, releaseDate }, children, onPress }) => (
  <Animated.View entering={BounceInLeft}>
    <FilmButton onPress={() => onPress({ id, title })}>
      <FilmTitle>{title}</FilmTitle>
      {children}
      <FilmReleaseDate>{releaseDate}</FilmReleaseDate>
    </FilmButton>
  </Animated.View>
);

export default FilmItem;
