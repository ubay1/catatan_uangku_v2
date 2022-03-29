/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  getAllAtm,
  getAllEmoney,
  getSaldoByAtmName,
  getSaldoByEmoneyName,
} from '../../../db/database';
import {AppDispatch} from '../../store';
import {setHideTab, setShowTab} from '../../store/navigationRedux';
import Header from '../atoms/header/Header';
import {IPropsAddEmoney} from '../molecules/detailEmoney/addEmoney/types';
import ListEmoney from '../molecules/detailEmoney/rincianEmoney/ListEmoney';
import FooterListEmoney from '../molecules/detailEmoney/rincianEmoney/FooterListEmoney';

const RincianEmoneyOrganisms = ({navigation, route}: IPropsAddEmoney) => {
  const {saldoEmoney} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  const [loadingScreen, setloadingScreen] = React.useState(false);

  const [listEmoney, setlistEmoney] = React.useState([]);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    navigation.addListener('focus', (e: any) => {
      dispatch(setHideTab());
      setloadingScreen(true);

      setTimeout(() => {
        // getKategori();
        loadAllEmoney();
      }, 0);
    });

    navigation.addListener('beforeRemove', (param: any) => {
      dispatch(setShowTab());
    });
  }, [navigation]);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const loadAllEmoney = async () => {
    setloadingScreen(true);
    try {
      const result = await getAllEmoney();
      const resultParse = JSON.parse(JSON.stringify(result));

      console.log(resultParse);

      const newListEmoney: any = [];

      resultParse.forEach(async (item: any) => {
        try {
          const resultSaldo = await getSaldoByEmoneyName(item.nama_emoney);
          const resultSaldoParse = JSON.parse(JSON.stringify(resultSaldo));

          let total = 0;
          resultSaldoParse.forEach(function (record: {
            nominal: number;
            tipe: string;
          }) {
            if (record.tipe === 'pemasukan') {
              total += record.nominal;
            } else {
              total -= record.nominal;
            }
          });

          const data = {
            id: item.id,
            nama_emoney: item.nama_emoney,
            totalSaldo: total,
          };

          newListEmoney.push(data);
        } catch (error) {
          console.log('error load total saldo masing emoney');
        } finally {
          if (newListEmoney.length === resultParse.length) {
            setlistEmoney(newListEmoney);
          }
        }
      });
    } catch (error) {
      console.log('error load list emoney');
    } finally {
      setloadingScreen(false);
      console.log('sukses load lsit atm');
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 65}}>
        <Header navigation={navigation} title={'Rincian e-Money'} />
        <ListEmoney
          loading={loadingScreen}
          navigation={navigation}
          listEmoney={listEmoney}
        />
      </ScrollView>
      <FooterListEmoney loading={loadingScreen} totalSaldo={saldoEmoney} />
    </SafeAreaView>
  );
};

export default RincianEmoneyOrganisms;
