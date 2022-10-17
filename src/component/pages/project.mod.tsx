import * as React from 'react';
import type { US_projectListState, U_projectState, UL_projectListResponseData,UL_projectListPatchData } from '../struct/interface';
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { T_LocalData_W_DP } from '../../store/reducer';
import { M_LocalData } from '../../store/models';
import { DEL_USER_INFO } from '../../store/constants';
import { getData,postData } from './global.mod';
import { API_PROJ_LIST,API_PROJ_UPDT } from '../struct/constant';

const MONTH_LIST:Array<string> = [
    "January","February","May","June","July",
    "August","September","October","November",
    "December"
]

export {
    React,
    Swal,
    connect,
    withReactContent,
    getData,
    postData,
    DEL_USER_INFO,
    MONTH_LIST,
    API_PROJ_LIST,
    API_PROJ_UPDT
};
export type {
    US_projectListState,
    U_projectState,
    T_LocalData_W_DP,
    M_LocalData,
    UL_projectListResponseData,
    UL_projectListPatchData
};