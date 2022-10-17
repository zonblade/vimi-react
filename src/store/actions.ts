import { action } from 'typesafe-actions';
import { DEL_USER_INFO, SET_USER_INFO } from './constants';
import type {M_LocalData} from './models';

export const resetData = (type:string,data:M_LocalData) => action(type, data);
export const setData   = (type:string,data:M_LocalData) => action(type, data);