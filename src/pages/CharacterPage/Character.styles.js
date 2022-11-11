import styled from 'styled-components/native';

const FavoriteFabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 30px;
  height: 60px;
  width: 60px;
  z-index: 10;
  padding: 8px;
`;

const AnimationContainer = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const AnimationWrapper = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
`;

const CharacterInfo = styled.View`
  flex: 1;
  background-color: #000;
  padding: 20px;
`;

const BirthYear = styled.Text`
  text-align: right;
  color: #fff;
`;

const CharacterDetail = styled.Text`
  font-size: 22px;
  margin-bottom: 8px;
  color: #fff;
`;

const FilmsList = styled.FlatList`
  padding: 20px;
  flex: 1;
`;

export {
  FavoriteFabButton,
  AnimationContainer,
  AnimationWrapper,
  CharacterInfo,
  BirthYear,
  CharacterDetail,
  FilmsList,
};
