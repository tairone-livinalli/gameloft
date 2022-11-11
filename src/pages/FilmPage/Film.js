import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_FILM } from '../../graphql/queries';
import {
  Container,
  FilmList,
  InfoText,
  OpeningCrawl,
  ReleaseDate,
} from './Film.styles';
import { Error, Loading, CharacterItem } from '../../components';

const Film = ({ navigation, route: { params } }) => {
  const [after, setAfter] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [film, setFilm] = useState(null);
  const [loadFilm, { loading, error, called }] = useLazyQuery(GET_FILM, {
    nextFetchPolicy: 'network-only',
    onCompleted: data => {
      setFilm(data.film);
      const { pageInfo, characters: newCharacters } =
        data.film.characterConnection;
      setAfter(pageInfo.endCursor);
      setHasNextPage(pageInfo.hasNextPage);
      setCharacters([...characters, ...newCharacters]);
    },
  });

  useEffect(() => {
    if (!params.id || called) {
      return;
    }

    loadFilm({ variables: { id: params.id, after } });
  }, [params.id, called, loadFilm, after]);

  const handlePressCharacter = useCallback(
    ({ id, name }) => {
      navigation.push('Character', {
        id,
        name,
      });
    },
    [navigation],
  );

  const FilmInfo = () => {
    if (!film) {
      return;
    }

    return (
      <>
        <ReleaseDate>{film?.releaseDate}</ReleaseDate>
        <OpeningCrawl>{film?.openingCrawl}</OpeningCrawl>
        <InfoText>
          Species shown: {film?.speciesConnection?.totalCount || 0}
        </InfoText>
        <InfoText>
          Planets shown: {film?.planetConnection?.totalCount || 0}
        </InfoText>
        <InfoText last>
          Vehicles shown: {film?.vehicleConnection?.totalCount || 0}
        </InfoText>
      </>
    );
  };

  const loadMoreCharacters = useCallback(() => {
    if (!hasNextPage || loading) {
      return;
    }

    loadFilm({ variables: { id: params.id, after } });
  }, [hasNextPage, loading, loadFilm, params, after]);

  if (loading && !called) {
    return <Loading />;
  }

  if (error) {
    return <Error onPress={() => loadFilm({ id: params.id, after })} />;
  }

  return (
    <Container>
      <FilmList
        data={characters}
        renderItem={props => (
          <CharacterItem {...props} onPress={handlePressCharacter} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={FilmInfo}
        onEndReached={loadMoreCharacters}
        ListFooterComponent={loading && <Loading />}
      />
    </Container>
  );
};

export default Film;
