/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import AppIntroReducer from './appIntro';
import LoadingReducer from './loading';
import NavigationReduxReducer from './navigation_redux';
import UserReducer from './user';
import AuthReducer from './auth';
import whatsPageReduce from './whatsPage';
import laporanReduce from './laporan';
// import GlobalScreenActiveReducer from "./global_screen_active";
// import MapsReducer from "./maps";


const rootReducer = combineReducers({
  appIntro: AppIntroReducer,
  loading: LoadingReducer,
  navigationredux: NavigationReduxReducer,
  user: UserReducer,
  auth: AuthReducer,
  whatsPage: whatsPageReduce,
  // laporan: laporanReduce,
  // globalScreenActive: GlobalScreenActiveReducer,
  // maps: MapsReducer
});
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
