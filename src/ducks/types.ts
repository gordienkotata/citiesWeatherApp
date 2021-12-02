
import { LogicAction } from 'appTypes/index';

import { StateItem, weatherActionTypes } from 'appDucks/weather';

export type LoadLogic = LogicAction<typeof weatherActionTypes.LOAD_ERROR | typeof weatherActionTypes.LOAD_SUCCESS, Map<string, StateItem>>;

export type WeatherLogicType = LoadLogic;
