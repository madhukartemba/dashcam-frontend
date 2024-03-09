import React, { useEffect, useState } from 'react';

export type Status = {
    startup: true | false
};

export function useGetStatus(apiUrl: string, interval: number): [Status | null, boolean, Error | null] {
    const [data, setData] = useState<Status | null>(null);
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
