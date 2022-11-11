import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import Animated, {
  BounceInLeft,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useFavorites } from '../../hooks/useFavorites';
import { EmptyHeartIcon, HeartIcon } from '../../icons';
import { GET_PERSON } from '../../graphql/queries';
import { Error, FilmItem, Loading } from '../../components';
import {
  AnimationContainer,
  AnimationWrapper,
  BirthYear,
  CharacterDetail,
  CharacterInfo,
  FavoriteFabButton,
  FilmsList,
} from './Character.styles';

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
    <FavoriteFabButton>
      {isFavorited ? <HeartIcon fill="red" /> : <EmptyHeartIcon fill="black" />}
    </FavoriteFabButton>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error onPress={() => refetch({ id: params.id })} />;
  }

  return (
    <>
      {isAnimating ? (
        <AnimationContainer>
          <AnimationWrapper>
            <Animated.View
              style={[StyleSheet.absoluteFillObject, outlineStyle]}>
              <EmptyHeartIcon fill="white" />
            </Animated.View>

            <Animated.View style={fillStyle}>
              <HeartIcon fill="red" />
            </Animated.View>
          </AnimationWrapper>
        </AnimationContainer>
      ) : (
        <CharacterInfo onTouchStart={handleDoubleTap}>
          <FavoriteButton />
          <BirthYear>{person?.birthYear}</BirthYear>
          <CharacterDetail>{person?.height} cm</CharacterDetail>
          <CharacterDetail>{person?.mass} kg</CharacterDetail>
          <CharacterDetail>{person?.homeworld?.name}</CharacterDetail>
          <FilmsList
            data={person?.filmConnection?.films}
            renderItem={props => (
              <FilmItem {...props} onPress={handlePressFilm} />
            )}
          />
        </CharacterInfo>
      )}
    </>
  );
};

export default Character;
