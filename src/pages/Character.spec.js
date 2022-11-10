import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Character from './Character';

const mockedFavorites = jest.fn();
const mockedNavigation = { push: jest.fn() };
const mockedRoute = { params: { id: 'fake-id' } };
const mockedGql = jest.fn();
const mockedUseQuery = jest.fn();

jest.mock('../hooks/useFavorites', () => {
  return {
    useFavorites: () => ({
      favorites: mockedFavorites(),
      addFavorite: mockedFavorites,
      removeFavorite: mockedFavorites,
    }),
  };
});

// jest.mock('@apollo/client', () => {
//   return {
//     gql: '',
//     useQuery: mockedUseQuery,
//   };
// });

describe('Character Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to render', () => {
    // render(<Character navigation={mockedNavigation} route={mockedRoute} />);
  });
});
