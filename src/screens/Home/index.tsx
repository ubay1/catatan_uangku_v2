/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
// import Database from "../../../db/database";
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import 'intl';
import 'intl/locale-data/jsonp/id';
import { StackHome } from '../../../interfaceRoutes';
// import Animated from 'react-native-reanimated';
import HomeOrganims from '../../components/organisms/Home';
export interface IListKategori {
  id: any,
  nama_kategori: any,
}

const HomeScreen = ({ navigation }: StackHome) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeOrganims name={user.name} pageActive={whatspage.page} navigation={navigation}/>
    </ScrollView>
  );
};

export default HomeScreen;
