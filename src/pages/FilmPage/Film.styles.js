import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const FilmList = styled.FlatList`
  background-color: #000;
  padding: 20px;
`;

const ReleaseDate = styled.Text`
  text-align: right;
  color: #fff;
  font-size: 16px;
`;

const OpeningCrawl = styled.Text`
  margin-top: 10px;
  text-align: center;
  color: gold;
  font-size: 22px;
  font-weight: 700;
`;

const InfoText = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 18px;

  ${props =>
    props.last &&
    css`
      margin-bottom: 10px;
    `}
`;

export { Container, FilmList, ReleaseDate, OpeningCrawl, InfoText };
