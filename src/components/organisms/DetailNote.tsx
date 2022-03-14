/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView, LogBox } from 'react-native';
import { useDispatch } from 'react-redux';
import {StackAddNote} from '../../../interfaceRoutes';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import FormInput from '../molecules/detailNote/FormInput';
import Header from '../atoms/header/Header';
import { IPropsAddNote } from '../molecules/addNote/types';
import { IPropsEditNote } from '../molecules/detailNote/types';

const DetailNoteOrganisms = ({navigation, route}: IPropsEditNote) => {
  const {title, data: dataProps, listKategori, listAtm, saldoAtm, saldoDompet} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setHideTab());
    navigation.addListener('beforeRemove', (param: any) => {
      console.log('back to admin');
      dispatch(setShowTab());
    });
  }, [navigation]);
  // const [data, setData] = React.useState(null);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 0}}>
        <Header navigation={navigation} title={title}/>
        <FormInput navigation={navigation} route={route}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailNoteOrganisms;
