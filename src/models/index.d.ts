import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum LibraryStatus {
  ACTIVE = "ACTIVE",
  NEW = "NEW",
  DECLINED = "DECLINED"
}



export declare class Library {
  readonly id: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly avatar?: string;
  readonly status: LibraryStatus | keyof typeof LibraryStatus;
  constructor(init: ModelInit<Library>);
  static copyOf(source: Library, mutator: (draft: MutableModel<Library>) => MutableModel<Library> | void): Library;
}