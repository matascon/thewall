import { useState } from "react";

type FetchOptions<T> = RequestInit & { body?: T };
type FetchApi = <T>(
  url: string,
  fetchOptions?: FetchOptions<T>
) => Promise<T | void>;

interface TypeReturn {
  loading: boolean;
  error: boolean;
  fetchApi: FetchApi;
}

const useFetch = (): TypeReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchApi: FetchApi = async <T,>(
    url: string,
    fetchOptions?: FetchOptions<T>
  ) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        setError(true);
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const dataJSON = await response.json();
      return dataJSON;
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchApi };
};

export default useFetch;
