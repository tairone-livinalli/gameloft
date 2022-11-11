import styled from 'styled-components/native';

const OpeningCrawl = styled.Text`
  text-align: justify;
  font-size: 18px;
  color: #fff;
`;

const Container = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SortFabButton = styled.TouchableOpacity`
  background-color: #fff;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 30px;
  height: 60px;
  width: 60px;
  z-index: 10;
`;

const FilmsList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

export { OpeningCrawl, Container, SortFabButton, FilmsList };
