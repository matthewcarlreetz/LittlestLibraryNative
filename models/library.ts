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
  distance: number;
}

export interface GetLibrariesVars {
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
      distance
    }
  }
`;

const CREATE_LIBRARY = gql`
  mutation createLibrary(
    $file: Upload!
    $latitude: Float!
    $longitude: Float!
    $address: String!
    $city: String!
    $state: String!
    $zip: String!
  ) {
    createLibrary(
      file: $file
      latitude: $latitude
      longitude: $longitude
      address: $address
      city: $city
      state: $state
      zip: $zip
    ) {
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

export { GET_LIBRARIES, CREATE_LIBRARY };
