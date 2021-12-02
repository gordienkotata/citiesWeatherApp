

import CityForm from 'appComponents/CityForm';
import CityTable from 'appComponents/CityTable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as $$weather from 'appDucks/weather';


import css from './styles.css';
export const dateFormat = 'YYYY-MM-DD hh:mm A';

export const MainApp = () => {
    const dispatch = useDispatch();
    const { load: loadCityWeather, delete: deleteCityWeather } = $$weather.actions;

    const handleSetCity = (value = '') => {
        dispatch(loadCityWeather(value));
    };

    const handleDeleteCity = (value = '') => {
        dispatch(deleteCityWeather(value));
    };
    
    return (
        <div className={css.container}>
            <CityForm onSubmit={handleSetCity}/>
            <CityTable onDelete={handleDeleteCity}/>
        </div>
    );
};
