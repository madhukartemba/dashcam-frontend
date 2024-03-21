import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

type Props = {
    speedMs: number | null,
    speedKmph: number | null,
}

const useGpsSpeed = (): Props => {
    const [speed, setSpeed] = useState(null);

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            (position: any) => {
                setSpeed(position.coords.speed);
            },
            (error: unknown) => {
                console.log(error);
            },
            { enableHighAccuracy: true, distanceFilter: 1 }
        );

        const intervalId = setInterval(() => {
            Geolocation.getCurrentPosition(
                (position: any) => {
                    setSpeed(position.coords.speed);
                },
                (error: unknown) => {
                    console.log(error);
                },
                { enableHighAccuracy: true }
            );
        }, 100);

        return () => {
            Geolocation.clearWatch(watchId);
            clearInterval(intervalId);
        };
    }, []);

    return {
        speedMs: speed,
        speedKmph: speed !== null ? (speed * 3.6) : null
    };
};

export default useGpsSpeed;
