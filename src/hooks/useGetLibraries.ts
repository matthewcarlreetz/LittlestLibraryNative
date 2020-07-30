import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Library } from "../models";

const useGetLibraries = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);

  useEffect(() => {
    async function getLibraries() {
      const libs = await DataStore.query(Library);
      console.log("QUERY_LIBRARIES_RESULT", libs);
      setLibraries(libs);
    }
    getLibraries();
  }, []);

  return { libraries }
};

export default useGetLibraries;
