import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export type Data = {
    lightColor: 'red' | 'green' | 'yellow' | null;
    fps: number;
};

export function useGetData(): [Data | null, boolean, Error | null] {

    const url = useSelector((state: any) => state.urlReducer)
    const interval = useSelector((state: any) => state.intervalReducer)

    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${url}/data`);
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } catch (error: any) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [url, interval]);

    return [data, isLoading, error];
}

