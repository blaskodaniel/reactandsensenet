import React from 'react'
import { sleepAsync } from '@sensenet/client-utils'

interface IuseFetch {
    url: string,
    options?: RequestInit | {}
}

export const useFetch = ({url, options}: IuseFetch) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  
  React.useEffect(() => {
    const ac = new AbortController()
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://snstoreforms.sensenet.com/"+url, {
            signal: ac.signal,
            credentials: 'include',
            ...options
        });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        if(!ac.signal.aborted){
            setError(error);
        }  
      } finally {
        await sleepAsync(300)
        setIsLoading(false);
      }
    };
    fetchData();
    return () => ac.abort()
  }, [url,options]);
  
  return { response, error, isLoading };
};
