/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import Header from '../atoms/header/Header';
import { IPropsAddAtm } from '../molecules/addAtm/types';
import FormInput from '../molecules/addAtm/FormInput';

const AddAtmOrganisms = ({navigation, route}: IPropsAddAtm) => {
  const {title, data: dataProps, saldoAtm, saldoDompet} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setHideTab());
    navigation.addListener('beforeRemove', (param: any) => {
      dispatch(setShowTab());
    });
  }, [navigation]);
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
        <Header navigation={navigation} title={'Tambah Atm'}/>
        <FormInput navigation={navigation} route={route} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAtmOrganisms;
