import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const useGpsSpeed = () => {
    const [speed, setSpeed] = useState(null);

    useEffect(() => {
        let watchId = Geolocation.watchPosition(
            (position: any) => {
                setSpeed(position.coords.speed);
            },
            (error: unknown) => {
                console.log(error);
            },
            { enableHighAccuracy: true, distanceFilter: 1 }
        );

        const intervalId = setInterval(() => {
            watchId = Geolocation.getCurrentPosition(
                (position: any) => {
                    setSpeed(position.coords.speed);
                },
                (error: unknown) => {
                    console.log(error);
                },
                { enableHighAccuracy: true }
            );
        }, 1000);

        return () => {
            Geolocation.clearWatch(watchId);
            clearInterval(intervalId);
        };
    }, []);

    return speed;
};

export default useGpsSpeed;
