/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Colors, Button } from 'react-native-paper';
import { COLOR_ACTIVE } from '../../assets/styles/global';
import ButtonAtom from '../../components/atoms/button/ButtonAtom';
import TextAtom from '../../components/atoms/text/TextAtom';
import loading from '../../store/loading';
import styles from '../../assets/styles/global';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackFilterNote } from '../../../interfaceRoutes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigationRedux';
import HeaderAddNote from '../../components/molecules/addNote/Header';
import { getFilterCatatanByDate } from '../../../db/database';
import { setListNote, setTotalSaldo, setTotalSaldoPemasukan, setTotalSaldoPengeluaran } from '../../store/listNote';


const FilterNote = ({navigation}: StackFilterNote) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setHideTab());
    navigation.addListener('beforeRemove', () => {
      console.log('back to admin');
      dispatch(setShowTab());
    });
  }, [navigation]);

  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, settoDate] = useState(new Date());
  const [modeFromDate, setModeFromDate] = useState('date');
  const [showFromDate, setShowFromDate] = useState(false);
  const [modeToDate, setModeToDate] = useState('date');
  const [showToDate, setShowToDate] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const onChangeFromDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || fromDate;
    console.log('from date = ',moment(currentDate).format('L'));
    setfromDate(currentDate);
    setShowFromDate(false);
    // settampungJenisFilterfromDate(currentDate);
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
    console.log('to date = ',moment(currentDate).format('L'), event);
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

  const getCatatanByDate = async () => {
    console.log(fromDate, toDate);

    try {
      const result: any = await getFilterCatatanByDate(fromDate, toDate);
      // console.log(result);
      // const aa = []
      // for (let i = 0; i < 1000; i++) {
      //   aa.push({id: i, tipe: 'pemasukan', data: `data${i}`});
      // }
      dispatch(setListNote({data: result}));

      if (result.length === 0) {
        dispatch(setTotalSaldo({totalSaldo: 0}));
        dispatch(setTotalSaldoPemasukan({totalSaldoPemasukan: 0}));
        dispatch(setTotalSaldoPengeluaran({totalSaldoPengeluaran: 0}));
      } else {
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

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginHorizontal: 10, marginTop: 0}}>
        <HeaderAddNote navigation={navigation} title={'Custom Tanggal'}/>
        <View style={{marginBottom: 20}}>
          <TextAtom value="Dari Tanggal" />
          <View style={styles.containerDate}>
            <View style={styles.inputDate}>
              <TextAtom value={moment(fromDate).format('L').toString()} />
            </View>
            <View style={{height: '100%', width: '20%'}}>
              <Button
                onPress={() => {
                  showDatepickerFromDate();
                }}
                style={styles.btnShowDatepicker}>
                <IconMCI name="calendar" size={23} color={Colors.black} />
              </Button>
            </View>
            {showFromDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                maximumDate={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeFromDate}
              />
            )}
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <TextAtom value="Sampai Tanggal" />
          <View style={styles.containerDate}>
            <View style={styles.inputDate}>
              <TextAtom value={moment(toDate).format('L').toString()} />
            </View>
            <View style={{height: '100%', width: '20%'}}>
              <Button
                onPress={() => {
                  showDatepickerToDate();
                }}
                style={styles.btnShowDatepicker}>
                <IconMCI name="calendar" size={23} color={Colors.black} />
              </Button>
            </View>
            {showToDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toDate}
                maximumDate={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeToDate}
              />
            )}
          </View>
        </View>

        <ButtonAtom
          title={'Kirim'}
          disabled={false}
          bgColor={COLOR_ACTIVE}
          marginX={0}
          uppercase={true}
          action={() => {
            getCatatanByDate();
            // setloading(true);
            // getCatatanByDate();
            // setTimeout(() => {
            //   setloading(false)
            // }, 2000);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterNote;
