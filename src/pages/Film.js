import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gql, useLazyQuery } from '@apollo/client';

const GET_FILM = gql`
  query getFilm($id: ID!, $after: String!) {
    film(id: $id) {
      id
      title
      openingCrawl
      releaseDate
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection(first: 5, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        characters {
          id
          name
        }
      }
    }
  }
`;

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

  const FilmInfo = () => {
    if (!film) {
      return;
    }

    return (
      <>
        <Text style={{ textAlign: 'right', color: '#fff', fontSize: 16 }}>
          {film?.releaseDate}
        </Text>
        <Text
          style={{
            marginTop: 10,
            textAlign: 'center',
            color: 'gold',
            fontSize: 22,
            fontWeight: '700',
          }}>
          {film?.openingCrawl}
        </Text>
        <Text style={{ marginTop: 10, color: '#fff', fontSize: 18 }}>
          Species shown: {film?.speciesConnection?.totalCount || 0}
        </Text>
        <Text style={{ marginTop: 10, color: '#fff', fontSize: 18 }}>
          Planets shown: {film?.planetConnection?.totalCount || 0}
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: '#fff',
            fontSize: 18,
            marginBottom: 10,
          }}>
          Vehicles shown: {film?.vehicleConnection?.totalCount || 0}
        </Text>
      </>
    );
  };

  const Loading = () => (
    <>{!!loading && <ActivityIndicator size="large" color="#fff" />}</>
  );

  const loadMoreCharacters = useCallback(() => {
    if (!hasNextPage || loading) {
      return;
    }

    loadFilm({ variables: { id: params.id, after } });
  }, [hasNextPage, loading, loadFilm, params, after]);

  if (loading && !called) {
    return (
      <View
        style={{
          backgroundColor: '#000',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FF3333' }}>
          Oops!
        </Text>
        <Text style={{ fontSize: 16, color: '#FF3333' }}>
          Something is wrong, please try again.
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            height: 50,
            width: '80%',
            backgroundColor: 'gold',
            marginTop: 10,
          }}
          onPress={() => loadFilm({ id: params.id, after })}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#000', padding: 20 }}
      data={characters}
      renderItem={CharacterItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={FilmInfo}
      onEndReached={loadMoreCharacters}
      ListFooterComponent={Loading}
    />
  );
};

export default Film;
