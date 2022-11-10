import { renderHook } from '@testing-library/react-native';
import { act } from 'react-test-renderer';

import { FavoritesProvider } from './FavoritesContext';
import { useFavorites } from '../hooks/useFavorites';

describe('Favorites Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to add a favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { addFavorite } = result.current;

    act(() => {
      addFavorite({
        id: 'fake-id',
        name: 'fake-name',
      });
    });

    const { favorites } = result.current;

    expect(favorites[0].id).toEqual('fake-id');
    expect(favorites[0].name).toEqual('fake-name');
  });

  it('should throw an error if invalid id passed when trying to add new favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { addFavorite } = result.current;

    expect(() =>
      addFavorite({
        id: null,
        name: 'fake-name',
      }),
    ).toThrow(new Error('Invalid favorite'));
  });

  it('should throw an error if invalid name passed when trying to add new favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { addFavorite } = result.current;

    expect(() =>
      addFavorite({
        id: 'fake-id',
        name: null,
      }),
    ).toThrow(new Error('Invalid favorite'));
  });

  it('should throw an error if empty object when trying to add new favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { addFavorite } = result.current;

    expect(() => addFavorite({})).toThrow(new Error('Invalid favorite'));
  });

  it('should be able to remove a favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { addFavorite } = result.current;

    act(() => {
      addFavorite({
        id: 'fake-id',
        name: 'fake-name',
      });
    });

    const { removeFavorite } = result.current;

    act(() => {
      removeFavorite('fake-id');
    });

    const { favorites } = result.current;

    expect(favorites.length).toEqual(0);
  });

  it('should throw an error if nothing passed when trying to remove favorite', async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: FavoritesProvider,
    });

    const { removeFavorite } = result.current;

    expect(() => removeFavorite()).toThrow(new Error('Invalid id'));
  });
});
