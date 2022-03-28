/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import styles, {
  COLOR_ACTIVE,
  COLOR_ACTIVE_SOFT,
  COLOR_BLACK,
  COLOR_DISABLED,
  COLOR_DISABLED_TEXT,
  COLOR_ERROR,
  COLOR_INPUT_PLACEHOLDER,
  COLOR_WHITE,
} from '../../../assets/styles/global';
import loading from '../../../store/loading';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import TextInputAtom from '../../atoms/input/TextInputAtom';
import TextAtom from '../../atoms/text/TextAtom';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {formatRupiah} from '../../../helper/formatNumber';
import {IPropsFormInputAddNote} from './types';
import realm, {
  createCatatan,
  getAllKategori,
  getSaldoByAtmName,
  getSaldoByEmoneyName,
  SALDO_SCHEMA,
} from '../../../../db/database';
import TextareaInputAtom from '../../atoms/input/TextareaInputAtom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import SnackbarAtom from '../../atoms/alert/SnackbarAtom';
import ButtonTextAtom from '../../atoms/button/ButtonTextAtom';
import {setShowTab} from '../../../store/navigationRedux';
import {RootState} from '../../../store/rootReducer';
import { listSaldo } from '../../../constants/Saldo';
import OverlayWithText from '../../atoms/overlay/OverlayWithText';

