/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { getFilterCatatanByDate } from '../../../db/database';
import ListCatatan from '../molecules/note/ListCatatan';
import ListSaldo from '../molecules/note/ListSaldo';
import SelectMonth from '../molecules/note/SelectMonth';

const NoteOrganisms = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const [loading, setloading] = useState(false);
  const [selectJenisFilter, setselectJenisFilter] = useState('');
  const [allCatatan, setallCatatan] = useState([]);
  const [allTotal, setallTotal] = useState(0);
  const [totalPemasukan, settotalPemasukan] = useState(0);
  const [totalPengeluaran, settotalPengeluaran] = useState(0);

  /* ------------------------------- custom date ------------------------------ */
  const [visibleCustomDate, setVisibleCustomDate] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [modeFromDate, setModeFromDate] = useState('date');
  const [showFromDate, setShowFromDate] = useState(false);
  const [modeToDate, setModeToDate] = useState('date');
  const [showToDate, setShowToDate] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ select month ------------------------------ */
  const eventSelectTypeNote = (type: string) => {
    if (type === 'customTanggal') {
      showModalCustomDate();
    } else if (type === 'bulanIni') {
      // setfetchAllCatatan(true);
      // getCatatanByMonth(moment().format('M'));
    } else if (type === 'bulanLalu') {
      // setfetchAllCatatan(true);
      // getCatatanByMonth(moment().subtract(1, 'months').format('M'));
    }
  };

  const showModalCustomDate = () => setVisibleCustomDate(true);
  const eventCloseModalCustom = () => {
    setVisibleCustomDate(false);
    setselectJenisFilter('');
    setfromDate(new Date());
    settoDate(new Date());
  };

  const getCatatanByDate = () => {
    getFilterCatatanByDate(fromDate, toDate)
      .then((respListCatatan: any) => {
        console.log('data catatan by date = ', respListCatatan);
        setVisibleCustomDate(false);
        setfromDate(new Date());
        settoDate(new Date());
        setloading(false);
        setselectJenisFilter('');

        if (respListCatatan.length === 0) {
          setallTotal(0);
          settotalPemasukan(0);
          settotalPengeluaran(0);
          ToastAndroid.showWithGravity(
            'Data tidak ditemukan',
            ToastAndroid.LONG,
            ToastAndroid.LONG
          );
          setallCatatan([]);
        } else {
          const all_total: any[] = [];
          const total_pemasukan: any[] = [];
          const total_pengeluaran: any[] = [];
          respListCatatan.forEach((item: any) => {
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

          setallCatatan([]);
          setallCatatan(respListCatatan);
          setallTotal(reduce_all_total);
          settotalPemasukan(reduce_total_pemasukan);
          settotalPengeluaran(reduce_total_pengeluaran);
        }

        setloading(false);
      })
      .catch((err) => {
        console.log('error = ', err);
        setloading(false);
        ToastAndroid.showWithGravity(
          'Terjadi kesalahan dari server',
          ToastAndroid.LONG,
          ToastAndroid.LONG
        );
      })
      .finally(() => {
        setloading(false);
      });
  };

  const onChangeFromDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || fromDate;
    setfromDate(currentDate);
    // settampungJenisFilterfromDate(currentDate);
    setShowFromDate(false);
  };

  const showModeFromDate = (currentMode: React.SetStateAction<string>) => {
    setShowFromDate(true);
    setModeFromDate(currentMode);
  };

  const showDatepickerFromDate = () => {
    showModeFromDate('date');
  };

  const onChangeToDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || toDate;
    settoDate(currentDate);
    // settampungJenisFiltertoDate(currentDate);
    setShowToDate(false);
  };

  const showModeToDate = (currentMode: React.SetStateAction<string>) => {
    setShowToDate(true);
    setModeToDate(currentMode);
  };

  const showDatepickerToDate = () => {
    showModeToDate('date');
  };

  /* ------------------------------ select month ------------------------------ */

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View style={stylesCustom.container}>
      <SelectMonth
        loading={loading}
        fromDate={fromDate}
        toDate={toDate}
        selectJenisFilter={selectJenisFilter}
        showFromDate={showFromDate}
        showToDate={showToDate}
        modeFromDate={modeFromDate}
        modeToDate={modeToDate}
        eventSelectTypeNote={eventSelectTypeNote}
        visibleCustomDate={visibleCustomDate}
        isShowFromDateCustom={showFromDate}
        isShowToDateCustom={showToDate}
        eventCloseModalCustom={eventCloseModalCustom}
        onChangeFromDate={onChangeFromDate}
        showDatepickerFromDate={showDatepickerFromDate}
        onChangeToDate={onChangeToDate}
        showDatepickerToDate={showDatepickerToDate}
      />
      <ListSaldo />
      <ListCatatan />
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
