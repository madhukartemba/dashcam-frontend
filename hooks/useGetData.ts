import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export type Data = {
  status: 'inference' | 'recovery' | 'idle';
  recoveryPercent: number;
  trafficLightColor: 'red' | 'green' | 'yellow' | null;
  fps: number;
};

export function useGetData(): {
  data: Data | null;
  isLoading: boolean;
  error: Error | null;
} {
  const url = useSelector((state: any) => state.urlReducer);
  const interval = useSelector((state: any) => state.intervalReducer);

  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(url, {signal: controller.signal});
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [url, interval]);

  return {data, isLoading, error};
}
