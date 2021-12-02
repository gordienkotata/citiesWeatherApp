import React, { useState } from 'react';
import { Button } from 'antd';

import css from './styles.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { StateItem } from 'appDucks/weather';

interface Props {
    onDelete: (cityName: string) => void;
}

export const CityTable:React.FC<Props> = ({ onDelete }) => {
    const ascSorting = ([cityNameA]: [string, StateItem], [cityNameB]: [string, StateItem]) => cityNameA.localeCompare(cityNameB);
    const descSorting = ([cityNameA]: [string, StateItem], [cityNameB]: [string, StateItem]) => cityNameB.localeCompare(cityNameA);
    
    const weather = useSelector((state: RootState) => state.weather);


    const [sortingType, setSortingType] = useState('asc');

    const handleSetSortingType = () => {
        sortingType === 'asc' ? setSortingType('desc') : setSortingType('asc');
    };

    const sortingWeather = sortingType === 'asc' ? [...weather].sort(ascSorting) : [...weather].sort(descSorting);
    return (
        <div>
            <div className={css.header}>
                <span className={css.pointer} onClick={handleSetSortingType}>City</span>
                <span>Temperature</span>
                <span>Pressure</span>
                <span>Action</span>
            </div>
            {
                sortingWeather.map(([cityName, cityWeatherEntity]) => {
                    const { weather, error } = cityWeatherEntity;
                    if (error) {
                        return (
                            <div className={css.error} key={cityName}>
                                <span>{cityName}</span>
                                <span>произошла ошибка при загрузке данных </span>
                                <span>
                                    <Button onClick={()=> onDelete(cityName)}>Delete</Button>
                                </span>
                            </div>
                        );
                    }
                    return (
                        <div className={css.row} key={cityName}>
                            <span>{cityName}</span>
                            <span>{weather?.temp}</span>
                            <span>{weather?.pressure}</span>
                            <span>
                                <Button onClick={()=> onDelete(cityName)}>Delete</Button>
                            </span>
                        </div>
                    );
                })
            }

        </div>
    );
};
