/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {getFilterCatatanByMonth} from '../../../db/database';
import ListCatatan from '../molecules/note/ListCatatan';
import ListSaldo from '../molecules/note/ListSaldo';
import SelectMonth from '../atoms/SelectMonth';
import {StackListNotePerAtm, StackNote} from '../../../interfaceRoutes';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {
  setListNote,
  setTotalSaldo,
  setTotalSaldoPemasukan,
  setTotalSaldoPengeluaran,
} from '../../store/listNote';
import TextAtom from '../atoms/text/TextAtom';
import Header from '../atoms/header/Header';

const ListNotePerAtmOrganisms = ({route, navigation}: StackListNotePerAtm) => {
  const {nama_atm} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [selectJenisFilter, setselectJenisFilter] = useState('');
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ select month ------------------------------ */
  const eventSelectTypeNote = (type: string) => {
    if (type === 'customTanggal') {
      // showModalCustomDate();
      setselectJenisFilter('');
      navigation.navigate('FilterCustomTanggalNote');
    } else if (type === 'bulanIni') {
      // setfetchAllCatatan(true);
      getCatatanByMonth(moment().format('M'));
    } else if (type === 'bulanLalu') {
      // setfetchAllCatatan(true);
      getCatatanByMonth(moment().subtract(1, 'months').format('M'));
    }
  };

  /* ------------------------------ select month ------------------------------ */

  const getCatatanByMonth = async (month: any) => {
    try {
      const result: any = await getFilterCatatanByMonth(month);

      dispatch(setListNote({data: result}));

      if (result.length === 0) {
        dispatch(setTotalSaldo({totalSaldo: 0}));
        dispatch(setTotalSaldoPemasukan({totalSaldoPemasukan: 0}));
        dispatch(setTotalSaldoPengeluaran({totalSaldoPengeluaran: 0}));
      } else {
        console.log(result);
        const all_total: any[] = [];
        const total_pemasukan: any[] = [];
        const total_pengeluaran: any[] = [];

        result.forEach((item: any) => {
          if (item.tipe === 'pemasukan') {
            total_pemasukan.push(parseInt(item.nominal));
            all_total.push(parseInt(item.nominal));
          } else {
            total_pengeluaran.push(parseInt(item.nominal));
            all_total.push(parseInt(item.nominal));
          }
        });

        const reduce_all_total = all_total.reduce((a, b) => a + b, 0);
        const reduce_total_pemasukan = total_pemasukan.reduce(
          (a, b) => a + b,
          0,
        );
        const reduce_total_pengeluaran = total_pengeluaran.reduce(
          (a, b) => a + b,
          0,
        );

        dispatch(setTotalSaldo({totalSaldo: reduce_all_total}));
        dispatch(
          setTotalSaldoPemasukan({totalSaldoPemasukan: reduce_total_pemasukan}),
        );
        dispatch(
          setTotalSaldoPengeluaran({
            totalSaldoPengeluaran: reduce_total_pengeluaran,
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 65}}>
        <Header
          navigation={navigation}
          title={`List Catatan Atm ${nama_atm}`}
        />
        <SelectMonth
          selectJenisFilter={selectJenisFilter}
          eventSelectTypeNote={eventSelectTypeNote}
        />
        <TextAtom value={nama_atm} mTop={80} />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
});

export default ListNotePerAtmOrganisms;
