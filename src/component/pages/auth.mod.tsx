import * as React from 'react';
import type { U_authState,UL_loginResponseData } from '../struct/interface';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { postData } from './global.mod';
import { connect } from "react-redux";
import { T_LocalData_W_DP } from '../../store/reducer';
import { resetData,setData } from '../../store/actions';
import { M_LocalData } from '../../store/models';
import { SET_USER_INFO } from '../../store/constants';

export {
    React,
    Swal,
    withReactContent,
    postData,
    connect,
    resetData,
    setData,
    SET_USER_INFO
};
export type {
    U_authState,
    UL_loginResponseData,
    T_LocalData_W_DP,
    M_LocalData
};