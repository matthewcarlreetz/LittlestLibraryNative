// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LibraryStatus = {
  "ACTIVE": "ACTIVE",
  "NEW": "NEW",
  "DECLINED": "DECLINED"
};

const { Library } = initSchema(schema);

export {
  Library,
  LibraryStatus
};