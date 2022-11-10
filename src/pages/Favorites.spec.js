import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Favorites from './Favorites';

const mockedFavorites = jest.fn();
const mockedNavigation = { push: jest.fn() };

jest.mock('../hooks/useFavorites', () => {
  return {
    useFavorites: () => ({
      favorites: mockedFavorites(),
    }),
  };
});

describe('Favorites Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to list favorites', () => {
    mockedFavorites.mockImplementationOnce(() => {
      return [{ id: 'fake-id', name: 'fake-name' }];
    });

    const { getByTestId } = render(<Favorites />);

    const favoriteName = getByTestId('fake-id');

    expect(favoriteName).toHaveTextContent('fake-name');
  });

  it('should be able to navigate to character page when clicking favorite item', () => {
    mockedFavorites.mockImplementationOnce(() => {
      return [{ id: 'fake-id', name: 'fake-name' }];
    });

    const { getByTestId } = render(<Favorites navigation={mockedNavigation} />);

    const favoriteItem = getByTestId('fake-id-button');

    fireEvent.press(favoriteItem);

    expect(mockedNavigation.push).toHaveBeenCalledWith('Character', {
      id: 'fake-id',
      name: 'fake-name',
    });
  });
});