const FormInput = ({
  navigation,
  route,
  listKategori,
  listAtm,
  listEmoney,
}: IPropsFormInputAddNote) => {
  const {title, type, saldoAtm, saldoDompet, saldoEmoney} = route.params;

  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  const [loading, setloading] = React.useState(false);
  const [loadingData, setloadingData] = React.useState(false);

  // state date
  const [date, setDate] = React.useState<any>(new Date());
  const [mode, setMode] = React.useState<any>('date');
  const [show, setShow] = React.useState(false);
  // state saldo
  const [selectAkun, setselectAkun] = React.useState('');
  // state kategori
  const [selectKategori, setSelectKategori] = React.useState('');
  const [kategoriList, setKategoriList] = React.useState<any[]>([]);
  // state atm
  const [selectAtm, setSelectAtm] = React.useState('');
  const [atmList, setAtmList] = React.useState<any[]>([]);
  // state emoney
  const [selectEmoney, setSelectEmoney] = React.useState('');
  const [emoneyList, setEmoneyList] = React.useState<any[]>([]);
  // state tujuan
  const [selectTujuan, setSelectTujuan] = React.useState('');
  // state total saldo atm
  const [totalAtm, setTotalAtm] = React.useState<any>('');
  // state total saldo e-money
  const [totalEmoney, setTotalEmoney] = React.useState<any>('');

  // snackbar
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  // state nominal
  const [nominal, setNominal] = React.useState<any>('');
  const handleInputnominal = (text: any) => {
    if (/^\d+$/.test(text) || text === '') {
      setNominal(text);
    }
  };

  // state keterangan
  const [keterangan, setketerangan] = React.useState('');

  React.useEffect(() => {
    if (listKategori.length !== 0) {
      filterKategori(type);
    }

    if (listAtm.length !== 0) {
      filterNamaAtm();
    }

    if (listEmoney.length !== 0) {
      filterNamaEmoney();
    }
  }, [listKategori, listAtm, listEmoney]);

  React.useEffect(() => {
    navigation.addListener('focus', (e: any) => {
      console.log('focus form input', type);
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(selectAtm);
    if (type === 'pengeluaran' && selectAkun === 'atm' && selectAtm) {
      setSelectEmoney('');
      getSaldoAtmByName(selectAtm);
    }

    return () => {
      type;
      selectAkun;
      selectAtm;
    };
  }, [selectAtm]);

  React.useEffect(() => {
    console.log(selectEmoney);
    if (type === 'pengeluaran' && selectAkun === 'emoney' && selectEmoney) {
      setSelectAtm('');
      getSaldoEmoneyByName(selectEmoney);
    }

    return () => {
      type;
      selectAkun;
      selectEmoney;
    };
  }, [selectEmoney]);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const getSaldoAtmByName = (value: string) => {
    setloadingData(true);
    setTimeout(async () => {
      try {
        const result = await getSaldoByAtmName(value);
        const resultParse = JSON.parse(JSON.stringify(result));

        let total = 0;
        resultParse.forEach( function(record: { nominal: number; }) {
            total += record.nominal;
        });
        // const total = resultParse.reduce( function(tot: any, record: any) {
        //   return tot + record.nominal;
        // },0);

        setTotalAtm(total);
      } catch (error) {
        console.log('error load data atm');
      } finally {
        setloadingData(false);
        console.log('sukses load data atm');
      }
    }, 1000);
  };

  const getSaldoEmoneyByName = (value: string) => {
    setloadingData(true);
    setTimeout(async () => {
      try {
        const result = await getSaldoByEmoneyName(value);
        const resultParse = JSON.parse(JSON.stringify(result));

        // let total = 0;
        // resultParse.forEach( function(record: { nominal: number; }) {
        //     total += record.nominal;
        // });
        const total = resultParse.reduce( function(tot: any, record: any) {
          return tot + record.nominal;
        },0);

        setTotalEmoney(total);
      } catch (error) {
        console.log('error load data atm');
      } finally {
        setloadingData(false);
        console.log('sukses load data atm');
      }
    }, 1000);
  };

  const filterKategori = (type: string) => {
    const filterItem: any[] = [];
    listKategori.forEach((item: any) => {
      if (item.tipe_kategori === type) {
        const list: any = {
          label: item.nama_kategori,
          value: item.nama_kategori,
        };
        filterItem.push(list);
      }
    });
    setKategoriList(filterItem);
  };

  const filterNamaAtm = () => {
    const filterItem: any[] = [];
    listAtm.forEach((item: any) => {
        const list: any = {
          label: item.nama_atm,
          value: item.nama_atm,
        };
        filterItem.push(list);
    });
    setAtmList(filterItem);
  };

  const filterNamaEmoney = () => {
    const filterItem: any[] = [];
    listEmoney.forEach((item: any) => {
        const list: any = {
          label: item.nama_emoney,
          value: item.nama_emoney,
        };
        filterItem.push(list);
    });
    setEmoneyList(filterItem);
  };

  const gotoCategory = () => {
    dispatch(setShowTab());
    dispatch(setPage({page: 'Category'}));
    navigation.navigate('Category');
  };

  const gotoAddAtm = () => {
    dispatch(setShowTab());
    dispatch(setPage({page: 'AddAtm'}));
    navigation.navigate('AddAtm');
  };

  const gotoAddEmoney = () => {
    dispatch(setShowTab());
    dispatch(setPage({page: 'AddEmoney'}));
    navigation.navigate('AddEmoney');
  };

  const submitNote = async () => {
    setloading(true);

    if (
      selectAkun === '' ||
      selectKategori === '' ||
      nominal === '' ||
      keterangan === '' ||
      selectAkun === 'atm' && selectAtm === '' ||
      selectAkun === 'emoney' && selectEmoney === ''
    ) {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi semua form yang disediakan',
      });
      setloading(false);
    } else {
      const data: any = {
        tipe: type,
        nama_atm: selectAtm,
        nama_emoney: selectEmoney,
        tanggal: moment(date).format('YYYY-MM-DD').toString(),
        tanggal_int: Number(moment(date).format('DD')),
        bulan: Number(moment(date).format('MM')),
        tahun: Number(moment(date).format('YYYY')),
        akun: selectAkun,
        tujuan: type === 'pemasukan' ? '' : selectTujuan,
        nominal: typeof nominal === 'string' ? parseInt(nominal) : '0',
        keterangan: keterangan,
        kategori: selectKategori,
      };

      try {
        await createCatatan(data);

        setTimeout(() => {
          setVisibleSnackbar({
            isOpen: true,
            type: 'success',
            msg: 'Catatan berhasil disimpan',
          });
        }, 10);
      } catch (error) {
        console.error('error = ', error);
        setVisibleSnackbar({
          isOpen: true,
          type: 'error',
          msg: 'Terjadi kesalahan dari server',
        });
      } finally {
        setTimeout(() => {
          setloading(false);
          dispatch(setPage({page: 'updateHome'}));
          navigation.navigate('Home');
        }, 1000);
      }
    }
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const closeSnackbar = () => {
    setVisibleSnackbar({
      isOpen: false,
      type: '',
      msg: '',
    });
  };

  const validationBeforeSubmit: any = () => {
    return (type === 'pengeluaran' && selectAkun === 'atm' && totalAtm === 0) ||
    (type === 'pengeluaran' && selectAkun === 'emoney' && totalEmoney === 0) ||
    (type === 'pengeluaran' && selectAkun === 'dompet' && saldoDompet === 0) ||
    (type === 'pengeluaran' && selectAkun === 'atm' && nominal > saldoAtm) ||
    (type === 'pengeluaran' && selectAkun === 'emoney' && nominal > totalEmoney) ||
    (type === 'pengeluaran' && selectAkun === 'dompet' && nominal > saldoDompet);
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View>
      <OverlayWithText loadingScreen={loadingData}/>
      {/* date */}
      <View>
        <TextAtom value="Tanggal" />
        <View style={styles.containerDate}>
          <View style={styles.inputDate}>
            <TextAtom value={moment(date).format('L').toString()} />
          </View>
          <View style={{height: '100%', width: '20%'}}>
            <Button onPress={showDatepicker} style={styles.btnShowDatepicker}>
              <IconMCI name="calendar" size={23} color={Colors.black} />
            </Button>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              maximumDate={new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={(event: any, selectedDate: any) => {
                const currentDate = selectedDate || date;
                setShow(false);
                setDate(currentDate);
              }}
            />
          )}
        </View>
      </View>

      {/* saldo */}
      <View style={{marginTop: 20}}>
        <View style={stylesCustom.containerSaldo}>
          <TextAtom value="Saldo" />
          {
            type === 'pemasukan' ?
            <TextAtom
              fontWeight={'bold'}
              color={COLOR_ACTIVE}
              value={
                selectAkun === 'atm' ? `${formatRupiah(saldoAtm)}` :
                selectAkun === 'emoney' ? `${formatRupiah(saldoEmoney)}` :
                selectAkun === 'dompet' ? `${formatRupiah(saldoDompet)}`
                : ''
              }
            />
            :
            <TextAtom
              fontWeight={'bold'}
              color={COLOR_ACTIVE}
              value={
                selectAkun === 'dompet' ? `${formatRupiah(saldoDompet)}`
                : ''
              }
            />
          }
        </View>
        <DropDownPicker
          placeholder="Pilih Saldo"
          items={[
            {label: 'Pilih Saldo', value: '', hidden: true},
            ...listSaldo,
          ]}
          defaultValue={selectAkun}
          containerStyle={{height: 50, marginTop: 5}}
          style={{
            backgroundColor: COLOR_DISABLED,
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          placeholderStyle={{
            color: COLOR_INPUT_PLACEHOLDER,
          }}
          labelStyle={{fontSize: 15}}
          dropDownStyle={{
            backgroundColor: '#fff',
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          onChangeItem={(item: any) => {
            setselectAkun(item.value);
          }}
        />
      </View>

      {/* atm */}
      <View style={{marginTop: 20, display: selectAkun === 'atm' ? 'flex' : 'none'}}>
        <View style={stylesCustom.containerKategori}>
          <TextAtom value="Atm" />
          {
            type === 'pemasukan' ?
            <ButtonTextAtom
              title="Tambah ATM"
              bgColor="transparent"
              textColor={COLOR_ACTIVE}
              action={gotoAddAtm}
            /> :
            type === 'pengeluaran' && selectAkun === 'atm' ?
              <TextAtom
                fontWeight={'bold'}
                color={totalAtm === 0 ? COLOR_ERROR : COLOR_ACTIVE}
                value={formatRupiah(totalAtm)}
              />
            : <TextAtom value="" />
          }
        </View>
        <DropDownPicker
          placeholder="Pilih Atm"
          items={atmList}
          defaultValue={selectAtm}
          containerStyle={{height: 50, marginTop: 5}}
          style={{
            backgroundColor: COLOR_DISABLED,
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{fontSize: 15}}
          placeholderStyle={{
            color: COLOR_INPUT_PLACEHOLDER,
          }}
          dropDownStyle={{
            backgroundColor: '#fff',
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          onChangeItem={(item: any) => {
            setSelectAtm(item.value);
          }}
        />
      </View>

      {/* emoney */}
      <View style={{marginTop: 20, display: selectAkun === 'emoney' ? 'flex' : 'none'}}>
        <View style={stylesCustom.containerKategori}>
          <TextAtom value="eMoney" />
          {
            type === 'pemasukan' ?
            <ButtonTextAtom
              title="Tambah eMoney"
              bgColor="transparent"
              textColor={COLOR_ACTIVE}
              action={gotoAddEmoney}
            /> :
            type === 'pengeluaran' && selectAkun === 'emoney' ?
              <TextAtom
                fontWeight={'bold'}
                color={totalEmoney === 0 ? COLOR_ERROR : COLOR_ACTIVE}
                value={formatRupiah(totalEmoney)}
              />
            : <TextAtom value="" />
          }
        </View>
        <DropDownPicker
          placeholder="Pilih eMoney"
          items={emoneyList}
          defaultValue={selectEmoney}
          containerStyle={{height: 50, marginTop: 5}}
          style={{
            backgroundColor: COLOR_DISABLED,
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{fontSize: 15}}
          placeholderStyle={{
            color: COLOR_INPUT_PLACEHOLDER,
          }}
          dropDownStyle={{
            backgroundColor: '#fff',
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          onChangeItem={(item: any) => {
            setSelectEmoney(item.value);
          }}
        />
      </View>

      {/* kategori */}
      <View style={{marginTop: 20}}>
        <View style={stylesCustom.containerKategori}>
          <TextAtom value="Kategori" />
          <ButtonTextAtom
            title="Tambah kategori"
            bgColor="transparent"
            textColor={COLOR_ACTIVE}
            action={gotoCategory}
          />
        </View>
        <DropDownPicker
          placeholder="Pilih Kategori"
          items={kategoriList}
          defaultValue={selectKategori}
          containerStyle={{height: 50, marginTop: 5}}
          style={{
            backgroundColor: COLOR_DISABLED,
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          labelStyle={{fontSize: 15}}
          placeholderStyle={{
            color: COLOR_INPUT_PLACEHOLDER,
          }}
          dropDownStyle={{
            backgroundColor: '#fff',
            borderColor: COLOR_INPUT_PLACEHOLDER,
          }}
          onChangeItem={(item: any) => {
            setSelectKategori(item.value);
          }}
        />
      </View>

      {/* tujuan, only show in pengeluaran saldo */}
      {type === 'pengeluaran' && selectAkun === 'atm' ? (
        <View style={{marginTop: 20}}>
          <TextAtom value="Tujuan" />
          <DropDownPicker
            placeholder="Pilih Tujuan"
            items={[
              {label: 'Tarik Tunai', value: 'tarik tunai'},
              {label: 'Transfer', value: 'transfer'},
            ]}
            defaultValue={selectTujuan}
            containerStyle={{height: 50, marginTop: 5}}
            style={{
              backgroundColor: COLOR_DISABLED,
              borderColor: COLOR_INPUT_PLACEHOLDER,
            }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{fontSize: 15}}
            placeholderStyle={{
              color: COLOR_INPUT_PLACEHOLDER,
            }}
            dropDownStyle={{
              backgroundColor: '#fff',
              borderColor: COLOR_INPUT_PLACEHOLDER,
            }}
            onChangeItem={(item: any) => {
              setSelectTujuan(item.value);
            }}
          />
        </View>
      ) : (
        <View />
      )}

      {/* nominal */}
      <View style={{marginTop: 20}}>
        <TextAtom value="Nominal" />
        <TextInputAtom
          label="Masukan Nominal"
          keyboardType={'numeric'}
          placeholderTextColor={COLOR_INPUT_PLACEHOLDER}
          onChangeText={handleInputnominal}
          mode={'outlined'}
          theme={{colors: {primary: COLOR_ACTIVE}}}
          marginX={0}
          marginY={0}
        />
      </View>
      <TextAtom value={formatRupiah(nominal)} fontWeight={'bold'} />

      {/* keterangan */}
      <View style={{marginTop: 20}}>
        <TextAtom value="Keterangan" />
        <TextareaInputAtom
          label="Masukan Keterangan"
          placeholderTextColor={COLOR_INPUT_PLACEHOLDER}
          onChangeText={setketerangan}
          mode={'outlined'}
          theme={{colors: {primary: COLOR_ACTIVE}}}
          marginX={0}
          marginY={0}
          height={100}
          numberOfLines={5}
          multiLine={true}
        />
      </View>

      {/* button submit */}
      <View style={{marginTop: 10, marginBottom: 20}}>
        <ButtonAtom
          title={loading ? 'Menyimpan Data' : 'Simpan'}
          uppercase={true}
          bgColor={
            loading || validationBeforeSubmit()
              ? COLOR_DISABLED
              : COLOR_ACTIVE
          }
          textColor={
            loading || validationBeforeSubmit()
              ? COLOR_DISABLED_TEXT
              : COLOR_WHITE
          }
          action={() => {
            submitNote();
          }}
          disabled={
            loading || validationBeforeSubmit()
          }
          marginX={0}
        />
      </View>

      {/* snackbar success / not*/}
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
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  containerSaldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerKategori: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FormInput;
