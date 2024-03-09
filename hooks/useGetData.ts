import React, { useEffect, useState } from 'react';

export type Data = {
    lightColor: 'red' | 'green' | 'yellow' | null;
    fps: number;
};

export function useGetData(apiUrl: string, interval: number): [Data | null, boolean, Error | null] {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(apiUrl);
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
    }, [apiUrl, interval]);

    return [data, isLoading, error];
}

