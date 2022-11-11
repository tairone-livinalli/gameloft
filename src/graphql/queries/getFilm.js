import { gql } from '@apollo/client';

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

export { GET_FILM };
