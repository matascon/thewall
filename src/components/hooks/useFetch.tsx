import { useState } from "react";

type FetchOptions<T> = RequestInit & { body?: T };
type Data<T> = T | null;

interface TypeReturn<T> {
  data: Data<T>;
  loading: boolean;
  error: string | null;
  fetchApi: (url: string, fetchOptions?: FetchOptions<T>) => Promise<T | void>;
}

const useFetch = <T,>(): TypeReturn<T> => {
  const [data, setData] = useState<Data<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = async (
    url: string,
    fetchOptions?: FetchOptions<T>
  ): Promise<T | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        setError("Error to response API");
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const dataJSON = await response.json();
      setData(dataJSON);
      return dataJSON;
    } catch (e) {
      setError("There is an issue with API petition");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchApi };
};

export default useFetch;
