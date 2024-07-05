import { useEffect, useState } from "react";

type Return = [unknown | null, Error | null, boolean];

type Args = Parameters<typeof fetch>;

export default function useFetch(...[url, init]: Args): Return {
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [load, setLoad] = useState(true);
  async function GetData() {
    try {
      const resp = await fetch(url, init);
      setData(await resp.json());
    } catch (error) {
      setError(error as Error);
    }
    setLoad(false);
  }
  useEffect(() => {
    GetData();
  }, []);

  return [data, error, load];
}
