/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { getAllKategori } from '../../../db/database';
import {StackAddNote} from '../../../interfaceRoutes';
import { COLOR_BLACK } from '../../assets/styles/global';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import { setPage } from '../../store/whatsPage';
import OverlayWithText from '../atoms/overlay/OverlayWithText';
import TextAtom from '../atoms/text/TextAtom';
import FormInput from '../molecules/addNote/FormInput';
import HeaderAddNote from '../molecules/addNote/Header';
import { IPropsAddNote } from '../molecules/addNote/types';

const AddNote = ({navigation, route}: IPropsAddNote) => {
  const {title, data: dataProps, saldoAtm, saldoDompet} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  const [listKategori, setlistKategori] = React.useState([]);
  const [loadingScreen, setloadingScreen] = React.useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    navigation.addListener('focus', (e: any) => {
      dispatch(setHideTab());
      setloadingScreen(true);

      setTimeout(() => {
        getKategori();
      }, 0);

      console.log(saldoAtm, saldoDompet);
    });

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
  const getKategori = async () => {
    try {
      const result = await getAllKategori();
      setlistKategori(JSON.parse(JSON.stringify(result)));
    } catch (error) {
      console.log(error);
    } finally {
      setloadingScreen(false);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <OverlayWithText loadingScreen={loadingScreen}/>
        {/* <TextAtom value={loadingScreen.toString()}/> */}
        <ScrollView style={{marginHorizontal: 10, marginBottom: 0}}>
          <HeaderAddNote navigation={navigation} title={title}/>
          <FormInput navigation={navigation} route={route} listKategori={listKategori}/>
        </ScrollView>
    </SafeAreaView>
  );
};

export default AddNote;
