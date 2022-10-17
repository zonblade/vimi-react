import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { M_LocalData } from './models';
import { DEL_USER_INFO, SET_USER_INFO } from './constants';
import * as actions from './actions';

export type LocalDataAction = ActionType<typeof actions>;

export type T_LocalData = {
    local: M_LocalData
}

export type T_LocalData_W_DP = {
    local: M_LocalData,
    renderCallback:any,
    resetData:(type:string,payload:M_LocalData)=>typeof actions.resetData,
    setData:(type:string,payload:M_LocalData)=>typeof actions.setData
}

const LocalDatasInitial: T_LocalData = {
    local: {
        username: null,
        token: null,
        remember: false,
        lang: "EN"
    }
}

export default combineReducers<T_LocalData, LocalDataAction>({
    local: (state = LocalDatasInitial.local, action) => {
        switch (action.type) {
            case DEL_USER_INFO:
                return {
                    username: null,
                    token: null,
                    remember: false,
                    lang: "EN"
                };

            case SET_USER_INFO:
                return {
                    username : action.payload.username,
                    token : action.payload.token,
                    remember : action.payload.remember,
                    lang : "EN"
                };

            default:
                return state;
        }
    }
})