import React, { useEffect } from 'react';
import { useGetData } from '../../hooks/useGetData';
import Loading from '../Loading';
import TrafficLight from './TrafficLight';
import { ActionMap, Actions } from './Actions';
import SoundManager from '../sound/SoundManager';

const ACTIONS_BUFFER_SIZE_MULTIPLIER = 10

const actionsInstance = new Actions(ActionMap);


export const Inference = () => {
    const { data, error } = useGetData();

    useEffect(() => {
        if (data && data.status == 'inference') {
            SoundManager.playStartupSound()
        }
    }, [data?.status])


    if (error) {
        return <Loading text="Connecting" />;
    }

    if (data) {
        switch (data.status) {
            case 'recovery':
                return <Loading text={`Recovering video ${data.recoveryPercent}%`} />;
            case 'inference':
                actionsInstance.act(data.trafficLightColor);
                actionsInstance.updateBufferSize(ACTIONS_BUFFER_SIZE_MULTIPLIER * data.fps);
                return <TrafficLight data={data} />;
            case 'idle':
                return <Loading text={`Server is idle`} />;
            default:
                return null;
        }
    }

};