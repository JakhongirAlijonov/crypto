import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-XuGzvNKA2vQJxcY17KbzfTnE	",
    },
  };
  useEffect(() => {
    const fetchReq = async () => {
      try {
        setIsPending(true);
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReq();
  }, [url]);
  return { data, isPending, error };
};
