import { gql } from '@apollo/client';

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

export { GET_ALL_FILMS };
