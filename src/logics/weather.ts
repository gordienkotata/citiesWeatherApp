import { createLogic } from 'redux-logic';
import { Process } from 'appTypes/index';
import { weatherActionTypes } from 'appDucks/weather';
import * as $$weather from 'appDucks/weather';

const appid = '4ee4fac42cafdc82c99525f81fc7559a';

const loadLogic = createLogic({
    type: weatherActionTypes.LOAD_REQUEST,
    processOptions: {
        dispatchReturn: true,
        successType: weatherActionTypes.LOAD_SUCCESS,
        failType: (data) => ({type: weatherActionTypes.LOAD_ERROR, payload: data}),
    },

    async process({ action, getState }: Process<ReturnType<typeof $$weather.actions.load>>) {
        const { cityName } = action;
        const { weather } = getState();
        const clonedWeather = new Map(weather);
        try {
            const { main: weather } = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=metric`, {
                method: 'GET'
            }).then((response) =>{
                if(response.status !== 200){
                    throw Error;
                }
                return response.json();
            });
            clonedWeather.set(cityName, { error: false, weather });
            return clonedWeather;

        }catch(e) {
            clonedWeather.set(cityName, { error: true, weather: null });
            throw clonedWeather;
        }
    },
});

export default [loadLogic];
