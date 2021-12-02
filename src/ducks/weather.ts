import { ActionTypes } from 'appTypes/index';
import { WeatherLogicType } from './types';

interface Weather {
    temp: number;
    pressure: number;
}

export const weatherActionTypes = {
    LOAD_REQUEST: 'weather/LOAD_REQUEST',
    LOAD_SUCCESS: 'weather/LOAD_SUCCESS',
    LOAD_ERROR: 'weather/LOAD_ERROR',
    DELETE: 'weather/DELETE',
} as const;

export const actions = {
    load: (cityName: string) => ({
        type: weatherActionTypes.LOAD_REQUEST,
        cityName
    }),
    delete: (cityName: string) => ({
        type: weatherActionTypes.DELETE,
        cityName
    }),
};

type WeatherAction = ActionTypes<typeof actions> | WeatherLogicType;

export interface StateItem {
    weather: Weather | null;
    error: boolean;
}
const initialState = new Map<string, StateItem>();

export const weatherReducer = (state = initialState, action: WeatherAction): Map<string, StateItem> => {
    switch (action.type) {
        
    case weatherActionTypes.LOAD_SUCCESS:
    case weatherActionTypes.LOAD_ERROR:
        return action.payload;
    
    case weatherActionTypes.DELETE:
        const { cityName } = action;
        const clonedState = new Map(state);
        clonedState.delete(cityName);
        return clonedState;
        
    default:
        return state;
    }
};
