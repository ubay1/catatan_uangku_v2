/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFh from 'react-native-vector-icons/Feather';
import { getAllCatatan, getAllKategori } from '../../../../db/database';
import TextAtom from '../../atoms/text/TextAtom';
import { formatRupiah } from '../../../helper/formatNumber';

const ListSaldo = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
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

  // const [pemasukanAtm, setpemasukanAtm] = React.useState(0);
  // const [pemasukanDompet, setpemasukanDompet] = React.useState(0);
  // const [pengeluaranAtm, setpengeluaranAtm] = React.useState(0);
  // const [pengeluaranDompet, setpengeluaranDompet] = React.useState(0);
  // const [totalSaldo, settotalSaldo] = React.useState(0);
  // const [saldoAtm, setsaldoAtm] = React.useState(0);
  // const [saldoDompet, setsaldoDompet] = React.useState(0);

  React.useEffect(() => {
    loadAll();
  }, []);

  // cek data allCatatan
  React.useEffect(() => {
    let pemasukan_atm: any[] = [];
    let pemasukan_dompet: any[] = [];
    let pengeluaran_atm: any[] = [];
    let pengeluaran_dompet: any[] = [];

    if (allCatatan.length !== 0) {
      allCatatan.map((item: any) => {
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

      const totalPemasukanAtm = pemasukan_atm.reduce((a, b) => a + b, 0);
      const totalPemasukanDompet = pemasukan_dompet.reduce((a, b) => a + b, 0);
      const totalPengeluaranAtm = pengeluaran_atm.reduce((a, b) => a + b, 0);
      const totalPengeluaranDompet = pengeluaran_dompet.reduce((a, b) => a + b, 0);
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;

      setAllBalanceData({
        pemasukanAtm: totalPemasukanAtm,
        pengeluaranAtm: totalPengeluaranAtm,
        pemasukanDompet: totalPemasukanDompet,
        pengeluaranDompet: totalPengeluaranDompet,
        totalSaldo: totalSaldo,
        saldoAtm: totalSaldoAtm,
        saldoDompet: totalSaldoDompet,
      });
      // setpemasukanAtm(totalPemasukanAtm);
      // setpengeluaranAtm(totalPengeluaranAtm);
      // setpemasukanDompet(totalPemasukanDompet);
      // setpengeluaranDompet(totalPengeluaranDompet);
      // settotalSaldo(totalSaldo);
      // setsaldoAtm(totalSaldoAtm);
      // setsaldoDompet(totalSaldoDompet);
    }
    else {
      const totalPemasukanAtm = 0;
      const totalPemasukanDompet = 0;
      const totalPengeluaranAtm = 0;
      const totalPengeluaranDompet = 0;
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;

      setAllBalanceData({
        pemasukanAtm: totalPemasukanAtm,
        pengeluaranAtm: totalPengeluaranAtm,
        pemasukanDompet: totalPemasukanDompet,
        pengeluaranDompet: totalPengeluaranDompet,
        totalSaldo: totalSaldo,
        saldoAtm: totalSaldoAtm,
        saldoDompet: totalSaldoDompet,
      });
    }
  }, [allCatatan]);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const getListKategori = () => {
    return getAllKategori();
  };

  const getListCatatan = () => {
    return getAllCatatan();
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const values: any = await Promise.all([getListKategori(), getListCatatan()]);
      const responseGetListKategori = values[0].map((item: any) => item);
      setAllKategori(responseGetListKategori);

      const responseGetListCatatan = values[1].map((item: any) => item);
      setAllCatatan(responseGetListCatatan);

      console.log(responseGetListKategori, responseGetListCatatan);
    } catch (error) {
      console.log('error load all');
    } finally  {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.log('sukses load all');
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <View style={{
        ...stylesCustom.cardSaldo,
        backgroundColor: Colors.red50,
      }}
      >
        <View style={stylesCustom.betweenCenterRow}>
          <View style={{
            ...stylesCustom.spaceBackgroundColor,
            backgroundColor: Colors.red400,
          }}>
            <IconFh name="dollar-sign" color="#fff" size={30} />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TextAtom value="Total Saldo" />
            {
              loading ?
                <ActivityIndicator animating={true} color={Colors.red500} />
                :
                <TextAtom value={formatRupiah(allBalanceData.totalSaldo)} fontWeight={'bold'}/>
            }
          </View>
        </View>
      </View>

      <View style={{
        ...stylesCustom.cardSaldo,
        backgroundColor: Colors.green50,
      }}
      >
        <View style={stylesCustom.betweenCenterRow}>
          <View style={{
            ...stylesCustom.spaceBackgroundColor,
            backgroundColor: Colors.green400,
          }}>
            <IconEntypo name="credit-card" color="#fff" size={30} />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TextAtom value="Saldo ATM" />
            {
              loading ?
                <ActivityIndicator animating={true} color={Colors.green500} />
                :
                <TextAtom value={formatRupiah(allBalanceData.saldoAtm)} fontWeight={'bold'}/>
            }
          </View>
        </View>
      </View>

      <View style={{
        ...stylesCustom.cardSaldo,
        backgroundColor: Colors.blue50,
      }}
      >
        <View style={stylesCustom.betweenCenterRow}>
          <View style={{
            ...stylesCustom.spaceBackgroundColor,
            backgroundColor: Colors.blue400,
          }}>
            <IconMCI name="bag-personal-outline" color="#fff" size={30} />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TextAtom value="Saldo Dompet" />
            {
              loading ?
                <ActivityIndicator animating={true} color={Colors.blue500} />
                :
                <TextAtom value={formatRupiah(allBalanceData.saldoDompet)} fontWeight={'bold'}/>
            }
          </View>
        </View>
      </View>
    </>
  );
};

const stylesCustom = StyleSheet.create({
  cardSaldo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 0,
    marginTop: 10,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: .5,
  },
  betweenCenterRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spaceBackgroundColor: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ListSaldo;
