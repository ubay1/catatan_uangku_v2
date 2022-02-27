/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import {StackAddNote} from '../../../interfaceRoutes';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import FormInput from '../molecules/addNote/FormInput';
import Header from '../molecules/addNote/Header';
import { IPropsAddNote } from '../molecules/addNote/types';

const AddNote = ({navigation, route}: IPropsAddNote) => {
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

export default AddNote;
