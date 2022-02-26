/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Image, LogBox, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Modal, Dimensions, Pressable } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
// import Database from "../../../db/database";
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import { Avatar, ActivityIndicator, Divider, FAB, Colors } from 'react-native-paper';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFh from 'react-native-vector-icons/Feather';
import 'intl';
import 'intl/locale-data/jsonp/id';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { StackBeranda } from '../../../interfaceRoutes';
import moment from 'moment';
import { setShowTab } from '../../store/navigationRedux';
import { setPage } from '../../store/whatsPage';
// import Animated from 'react-native-reanimated';
import IconEntypo from 'react-native-vector-icons/Entypo';
import InfoScreen from '../Info';
import { StyleSheet } from 'react-native';
import { getAllCatatan, getAllKategori, getFilterCatatanByMonth } from '../../../db/database';
import DetailScreen from '../DetailCatatan';
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
      <View style={{marginHorizontal: 10}}>
        <HomeOrganims name={user.name}/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
