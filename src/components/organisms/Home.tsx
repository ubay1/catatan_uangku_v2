/* eslint-disable react-hooks/exhaustive-deps */
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
  getAllAtm,
  getAllEmoney,
  getSaldoByAtmName,
} from '../../../db/database';
import {AppDispatch} from '../../store';
import {setPage} from '../../store/whatsPage';
import ModalAtom from '../atoms/alert/ModalAtom';
import TextAtom from '../atoms/text/TextAtom';
import Greeting from '../molecules/home/Greeting';
import ListHistoryCatatan from '../molecules/home/ListHistoryCatatan';
import ListSaldo from '../molecules/home/ListSaldo';
import {IPropsHomeScreen} from '../molecules/home/types';
import styles, { COLOR_ACTIVE, COLOR_ERROR, COLOR_WHITE } from '../../assets/styles/global';
import {RootState} from '../../store/rootReducer';
import DeleteContent from '../atoms/DeleteContent';
import SnackbarAtom from '../atoms/alert/SnackbarAtom';
import { setCategory } from '../../store/category';

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
  const [allAtm, setAllAtm] = React.useState([]);
  const [allEmoney, setAllEmoney] = React.useState([]);

  // snackbar
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  const [allBalanceData, setAllBalanceData] = React.useState({
    pemasukanAtm: 0,
    pengeluaranAtm: 0,
    pemasukanDompet: 0,
    pengeluaranDompet: 0,
    pemasukanEmoney: 0,
    pengeluaranEmoney: 0,
    totalSaldo: 0,
    totalPengeluaran: 0,
    saldoAtm: 0,
    saldoDompet: 0,
    saldoEmoney: 0,
  });

  // modal delete
  const [idCatatan, setIdCatatan] = React.useState(0);
  const [visibleModalDelete, setVisibleModalDelete] = React.useState(false);

  React.useEffect(() => {
    loadAll();
  }, []);

  React.useEffect(() => {
    if (pageActive === 'updateHome') {
      loadAll();
      dispatch(setPage({page: 'Home'}));
    } else if (pageActive === 'updateCategory') {
      loadAll();
      dispatch(setPage({page: 'Category'}));
    }
  }, [pageActive]);

  // React.useEffect(() => {
  //   if (whatspage.page === 'updateHome') {
  //     closeModalDelete();
  //     loadAll();
  //   }
  // }, [whatspage]);

  // cek data allCatatan
  React.useEffect(() => {
    let pemasukan_atm: any[] = [];
    let pengeluaran_atm: any[] = [];
    let pemasukan_dompet: any[] = [];
    let pengeluaran_dompet: any[] = [];
    let pemasukan_emoney: any[] = [];
    let pengeluaran_emoney: any[] = [];

    let totalPemasukanAtm: number = 0;
    let totalPengeluaranAtm: number = 0;
    let totalPemasukanDompet: number = 0;
    let totalPengeluaranDompet: number = 0;
    let totalPemasukanEmoney: number = 0;
    let totalPengeluaranEmoney: number = 0;

    let totalSaldo: number = 0;
    let totalSaldoAtm: number = 0;
    let totalSaldoDompet: number = 0;
    let totalSaldoEmoney: number = 0;
    let totalPengeluaranSemuaSaldo: number = 0;

    if (allCatatan.length !== 0) {
      allCatatan.forEach((item: any) => {
        // jika akun ATM
        if (item.akun === 'atm') {
          if (item.tipe === 'pemasukan') {
            pemasukan_atm.push(item.nominal);
          } else {
            if (item.tujuan === 'tarik tunai') {
              pemasukan_dompet.push(item.nominal);
              pengeluaran_atm.push(item.nominal);
            } else {
              pengeluaran_atm.push(item.nominal);
            }
            // pengeluaran_atm.push(item.nominal);
          }
        } else if (item.akun === 'dompet') {
          if (item.tipe === 'pemasukan') {
            pemasukan_dompet.push(item.nominal);
          } else {
            pengeluaran_dompet.push(item.nominal);
          }
        } else {
          if (item.tipe === 'pemasukan') {
            pemasukan_emoney.push(item.nominal);
          } else {
            pengeluaran_emoney.push(item.nominal);
          }
        }
      });

      totalPemasukanAtm = pemasukan_atm.reduce((a, b) => a + b, 0);
      totalPengeluaranAtm = pengeluaran_atm.reduce((a, b) => a + b, 0);
      totalPemasukanDompet = pemasukan_dompet.reduce((a, b) => a + b, 0);
      totalPengeluaranDompet = pengeluaran_dompet.reduce((a, b) => a + b, 0);
      totalPemasukanEmoney = pemasukan_emoney.reduce((a, b) => a + b, 0);
      totalPengeluaranEmoney = pengeluaran_emoney.reduce((a, b) => a + b, 0);
    } else {
      totalPemasukanAtm = 0;
      totalPengeluaranAtm = 0;
      totalPemasukanDompet = 0;
      totalPengeluaranDompet = 0;
      totalPemasukanEmoney = 0;
      totalPengeluaranEmoney = 0;
    }

    totalSaldo =
      (totalPemasukanAtm + totalPemasukanDompet + totalPemasukanEmoney) -
      (totalPengeluaranAtm + totalPengeluaranDompet + totalPengeluaranEmoney);
    totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
    totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;
    totalSaldoEmoney = totalPemasukanEmoney - totalPengeluaranEmoney;
    totalPengeluaranSemuaSaldo = totalPengeluaranAtm + totalPengeluaranDompet;

    // console.log(
    //   totalPengeluaranSemuaSaldo
    // );

    setAllBalanceData({
      pemasukanAtm: totalPemasukanAtm,
      pengeluaranAtm: totalPengeluaranAtm,
      pemasukanDompet: totalPemasukanDompet,
      pengeluaranDompet: totalPengeluaranDompet,
      pemasukanEmoney: totalPemasukanEmoney,
      pengeluaranEmoney: totalPengeluaranEmoney,
      totalSaldo: totalSaldo,
      totalPengeluaran: totalPengeluaranSemuaSaldo,
      saldoAtm: totalSaldoAtm,
      saldoDompet: totalSaldoDompet,
      saldoEmoney: totalSaldoEmoney,
    });
  }, [allCatatan]);
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
        getAllAtm(),
        getAllEmoney(),
      ]);
      const newListKategori: any = [];
      values[0].forEach((item: any) => {
        newListKategori.push({
          id: item.id,
          nama_kategori: item.nama_kategori,
          tipe_kategori: item.tipe_kategori,
        });
      });
      setAllKategori(newListKategori);

      // dispatch(setCategory({data: newListKategori}));

      const responseGetListCatatan = values[1].map((item: any) => item);
      setAllCatatan(responseGetListCatatan);

      const newListAtm: any = [];
      values[2].forEach((item: any) => {
        newListAtm.push({
          id: item.id,
          nama_atm: item.nama_atm,
        });
      });
      setAllAtm(newListAtm);

      const newListEmoney: any = [];
      values[3].forEach((item: any) => {
        newListEmoney.push({
          id: item.id,
          nama_emoney: item.nama_emoney,
        });
      });
      setAllEmoney(newListEmoney);

      console.log(newListKategori, responseGetListCatatan, newListAtm, newListEmoney);
    } catch (error) {
      console.log('error load all');
    } finally {
      setLoading(false);
      console.log('sukses load all');
    }
  };

  const closeSnackbar = () => {
    setVisibleSnackbar({
      isOpen: false,
      type: '',
      msg: '',
    });
  };
  /* ------------------------------ modal delete ------------------------------ */
  const showModalDelete = (id: number) => {
    setIdCatatan(id);
    setVisibleModalDelete(true);
  };

  const closeModalDelete = () => {
    setVisibleModalDelete(false);
  };

  const submitDeleteNote = async (id: number) => {
    setLoading(true);
    setVisibleModalDelete(false);
    setAllCatatan([]);
    setAllKategori([]);

    try {
      await  deleteCatatan(id);
      setVisibleSnackbar({
        isOpen: true,
        type: 'success',
        msg: 'Catatan berhasil dihapus',
      });
      loadAll();
    } catch (error) {
      console.log('error = ', error);
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Terjadi kesalahan dari server',
      });
    }
  };

  const ModalOpenDelete = () => {
    return (
      <ModalAtom
        closeModal={closeModalDelete}
        visible={visibleModalDelete}
        setPageActive="Category"
      >
        <DeleteContent
          loading={loading}
          cancelDelete={() => {
            closeModalDelete();
          }}
          submitDelete={()=> {
            submitDeleteNote(idCatatan);
          }}
        />
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
        allAtm={allAtm}
        allEmoney={allEmoney}
        saldoAtm={allBalanceData.saldoAtm}
        saldoDompet={allBalanceData.saldoDompet}
        saldoEmoney={allBalanceData.saldoEmoney}
        navigation={navigation}
        openModalDelete={showModalDelete}
      />
      <ModalOpenDelete />
      <SnackbarAtom
        title={visibleSnackbar.msg}
        isOpen={visibleSnackbar.isOpen}
        action={closeSnackbar}
        bgColor={
          visibleSnackbar.type === 'error'
            ? COLOR_ERROR
            : visibleSnackbar.type === 'success'
            ? COLOR_ACTIVE
            : COLOR_WHITE
        }
        color={visibleSnackbar.type === 'error' ? COLOR_WHITE : COLOR_WHITE}
      />
    </React.Fragment>
  );
};

export default HomeOrganims;
