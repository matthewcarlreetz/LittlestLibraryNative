/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLibrary = /* GraphQL */ `
  mutation CreateLibrary(
    $input: CreateLibraryInput!
    $condition: ModelLibraryConditionInput
  ) {
    createLibrary(input: $input, condition: $condition) {
      id
      address
      city
      state
      zip
      latitude
      longitude
      avatar
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateLibrary = /* GraphQL */ `
  mutation UpdateLibrary(
    $input: UpdateLibraryInput!
    $condition: ModelLibraryConditionInput
  ) {
    updateLibrary(input: $input, condition: $condition) {
      id
      address
      city
      state
      zip
      latitude
      longitude
      avatar
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteLibrary = /* GraphQL */ `
  mutation DeleteLibrary(
    $input: DeleteLibraryInput!
    $condition: ModelLibraryConditionInput
  ) {
    deleteLibrary(input: $input, condition: $condition) {
      id
      address
      city
      state
      zip
      latitude
      longitude
      avatar
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
