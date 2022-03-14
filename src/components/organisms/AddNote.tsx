/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { getAllAtm, getAllKategori } from '../../../db/database';
import {StackAddNote} from '../../../interfaceRoutes';
import { COLOR_BLACK } from '../../assets/styles/global';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import { setPage } from '../../store/whatsPage';
import OverlayWithText from '../atoms/overlay/OverlayWithText';
import TextAtom from '../atoms/text/TextAtom';
import FormInput from '../molecules/addNote/FormInput';
import Header from '../atoms/header/Header';
import { IPropsAddNote } from '../molecules/addNote/types';

const AddNoteOrganisms = ({navigation, route}: IPropsAddNote) => {
  const {title, data: dataProps, saldoAtm, saldoDompet} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  const [listKategori, setlistKategori] = React.useState([]);
  const [listAtm, setlistAtm] = React.useState([]);
  const [loadingScreen, setloadingScreen] = React.useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    navigation.addListener('focus', (e: any) => {
      dispatch(setHideTab());
      setloadingScreen(true);

      setTimeout(() => {
        // getKategori();
        loadAll();
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
  const loadAll = async () => {
    setloadingScreen(true);
    try {
      const values: any = await Promise.all([
        getAllKategori(),
        getAllAtm(),
      ]);
      const newListKategori: any = [];
      values[0].forEach((item: any) => {
        newListKategori.push({
          id: item.id,
          nama_kategori: item.nama_kategori,
          tipe_kategori: item.tipe_kategori,
        });
      });
      setlistKategori(newListKategori);

      const newListAtm: any = [];
      values[1].forEach((item: any) => {
        newListAtm.push({
          id: item.id,
          nama_atm: item.nama_atm,
        });
      });
      setlistAtm(newListAtm);

      console.log(newListKategori, newListAtm);
    } catch (error) {
      console.log('error load all');
    } finally {
      setloadingScreen(false);
      console.log('sukses load all');
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
          <Header navigation={navigation} title={title}/>
          <FormInput navigation={navigation} route={route} listKategori={listKategori} listAtm={listAtm}/>
        </ScrollView>
    </SafeAreaView>
  );
};

export default AddNoteOrganisms;
