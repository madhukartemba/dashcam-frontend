
import React from 'react';
import { useGetData } from '../../hooks/useGetData';
import Loading from '../Loading';
import TrafficLight from './TrafficLight';


export const Inference = () => {
    const [data, error] = useGetData();

    if (error) {
        return <Loading text="Connecting" />;
    }

    if (data) {
        switch (data.status) {
            case 'recovery':
                return <Loading text={`Recovering video ${data.recoveryPercent}%`} />;
            case 'inference':
                return <TrafficLight data={data} />;
            case 'idle':
                return <Loading text={`Server is idle`} />;
            default:
                return null;
        }
    }

};