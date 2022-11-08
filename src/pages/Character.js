import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_PERSON = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      name
      birthYear
      height
      mass
      homeworld {
        id
        name
      }
      filmConnection {
        films {
          id
          title
          episodeID
          releaseDate
        }
      }
    }
  }
`;

const Character = ({ navigation, route: { params } }) => {
  const [person, setPerson] = useState(null);
  const { loading, error, refetch } = useQuery(GET_PERSON, {
    variables: { id: params.id },
    onCompleted: data => setPerson(data.person),
  });

  const handlePressFilm = useCallback(
    ({ id, title }) => {
      navigation.push('Film', {
        id,
        title,
      });
    },
    [navigation],
  );

  const FilmItem = ({ item: { id, title, releaseDate } }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#171717',
        marginBottom: 10,
      }}
      onPress={() => handlePressFilm({ id, title })}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: '700',
          color: '#fff',
          marginBottom: 40,
        }}>
        {title}
      </Text>
      <Text style={{ textAlign: 'right', color: '#fff' }}>{releaseDate}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#000',
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
          onPress={() => refetch({ id: params.id })}>
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
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
      }}>
      <Text style={{ textAlign: 'right', color: '#fff' }}>
        {person?.birthYear}
      </Text>
      <Text style={{ fontSize: 22, marginBottom: 8, color: '#fff' }}>
        {person?.height} cm
      </Text>
      <Text style={{ fontSize: 22, marginBottom: 8, color: '#fff' }}>
        {person?.mass} kg
      </Text>
      <Text style={{ fontSize: 22, marginBottom: 8, color: '#fff' }}>
        {person?.homeworld?.name}
      </Text>
      <FlatList
        style={{
          padding: 20,
          flex: 1,
        }}
        data={person?.filmConnection?.films}
        renderItem={FilmItem}
      />
    </View>
  );
};

export default Character;
