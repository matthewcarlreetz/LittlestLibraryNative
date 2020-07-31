/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncLibraries = /* GraphQL */ `
  query SyncLibraries(
    $filter: ModelLibraryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLibraries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getLibrary = /* GraphQL */ `
  query GetLibrary($id: ID!) {
    getLibrary(id: $id) {
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
export const listLibrarys = /* GraphQL */ `
  query ListLibrarys(
    $filter: ModelLibraryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLibrarys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
