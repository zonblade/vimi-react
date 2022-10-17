import * as React from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth';
import ProjectPage from './pages/project';
import { U_indexState } from './struct/interface';
import { connect } from "react-redux";
import type { T_LocalData,T_LocalData_W_DP } from '../store/reducer';
import { resetData,setData } from '../store/actions';
import { M_LocalData } from '../store/models';
import { DEL_USER_INFO,SET_USER_INFO } from '../store/constants';

export {
    React,
    Route,
    Routes,
    connect,
    Navigate,
    AuthPage,
    ProjectPage,
    resetData,
    setData,
    DEL_USER_INFO,
    SET_USER_INFO
};
export type {
    U_indexState,
    T_LocalData,
    M_LocalData,
    T_LocalData_W_DP
};