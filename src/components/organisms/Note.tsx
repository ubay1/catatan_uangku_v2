/* eslint-disable radix */

/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Colors, Button } from 'react-native-paper';
import { getFilterCatatanByDate, getFilterCatatanByMonth } from '../../../db/database';
import { COLOR_ACTIVE } from '../../assets/styles/global';
import ModalAtom from '../atoms/alert/ModalAtom';
import ButtonAtom from '../atoms/button/ButtonAtom';
import TextAtom from '../atoms/text/TextAtom';
import ListCatatan from '../molecules/note/ListCatatan';
import ListSaldo from '../molecules/note/ListSaldo';
import SelectMonth from '../molecules/note/SelectMonth';
import styles from '../../assets/styles/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterNote from '../../screens/Note/FilterNote';
import { StackCatatan } from '../../../interfaceRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { AppDispatch } from '../../store';
import { setListNote, setTotalSaldo, setTotalSaldoPemasukan, setTotalSaldoPengeluaran } from '../../store/listNote';


const NoteOrganisms = ({route, navigation}: StackCatatan) => {
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
      navigation.navigate('FilterNote');
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
        const reduce_total_pemasukan = total_pemasukan.reduce((a, b) => a + b, 0);
        const reduce_total_pengeluaran = total_pengeluaran.reduce((a, b) => a + b, 0);

        dispatch(setTotalSaldo({totalSaldo: reduce_all_total}));
        dispatch(setTotalSaldoPemasukan({totalSaldoPemasukan: reduce_total_pemasukan}));
        dispatch(setTotalSaldoPengeluaran({totalSaldoPengeluaran: reduce_total_pengeluaran}));
      }
    } catch (error) {
      console.log(error);
    }

  };

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View style={stylesCustom.container}>
      <SelectMonth
        selectJenisFilter={selectJenisFilter}
        eventSelectTypeNote={eventSelectTypeNote}
      />
      <ListSaldo />
      <ListCatatan />

      {/* <ModalAtom
        closeModal={eventCloseModalCustom}
        visible={visibleCustomDate}
        setPageActive="Note"
      >
        <FilterNote />
      </ModalAtom> */}
    </View>
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

export default NoteOrganisms;
