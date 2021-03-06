/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import styles, {
  COLOR_ACTIVE,
  COLOR_ACTIVE_SOFT,
  COLOR_DISABLED,
  COLOR_DISABLED_TEXT,
  COLOR_ERROR,
  COLOR_INPUT_PLACEHOLDER,
  COLOR_WHITE,
} from '../../../assets/styles/global';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import TextInputAtom from '../../atoms/input/TextInputAtom';
import TextAtom from '../../atoms/text/TextAtom';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {formatRupiah} from '../../../helper/formatNumber';
import {
  deleteCatatan,
  getSaldoByAtmName,
  getSaldoByEmoneyName,
  updateCatatan,
} from '../../../../db/database';
import TextareaInputAtom from '../../atoms/input/TextareaInputAtom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import SnackbarAtom from '../../atoms/alert/SnackbarAtom';
import {IPropsFormInputAddNote} from '../addNote/types';
import ModalAtom from '../../atoms/alert/ModalAtom';
import { IPropsFormInputEditNote } from './types';
import { listSaldo } from '../../../constants/Saldo';
import OverlayWithText from '../../atoms/overlay/OverlayWithText';

const FormInput = ({navigation, route}: IPropsFormInputEditNote) => {
  const {
    title,
    type,
    data: dataProps,
    listKategori,
    listAtm,
    listEmoney,
    saldoAtm,
    saldoDompet,
    saldoEmoney,
  } = route.params;
  const dispatch: AppDispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const [loadingUpdateData, setLoadingUpdateData] = React.useState(false);

  const [loadingScreen, setloadingScreen] = React.useState(false);

  // state id note
  const [idCatatan, setIdCatatan] = React.useState(0);
  // state tipe catatan
  const [tipeCatatan, setTipeCatatan] = React.useState('');
  // state date
  const [date, setDate] = React.useState<Date>(new Date());
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
  // state nominal
  const [nominal, setNominal] = React.useState<any>('');
  // state total saldo atm
  const [totalAtm, setTotalAtm] = React.useState<any>('');
  // state total saldo e-money
  const [totalEmoney, setTotalEmoney] = React.useState<any>('');
  // state keterangan
  const [keterangan, setKeterangan] = React.useState('');

  // modal delete
  const [visibleModalDelete, setVisibleModalDelete] = React.useState(false);

  // snackbar
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  React.useEffect(() => {
    console.log(dataProps);

    setKategoriList(listKategori);
    setAtmList(listAtm);
    setEmoneyList(listEmoney);
    setIdCatatan(dataProps.id);
    setTipeCatatan(dataProps.tipe);
    setDate(new Date(dataProps.tanggal));
    setselectAkun(dataProps.akun);
    setSelectTujuan(dataProps.tujuan);
    setNominal(dataProps.nominal.toString());
    setKeterangan(dataProps.keterangan);
    setSelectKategori(dataProps.kategori);
    setSelectAtm(dataProps.nama_atm);
    setSelectEmoney(dataProps.nama_emoney);

    return () => {
      listKategori;
      listAtm;
      listEmoney;
      dataProps.id;
      dataProps.tipe;
      dataProps.tanggal;
      dataProps.akun;
      dataProps.tujuan;
      dataProps.nominal;
      dataProps.keterangan;
      dataProps.kategori;
    };
  }, []);

  React.useEffect(() => {
    // if (selectAkun === 'atm') {
    //   setSelectEmoney('');
    // } else if (selectAkun === 'emoney') {
    //   setSelectAtm('');
    // } else if (selectAkun === 'dompet') {
    //   setSelectEmoney('');
    //   setSelectAtm('');
    // }

  }, [selectAkun]);

  React.useEffect(() => {
    console.log(selectAtm);
    if (tipeCatatan === 'pengeluaran' && selectAkun === 'atm' && selectAtm !== '') {
      getSaldoAtmByName(selectAtm);
    }

    return () => {
      tipeCatatan;
      selectAkun;
      selectAtm;
    };
  }, [selectAtm]);

  React.useEffect(() => {
    console.log(selectEmoney);
    if (tipeCatatan === 'pengeluaran' && selectAkun === 'emoney' && selectEmoney !== '') {
      getSaldoEmoneyByName(selectEmoney);
    }

    return () => {
      tipeCatatan;
      selectAkun;
      selectEmoney;
    };
  }, [selectEmoney]);
  // const [data, setData] = React.useState(null);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */

  const submitEditNote = async () => {
    setLoadingUpdateData(true);

    if (
      selectAkun === '' ||
      selectKategori === '' ||
      nominal === '' ||
      keterangan === '' ||
      selectAkun === 'atm' && selectTujuan === ''
    ) {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi semua form yang disediakan',
      });
      setLoadingUpdateData(false);
    } else {
      const data: any = {
        id: idCatatan,
        tipe: type,
        nama_atm: selectAkun === 'atm' ? selectAtm : '',
        nama_emoney: selectAkun === 'emoney' ? selectEmoney : '',
        tanggal: moment(date).format('YYYY-MM-DD').toString(),
        tanggal_int: Number(moment(date).format('DD')),
        bulan: Number(moment(date).format('MM')),
        tahun: Number(moment(date).format('YYYY')),
        akun: selectAkun,
        nominal: parseInt(nominal),
        tujuan: selectAkun === 'atm' ? selectTujuan : '',
        keterangan: keterangan,
        kategori: selectKategori,
      };

      try {
        await updateCatatan(data);

        setTimeout(() => {
          setVisibleSnackbar({
            isOpen: true,
            type: 'success',
            msg: 'Catatan berhasil diperbaharui',
          });
        }, 10);
      } catch (error) {
        console.log('error = ', error);
        setVisibleSnackbar({
          isOpen: true,
          type: 'error',
          msg: 'Terjadi kesalahan dari server',
        });
      } finally {
        setTimeout(() => {
          setLoadingUpdateData(false);
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

  const getSaldoAtmByName = (value: string) => {
    setloadingScreen(true);
    setTimeout(async () => {
      try {
        const result = await getSaldoByAtmName(value);
        const resultParse = JSON.parse(JSON.stringify(result));

        console.log(resultParse);

        let total = 0;
        resultParse.forEach( function(record: { nominal: number; tipe: string }) {
          if (record.tipe === 'pemasukan') {
            total += record.nominal;
          } else {
            total -= record.nominal;
          }
        });
        // const total = resultParse.reduce( function(tot: any, record: any) {
        //   return tot + record.nominal;
        // },0);

        setTotalAtm(total);
      } catch (error) {
        console.log('error load data atm');
      } finally {
        setloadingScreen(false);
        console.log('sukses load data atm');
      }
    }, 1000);
  };

  const getSaldoEmoneyByName = (value: string) => {
    setloadingScreen(true);
    setTimeout(async () => {
      try {
        const result = await getSaldoByEmoneyName(value);
        const resultParse = JSON.parse(JSON.stringify(result));

        let total = 0;
        resultParse.forEach( function(record: { nominal: number; tipe: string }) {
          if (record.tipe === 'pemasukan') {
            total += record.nominal;
          } else {
            total -= record.nominal;
          }
        });

        setTotalEmoney(total);
      } catch (error) {
        console.log('error load data atm');
      } finally {
        setloadingScreen(false);
        console.log('sukses load data atm');
      }
    }, 1000);
  };

  const handleInputnominal = (text: any) => {
    if (/^\d+$/.test(text) || text === '') {
      setNominal(text);
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
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
    (type === 'pengeluaran' && selectAkun === 'atm' && nominal > totalAtm) ||
    (type === 'pengeluaran' && selectAkun === 'emoney' && nominal > totalEmoney) ||
    (type === 'pengeluaran' && selectAkun === 'dompet' && nominal > saldoDompet) ||
    (type === 'pengeluaran' && selectAkun === 'atm' && selectAtm === '') ||
    (type === 'pengeluaran' && selectAkun === 'emoney' && selectEmoney === '');
  };

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View>
      <OverlayWithText loadingScreen={loadingScreen}/>
      {/* date */}
      <View>
        <TextAtom value="Tanggal" />
        <View style={styles.containerDate}>
          <View style={styles.inputDate}>
            <TextAtom value={moment(date).format('L').toString()} />
          </View>
          <View style={{height: '100%', width: '20%'}}>
            <Button
              onPress={showDatepicker}
              style={styles.btnShowDatepicker}>
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
        </View>
        <DropDownPicker
          // disabled={true}
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
        <View style={stylesCustom.containerSaldo}>
          <TextAtom value="Atm" />
          {
            tipeCatatan === 'pengeluaran' && selectAkun === 'atm' && (
              <TextAtom
                fontWeight={'bold'}
                color={totalAtm === 0 ? COLOR_ERROR : COLOR_ACTIVE}
                value={formatRupiah(totalAtm)}
              />
            )
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
        <View style={stylesCustom.containerSaldo}>
          <TextAtom value="eMoney" />
          {
            tipeCatatan === 'pengeluaran' && selectAkun === 'emoney' && (
              <TextAtom
                fontWeight={'bold'}
                color={totalEmoney === 0 ? COLOR_ERROR : COLOR_ACTIVE}
                value={formatRupiah(totalEmoney)}
              />
            )
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
        <TextAtom value="Kategori" />
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
          value={nominal}
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
          onChangeText={setKeterangan}
          mode={'outlined'}
          theme={{colors: {primary: COLOR_ACTIVE}}}
          marginX={0}
          marginY={0}
          height={100}
          numberOfLines={5}
          multiLine={true}
          value={keterangan}
        />
      </View>

      {/* button update data */}
      <View style={{marginTop: 10, marginBottom: 20}}>
        <ButtonAtom
          title={loadingUpdateData ? 'Menyimpan Data' : 'Simpan'}
          uppercase={true}
          bgColor={
            loadingUpdateData || validationBeforeSubmit()
              ? COLOR_DISABLED
              : COLOR_ACTIVE
          }
          textColor={
            loadingUpdateData || validationBeforeSubmit()
              ? COLOR_DISABLED_TEXT
              : COLOR_WHITE
          }
          action={submitEditNote}
          disabled={
            loadingUpdateData || validationBeforeSubmit()
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
});

export default FormInput;
