import { useState } from "react";

type FetchOptions<T> = RequestInit & { body?: T };
type FetchApi = <T>(
  url: string,
  fetchOptions?: FetchOptions<T>
) => Promise<T | void>;

interface TypeReturn<T> {
  loading: boolean;
  error: string | null;
  fetchApi: FetchApi;
}

const useFetch = <T,>(): TypeReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi: FetchApi = async <T,>(
    url: string,
    fetchOptions?: FetchOptions<T>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        setError("Error to response API");
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const dataJSON = await response.json();
      return dataJSON;
    } catch (e) {
      setError("There is an issue with API petition");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchApi };
};

export default useFetch;
