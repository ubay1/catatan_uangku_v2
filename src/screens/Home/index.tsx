/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  } from 'react';
import { SafeAreaView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
// import Database from "../../../db/database";
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import 'intl';
import 'intl/locale-data/jsonp/id';
import { StackBeranda } from '../../../interfaceRoutes';
// import Animated from 'react-native-reanimated';
import HomeOrganims from '../../components/organisms/Home';
export interface IListKategori {
  id: any,
  nama_kategori: any,
}

const HomeScreen = ({ navigation }: StackBeranda) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeOrganims name={user.name} pageActive={whatspage.page} navigation={navigation}/>
    </SafeAreaView>
  );
};

export default HomeScreen;
