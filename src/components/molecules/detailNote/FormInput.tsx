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
import {
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
  updateCatatan,
} from '../../../../db/database';
import TextareaInputAtom from '../../atoms/input/TextareaInputAtom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import SnackbarAtom from '../../atoms/alert/SnackbarAtom';
import {IPropsFormInputAddNote} from '../addNote/types';
import ModalAtom from '../../atoms/alert/ModalAtom';
import styles from '../../../assets/styles/global';

const FormInput = ({navigation, route}: IPropsFormInputAddNote) => {
  const {
    title,
    type,
    data: dataProps,
    listKategori,
    saldoAtm,
    saldoDompet,
  } = route.params;
  const dispatch: AppDispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const [loadingUpdateData, setLoadingUpdateData] = React.useState(false);
  const [loadingDeleteData, setLoadingDeleteData] = React.useState(false);

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
  // state tujuan
  const [selectTujuan, setSelectTujuan] = React.useState('');
  // state nominal
  const [nominal, setNominal] = React.useState<any>('');
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
    setKategoriList(listKategori);
    setIdCatatan(dataProps.id);
    setTipeCatatan(dataProps.tipe);
    setDate(new Date(dataProps.tanggal));
    setselectAkun(dataProps.akun);
    setSelectTujuan(dataProps.tujuan);
    setNominal(dataProps.nominal.toString());
    setKeterangan(dataProps.keterangan);
    setSelectKategori(dataProps.kategori);

    return () => {
      listKategori;
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
      keterangan === ''
    ) {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi form yang disediakan',
      });
      setLoadingUpdateData(false);
    } else {
      const data: any = {
        id: idCatatan,
        tipe: type,
        tanggal: moment(date).format('YYYY-MM-DD').toString(),
        akun: selectAkun,
        nominal: parseInt(nominal),
        tujuan: selectTujuan,
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
          dispatch(setPage({page: 'UpdateHome'}));
          navigation.navigate('Home');
        }, 1000);
      }
    }
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
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

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <View>
        {/* date */}
        <View>
          <TextAtom value="Tanggal" />
          <View style={stylesCustom.containerDate}>
            <View style={stylesCustom.inputDate}>
              <TextAtom value={moment(date).format('L').toString()} />
            </View>
            <View style={{height: '100%', width: '20%'}}>
              <Button
                onPress={showDatepicker}
                style={stylesCustom.btnShowDatepicker}>
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
                  setDate(currentDate);
                  setShow(false);
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
                selectAkun === 'atm'
                  ? `${formatRupiah(saldoAtm)}`
                  : selectAkun === 'dompet'
                  ? `${formatRupiah(saldoDompet)}`
                  : ''
              }
            />
          </View>
          <DropDownPicker
            placeholder="Pilih Saldo"
            items={[
              {label: 'Pilih Saldo', value: '', hidden: true},
              {label: 'ATM', value: 'atm'},
              {label: 'Dompet', value: 'dompet'},
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
            labelStyle={{textTransform: 'capitalize', fontSize: 15}}
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
              labelStyle={{textTransform: 'capitalize', fontSize: 15}}
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
        <View style={{marginTop: 10, marginBottom: 0}}>
          <ButtonAtom
            title={loadingUpdateData ? 'Menyimpan Data' : 'Simpan'}
            uppercase={true}
            bgColor={loadingUpdateData ? COLOR_DISABLED : COLOR_ACTIVE}
            textColor={loadingUpdateData ? COLOR_DISABLED_TEXT : COLOR_WHITE}
            action={submitEditNote}
            disabled={loadingDeleteData ? true : loadingUpdateData}
            marginX={0}
          />
        </View>

        {/* button delete data */}
        {/* <View style={{marginTop: 5, marginBottom: 20}}>
          <ButtonAtom
            title={loadingDeleteData ? 'Menghapus Data' : 'Hapus'}
            uppercase={true}
            color={COLOR_ERROR}
            mode="contained"
            action={showModalDelete}
            disabled={loadingUpdateData ? true : loadingDeleteData}
            theme={{colors: {disabled: COLOR_ACTIVE_SOFT}}}
            marginX={0}
          />
        </View> */}

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
      {/* <ModalOpenDelete /> */}
    </>
  );
};

const stylesCustom = StyleSheet.create({
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 5,
  },
  containerSaldo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputDate: {
    backgroundColor: COLOR_DISABLED,
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: COLOR_INPUT_PLACEHOLDER,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  btnShowDatepicker: {
    backgroundColor: COLOR_DISABLED,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderColor: COLOR_INPUT_PLACEHOLDER,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
  },
  modalText2: {
    textAlign: 'center',
    color: 'grey',
  },
});

export default FormInput;
