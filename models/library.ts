import { gql } from 'apollo-boost';

export interface LibraryData {
  nearbyLibraries: Array<Library>;
}

export interface Library {
  id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  image: string;
  thumbnail: string;
  status: string;
}

export interface LibraryVars {
  longitude: number;
  latitude: number;
}

const GET_LIBRARIES = gql`
  query libraries($latitude: Float!, $longitude: Float!) {
    nearbyLibraries(latitude: $latitude, longitude: $longitude) {
      id
      address
      city
      state
      zip
      latitude
      longitude
      image
      thumbnail
      status
    }
  }
`;

export { GET_LIBRARIES };
