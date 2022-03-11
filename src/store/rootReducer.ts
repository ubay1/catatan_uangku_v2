/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import AppIntroReducer from './appIntro';
import LoadingReducer from './loading';
import NavigationReduxReducer from './navigationRedux';
import UserReducer from './user';
import AuthReducer from './auth';
import whatsPageReduce from './whatsPage';
import laporanReduce from './laporan';
import listNoteReducer from './listNote';
import categoryReducer from './category';
// import GlobalScreenActiveReducer from "./global_screen_active";
// import MapsReducer from "./maps";


const rootReducer = combineReducers({
  appIntro: AppIntroReducer,
  loading: LoadingReducer,
  navigationredux: NavigationReduxReducer,
  user: UserReducer,
  auth: AuthReducer,
  whatsPage: whatsPageReduce,
  listNote: listNoteReducer,
  category: categoryReducer,
  // laporan: laporanReduce,
  // globalScreenActive: GlobalScreenActiveReducer,
  // maps: MapsReducer
});
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
