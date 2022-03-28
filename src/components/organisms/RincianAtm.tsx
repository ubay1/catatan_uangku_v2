/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAllAtm, getSaldoByAtmName} from '../../../db/database';
import {AppDispatch} from '../../store';
import {setHideTab, setShowTab} from '../../store/navigationRedux';
import Header from '../atoms/header/Header';
import {IPropsAddAtm} from '../molecules/detailAtm/addAtm/types';
import FooterListAtm from '../molecules/detailAtm/rincianAtm/FooterListAtm';
import ListAtm from '../molecules/detailAtm/rincianAtm/ListAtm';

const RincianAtmOrganisms = ({navigation, route}: IPropsAddAtm) => {
  const {saldoAtm} = route.params;
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  const [loadingScreen, setloadingScreen] = React.useState(false);

  const [listAtm, setlistAtm] = React.useState<any>([]);
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
        loadAllAtm();
      }, 0);
    });

    navigation.addListener('beforeRemove', (param: any) => {
      dispatch(setShowTab());
    });
  }, [navigation]);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const loadAllAtm = async () => {
    setloadingScreen(true);
    try {
      const result = await getAllAtm();
      const resultParse = JSON.parse(JSON.stringify(result));

      const newListAtm: any = [];

      resultParse.forEach(async (item: any) => {
        try {
          const resultSaldo = await getSaldoByAtmName(item.nama_atm);
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
            nama_atm: item.nama_atm,
            totalSaldo: total,
          };

          newListAtm.push(data);
        } catch (error) {
          console.log('error load total saldo masing atm');
        } finally {
          if (newListAtm.length === resultParse.length) {
            setlistAtm(newListAtm);
          }
        }
      });
    } catch (error) {
      console.log('error load list atm');
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
        <Header navigation={navigation} title={'Rincian Atm'} />
        <ListAtm
          loading={loadingScreen}
          navigation={navigation}
          listAtm={listAtm}
        />
      </ScrollView>
      <FooterListAtm
        loading={loadingScreen}
        totalSaldo={saldoAtm}
      />
    </SafeAreaView>
  );
};

export default RincianAtmOrganisms;
