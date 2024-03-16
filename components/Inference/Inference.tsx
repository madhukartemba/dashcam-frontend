import React, { useEffect } from 'react';
import { useGetData } from '../../hooks/useGetData';
import Loading from '../Loading';
import TrafficLight from './TrafficLight';
import { ActionMap, Actions } from './Actions';
import SoundManager from '../sound/SoundManager';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProgressBarComponent from '../ProgressBar';

const ACTIONS_BUFFER_SIZE_MULTIPLIER = 10

const actionsInstance = new Actions(ActionMap, ACTIONS_BUFFER_SIZE_MULTIPLIER * 2);


export const Inference = () => {
    const { data, error } = useGetData();

    useEffect(() => {
        if (data && data.status == 'inference') {
            SoundManager.playStartupSound()
        }
    }, [data?.status])


    if (error) {

        if (error.name == 'AbortError') {
            return <ErrorPage text='Request Aborted' />
        }

        return <Loading text="Connecting" />;
    }

    if (data) {
        switch (data.status) {
            case 'recovery':
                return <ProgressBarComponent text={`Recovering`} progress={data.recoveryPercent} />;
            case 'inference':
                actionsInstance.act(data.trafficLightColor);
                return <TrafficLight data={data} />;
            case 'idle':
                return <ErrorPage text={`Server is idle`} />;
            default:
                return null;
        }
    }

};