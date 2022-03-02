/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Button, Colors} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import realm from 'realm';
import {
  getAllKategori,
  getAllCatatan,
  getSepuluhCatatanTerakhir,
  deleteCatatan,
} from '../../../db/database';
import {AppDispatch} from '../../store';
import {setPage} from '../../store/whatsPage';
import ModalAtom from '../atoms/alert/ModalAtom';
import TextAtom from '../atoms/text/TextAtom';
import Greeting from '../molecules/home/Greeting';
import ListHistoryCatatan from '../molecules/home/ListHistoryCatatan';
import ListSaldo from '../molecules/home/ListSaldo';
import {IPropsHomeScreen} from '../molecules/home/types';
import styles from '../../assets/styles/global';
import {RootState} from '../../store/rootReducer';

const HomeOrganims = ({name, pageActive, navigation}: IPropsHomeScreen) => {
  const dispatch: AppDispatch = useDispatch();
  const whatspage = useSelector((state: RootState) => state.whatsPage);

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
    totalPengeluaran: 0,
    saldoAtm: 0,
    saldoDompet: 0,
  });

  // modal delete
  const [idCatatan, setIdCatatan] = React.useState(0);
  const [visibleModalDelete, setVisibleModalDelete] = React.useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

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
    let totalPengeluaranSemuaSaldo: number = 0;

    if (allCatatan.length !== 0) {
      allCatatan.forEach((item: any) => {
        // jika akun ATM
        if (item.akun === 'atm') {
          if (item.tipe === 'pemasukan') {
            pemasukan_atm.push(item.nominal);
          } else {
            // if (item.tujuan === 'tarik tunai') {
            //   pemasukan_dompet.push(item.nominal);
            //   pengeluaran_atm.push(item.nominal);
            // } else {
            //   pengeluaran_atm.push(item.nominal);
            // }
            pengeluaran_atm.push(item.nominal);
          }
        } else {
          if (item.tipe === 'pemasukan') {
            pemasukan_dompet.push(item.nominal);
          } else {
            pengeluaran_dompet.push(item.nominal);
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
      (totalPemasukanAtm + totalPemasukanDompet) -
      (totalPengeluaranAtm + totalPengeluaranDompet);
    totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
    totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;
    totalPengeluaranSemuaSaldo = totalPengeluaranAtm + totalPengeluaranDompet;

    console.log(
      totalPengeluaranSemuaSaldo
    );

    setAllBalanceData({
      pemasukanAtm: totalPemasukanAtm,
      pengeluaranAtm: totalPengeluaranAtm,
      pemasukanDompet: totalPemasukanDompet,
      pengeluaranDompet: totalPengeluaranDompet,
      totalSaldo: totalSaldo,
      totalPengeluaran: totalPengeluaranSemuaSaldo,
      saldoAtm: totalSaldoAtm,
      saldoDompet: totalSaldoDompet,
    });
  }, [allCatatan]);

  React.useEffect(() => {
    if (whatspage.page === 'UpdateBeranda') {
      closeModalDelete();
      loadAll();
    }
  }, [whatspage]);
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

  /* ------------------------------ modal delete ------------------------------ */
  const showModalDelete = (id: number) => {
    setIdCatatan(id);
    setVisibleModalDelete(true);
  };

  const closeModalDelete = () => {
    setVisibleModalDelete(false);
  };

  const submitDeleteNote = (id: number) => {
    setVisibleModalDelete(false);
    setLoading(true);
    setAllCatatan([]);
    setAllKategori([]);

    deleteCatatan(id)
      .then(() => {
        // dispatch(setPage({page: 'UpdateBeranda'}));
        loadAll();
      })
      .catch(err => {
        console.log('error = ', err);
      });
  };

  const ModalOpenDelete = () => {
    return (
      <ModalAtom closeModal={closeModalDelete} visible={visibleModalDelete}>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginHorizontal: 10,
          }}>
          <View>
            <TextAtom fontWeight={'bold'} value="Yakin mau hapus ?" size={30} />
            <TextAtom
              fontWeight={'bold'}
              color={Colors.grey400}
              value="data yang telah dihapus"
              size={30}
            />
            <TextAtom
              fontWeight={'bold'}
              color={Colors.grey400}
              value="tidak dapat dikembalikan"
              size={30}
            />

            <View style={{marginTop: 20}}>
              <Button
                dark
                uppercase={false}
                color="#2196F3"
                mode="contained"
                onPress={() => {
                  closeModalDelete();
                  dispatch(setPage({page: 'Beranda'}));
                }}
                contentStyle={{}}
                style={{...styles.button, width: '100%', marginHorizontal: 0}}
                theme={{colors: {disabled: 'grey'}}}>
                <TextAtom
                  value="Tidak"
                  color="#fff"
                  textTransform={'uppercase'}
                />
              </Button>
              <Button
                dark
                uppercase={false}
                color="#f24b51"
                mode="contained"
                onPress={() => {
                  submitDeleteNote(idCatatan);
                }}
                contentStyle={{}}
                style={{...styles.button, width: '100%', marginHorizontal: 0}}
                theme={{colors: {disabled: 'grey'}}}>
                <TextAtom
                  value="Ya, Hapus"
                  color="#fff"
                  textTransform={'uppercase'}
                />
              </Button>
            </View>
          </View>
        </View>
      </ModalAtom>
    );
  };
  /* ------------------------------ modal delete ------------------------------ */

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
        openModalDelete={showModalDelete}
      />
      <ModalOpenDelete />
    </React.Fragment>
  );
};

export default HomeOrganims;
