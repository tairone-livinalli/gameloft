import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_FILMS = gql`
  query getAllFilms {
    allFilms {
      films {
        id
        title
        openingCrawl
        releaseDate
      }
      totalCount
    }
  }
`;

const Films = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_FILMS);

  const handlePressFilm = useCallback(
    ({ id, title }) => {
      navigation.navigate('Film', {
        id,
        title,
      });
    },
    [navigation],
  );

  const FilmItem = ({ item: { id, title, openingCrawl, releaseDate } }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 20,
        backgroundColor: '#171717',
        width: '100%',
        marginBottom: 10,
      }}
      onPress={() => handlePressFilm({ id, title })}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: Colors.light,
          marginBottom: 40,
        }}>
        {title}
      </Text>
      <Text style={{ textAlign: 'justify', fontSize: 18, color: Colors.light }}>
        {openingCrawl?.slice(0, 49)}...
      </Text>
      <Text style={{ textAlign: 'right', color: Colors.light }}>
        {releaseDate}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: Colors.black,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          backgroundColor: Colors.black,
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
            marginTop: 8,
          }}
          onPress={() => refetch()}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20,
      }}>
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={data.allFilms.films}
        renderItem={FilmItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Films;
