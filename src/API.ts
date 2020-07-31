/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLibraryInput = {
  id?: string | null,
  address: string,
  city: string,
  state: string,
  zip: string,
  latitude: number,
  longitude: number,
  avatar?: string | null,
  status: LibraryStatus,
  _version?: number | null,
};

export enum LibraryStatus {
  ACTIVE = "ACTIVE",
  NEW = "NEW",
  DECLINED = "DECLINED",
}


export type ModelLibraryConditionInput = {
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  avatar?: ModelStringInput | null,
  status?: ModelLibraryStatusInput | null,
  and?: Array< ModelLibraryConditionInput | null > | null,
  or?: Array< ModelLibraryConditionInput | null > | null,
  not?: ModelLibraryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelLibraryStatusInput = {
  eq?: LibraryStatus | null,
  ne?: LibraryStatus | null,
};

export type UpdateLibraryInput = {
  id: string,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zip?: string | null,
  latitude?: number | null,
  longitude?: number | null,
  avatar?: string | null,
  status?: LibraryStatus | null,
  _version?: number | null,
};

export type DeleteLibraryInput = {
  id?: string | null,
  _version?: number | null,
};

export type ModelLibraryFilterInput = {
  id?: ModelIDInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  avatar?: ModelStringInput | null,
  status?: ModelLibraryStatusInput | null,
  and?: Array< ModelLibraryFilterInput | null > | null,
  or?: Array< ModelLibraryFilterInput | null > | null,
  not?: ModelLibraryFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateLibraryMutationVariables = {
  input: CreateLibraryInput,
  condition?: ModelLibraryConditionInput | null,
};

export type CreateLibraryMutation = {
  createLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLibraryMutationVariables = {
  input: UpdateLibraryInput,
  condition?: ModelLibraryConditionInput | null,
};

export type UpdateLibraryMutation = {
  updateLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLibraryMutationVariables = {
  input: DeleteLibraryInput,
  condition?: ModelLibraryConditionInput | null,
};

export type DeleteLibraryMutation = {
  deleteLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SyncLibrariesQueryVariables = {
  filter?: ModelLibraryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncLibrariesQuery = {
  syncLibraries:  {
    __typename: "ModelLibraryConnection",
    items:  Array< {
      __typename: "Library",
      id: string,
      address: string,
      city: string,
      state: string,
      zip: string,
      latitude: number,
      longitude: number,
      avatar: string | null,
      status: LibraryStatus,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type GetLibraryQueryVariables = {
  id: string,
};

export type GetLibraryQuery = {
  getLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLibrarysQueryVariables = {
  filter?: ModelLibraryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLibrarysQuery = {
  listLibrarys:  {
    __typename: "ModelLibraryConnection",
    items:  Array< {
      __typename: "Library",
      id: string,
      address: string,
      city: string,
      state: string,
      zip: string,
      latitude: number,
      longitude: number,
      avatar: string | null,
      status: LibraryStatus,
      _version: number,
      _deleted: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
    startedAt: number | null,
  } | null,
};

export type OnCreateLibrarySubscription = {
  onCreateLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLibrarySubscription = {
  onUpdateLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLibrarySubscription = {
  onDeleteLibrary:  {
    __typename: "Library",
    id: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    latitude: number,
    longitude: number,
    avatar: string | null,
    status: LibraryStatus,
    _version: number,
    _deleted: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
