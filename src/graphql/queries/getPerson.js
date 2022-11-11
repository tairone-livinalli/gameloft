import { gql } from '@apollo/client';

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

export { GET_PERSON };
