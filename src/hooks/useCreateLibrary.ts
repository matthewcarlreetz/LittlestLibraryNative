import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Library } from '../models';

const useCreateLibrary = () => {
  const [library, setLibrary] = useState<Library | null>(null);

  const createLib = async (lib: Library) => {
    setLibrary(lib);
  };

  useEffect(() => {
    async function createLibrary() {
      if (!library) return;

      await DataStore.save(library);
      setLibrary(null);
    }
    createLibrary();
  }, [library]);

  return { createLib, loading: !!library, error: false };
};

export default useCreateLibrary;
