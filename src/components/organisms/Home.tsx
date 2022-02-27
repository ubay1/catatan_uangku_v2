/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  getAllKategori,
  getAllCatatan,
  getSepuluhCatatanTerakhir,
} from '../../../db/database';
import { AppDispatch } from '../../store';
import { setPage } from '../../store/whatsPage';
import Greeting from '../molecules/home/Greeting';
import ListHistoryCatatan from '../molecules/home/ListHistoryCatatan';
import ListSaldo from '../molecules/home/ListSaldo';
import {IPropsHomeScreen} from '../molecules/home/types';

const HomeOrganims = ({name, pageActive, navigation}: IPropsHomeScreen) => {
  const dispatch: AppDispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  // const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [allKategori, setAllKategori] = React.useState([]);
  const [allCatatan, setAllCatatan] = React.useState([]);

  const [allBalanceData, setAllBalanceData] = React.useState({
    pemasukanAtm: 0,
    pemasukanDompet: 0,
    pengeluaranAtm: 0,
    pengeluaranDompet: 0,
    totalSaldo: 0,
    saldoAtm: 0,
    saldoDompet: 0,
  });

  React.useEffect(() => {
    loadAll();
  }, []);

  React.useEffect(() => {
    console.log(pageActive);
    if (pageActive === 'updateBeranda') {
      loadAll();
      dispatch(setPage({page: 'Beranda'}));
    }
  }, [pageActive]);

  // cek data allCatatan
  React.useEffect(() => {
    let pemasukan_atm: any[] = [];
    let pemasukan_dompet: any[] = [];
    let pengeluaran_atm: any[] = [];
    let pengeluaran_dompet: any[] = [];

    let totalPemasukanAtm: number = 0;
    let totalPemasukanDompet: number = 0;
    let totalPengeluaranAtm: number = 0;
    let totalPengeluaranDompet: number = 0;
    let totalSaldo: number = 0;
    let totalSaldoAtm: number = 0;
    let totalSaldoDompet: number = 0;

    if (allCatatan.length !== 0) {
      allCatatan.forEach((item: any) => {
        // jika akun ATM
        if (item.akun === 'atm') {
          if (item.tipe === 'pemasukan') {
            pemasukan_atm.push(parseInt(item.nominal));
          } else {
            if (item.tujuan === 'tarik tunai') {
              pemasukan_dompet.push(parseInt(item.nominal));
              pengeluaran_atm.push(parseInt(item.nominal));
            } else {
              pengeluaran_atm.push(parseInt(item.nominal));
            }
          }
        } else {
          if (item.tipe === 'pemasukan') {
            pemasukan_dompet.push(parseInt(item.nominal));
          } else {
            pengeluaran_dompet.push(parseInt(item.nominal));
          }
        }
      });

      totalPemasukanAtm = pemasukan_atm.reduce((a, b) => a + b, 0);
      totalPemasukanDompet = pemasukan_dompet.reduce((a, b) => a + b, 0);
      totalPengeluaranAtm = pengeluaran_atm.reduce((a, b) => a + b, 0);
      totalPengeluaranDompet = pengeluaran_dompet.reduce((a, b) => a + b, 0);
    } else {
      totalPemasukanAtm = 0;
      totalPemasukanDompet = 0;
      totalPengeluaranAtm = 0;
      totalPengeluaranDompet = 0;
    }

    totalSaldo =
      totalPemasukanAtm +
      totalPemasukanDompet -
      (totalPengeluaranAtm + totalPengeluaranDompet);
    totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
    totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;

    setAllBalanceData({
      pemasukanAtm: totalPemasukanAtm,
      pengeluaranAtm: totalPengeluaranAtm,
      pemasukanDompet: totalPemasukanDompet,
      pengeluaranDompet: totalPengeluaranDompet,
      totalSaldo: totalSaldo,
      saldoAtm: totalSaldoAtm,
      saldoDompet: totalSaldoDompet,
    });
  }, [allCatatan]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadAll();
  //   }, [])
  // );
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const loadAll = async () => {
    setLoading(true);
    try {
      const values: any = await Promise.all([
        getAllKategori(),
        getSepuluhCatatanTerakhir(),
      ]);
      const responseGetListKategori = values[0].map((item: any) => item);
      setAllKategori(responseGetListKategori);

      const responseGetListCatatan = values[1].map((item: any) => item);
      setAllCatatan(responseGetListCatatan);

      console.log(responseGetListKategori, responseGetListCatatan);
    } catch (error) {
      console.log('error load all');
    } finally {
      setLoading(false);
      console.log('sukses load all');
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <React.Fragment>
      <Greeting name={name} />
      <ListSaldo loading={loading} allBalanceData={allBalanceData} />
      <ListHistoryCatatan
        loading={loading}
        allKategori={allKategori}
        allCatatan={allCatatan}
        saldoAtm={allBalanceData.saldoAtm}
        saldoDompet={allBalanceData.saldoDompet}
        navigation={navigation}
      />
    </React.Fragment>
  );
};

export default HomeOrganims;
