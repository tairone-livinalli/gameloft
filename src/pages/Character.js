import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { useFavorites } from '../hooks/useFavorites';
import { EmptyHeartIcon, HeartIcon } from '../icons';
import Animated, {
  BounceInLeft,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

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
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const likeAnimation = useSharedValue(0);
  const [lastPressed, setLastPressed] = useState(0);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
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

  const handleDoubleTap = useCallback(() => {
    var delta = new Date().getTime() - lastPressed;

    if (delta < 200) {
      handlePressLike();
    }

    setLastPressed(new Date().getTime());
  }, [lastPressed, handlePressLike]);

  useEffect(() => {
    const favorite = favorites.find(needle => needle.id === params.id);

    setIsFavorited(!!favorite);
  }, [params, favorites]);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            likeAnimation.value,
            [0, 1],
            [1, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: likeAnimation.value }],
      opacity: likeAnimation.value,
    };
  });

  const handlePressLike = useCallback(() => {
    try {
      setIsAnimating(true);
      likeAnimation.value = withSpring(likeAnimation.value ? 0 : 1, {}, () =>
        setIsAnimating(false),
      );

      if (isFavorited) {
        removeFavorite(params.id);
        return;
      }

      addFavorite({ id: params.id, name: person.name });
    } catch (e) {
      console.log(e);
    }
  }, [likeAnimation, isFavorited, addFavorite, removeFavorite, params, person]);

  const FavoriteButton = () => (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 30,
        height: 60,
        width: 60,
        zIndex: 10,
        padding: 8,
      }}
      onPress={handlePressLike}>
      {isFavorited ? <HeartIcon fill="red" /> : <EmptyHeartIcon fill="black" />}
    </TouchableOpacity>
  );

  const FilmItem = ({ item: { id, title, releaseDate } }) => (
    <Animated.View entering={BounceInLeft}>
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
    </Animated.View>
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
    <>
      {isAnimating ? (
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 80,
              width: 80,
            }}
            onPress={handlePressLike}>
            <Animated.View
              style={[StyleSheet.absoluteFillObject, outlineStyle]}>
              <EmptyHeartIcon fill="white" />
            </Animated.View>

            <Animated.View style={fillStyle}>
              <HeartIcon fill="red" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            padding: 20,
          }}
          onTouchStart={handleDoubleTap}>
          <FavoriteButton />
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
      )}
    </>
  );
};

export default Character;
