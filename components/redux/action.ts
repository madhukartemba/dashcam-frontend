import {UPDATE_INTERVAL, UPDATE_URL} from './constants';

export type ActionType = {
  type: string;
  data: any;
};

export function updateUrl(url: string): ActionType {
  return {
    type: UPDATE_URL,
    data: url,
  };
}

export function updateInterval(interval: number): ActionType {
  return {
    type: UPDATE_INTERVAL,
    data: interval,
  };
}
