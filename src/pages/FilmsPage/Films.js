import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';

import { ArrowDownIcon, ArrowUpIcon } from '../../icons';
import { GET_ALL_FILMS } from '../../graphql/queries';
import { Error, FilmItem, Loading } from '../../components';
import {
  Container,
  FilmsList,
  OpeningCrawl,
  SortFabButton,
} from './Films.styles';

const Films = ({ navigation }) => {
  const [films, setFilms] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const { loading, error, refetch } = useQuery(GET_ALL_FILMS, {
    onCompleted: data => {
      const map = data.allFilms.films.map(film => ({
        ...film,
        timestamp: new Date(film.releaseDate).getTime(),
      }));

      setFilms([...map.sort((a, b) => a.timestamp - b.timestamp)]);
    },
  });

  const handlePressSort = useCallback(() => {
    setIsAscendingOrder(!isAscendingOrder);
    setFilms([...films.reverse()]);
  }, [isAscendingOrder, films]);

  const handlePressFilm = useCallback(
    ({ id, title }) => {
      navigation.push('Film', {
        id,
        title,
      });
    },
    [navigation],
  );

  const FilmItemWrapper = props => (
    <FilmItem {...props} onPress={handlePressFilm}>
      <OpeningCrawl>{props.item.openingCrawl?.slice(0, 49)}...</OpeningCrawl>
    </FilmItem>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error onPress={() => refetch()} />;
  }

  return (
    <Container>
      <SortFabButton onPress={handlePressSort}>
        {isAscendingOrder ? (
          <ArrowDownIcon fill="#000" />
        ) : (
          <ArrowUpIcon fill="#000" />
        )}
      </SortFabButton>
      <FilmsList
        data={films}
        renderItem={FilmItemWrapper}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default Films;
