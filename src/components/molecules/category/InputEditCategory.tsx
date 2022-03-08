/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors, Button} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import realm, {createKategori, updateKategori} from '../../../../db/database';
import {
  COLOR_ERROR,
  COLOR_ACTIVE,
  COLOR_WHITE,
  COLOR_DISABLED,
  COLOR_INPUT_PLACEHOLDER,
} from '../../../assets/styles/global';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import SnackbarAtom from '../../atoms/alert/SnackbarAtom';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import TextInputAtom from '../../atoms/input/TextInputAtom';
import TextAtom from '../../atoms/text/TextAtom';
import { IPropsInputCategory } from './types';

const InputEditCategory = ({closeModalInputKategori, idInputKategori, defaultValueTipeCategory, defaultValueNameCategory}: IPropsInputCategory) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const [tipeKategori, setTipeKategori] = useState<any>('');
  const [namaKategori, setNamaKategori] = useState<any>('');
  const [loading, setLoading] = React.useState(false);

  // snackbar
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  useEffect(() => {
    setTipeKategori(defaultValueTipeCategory);
    setNamaKategori(defaultValueNameCategory);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const editCategory = () => {
    setLoading(true);
    if (namaKategori === '' || tipeKategori === '') {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi form yang disediakan',
      });
      setLoading(false);
    } else {
      const data: any = {
        id: idInputKategori,
        nama_kategori: namaKategori,
      };
      updateKategori(data)
      .then(()=>{
        setNamaKategori('');
        setTipeKategori('');
        setLoading(false);
        closeModalInputKategori();
      })
      .catch((err) => {
        console.log('error = ',err);
      });
      // try {
      //   setTimeout(async () => {
      //     const respCreateKategori = await createKategori(data)
      //     setNamaKategori('');
      //     setTipeKategori('')
      //     setLoading(false);
      //     dispatch(setPage({ page: 'Setelan' }))
      //   }, 300);
      // } catch (error) {
      //   console.log(error);
      //   setLoading(false);
      // }
    }
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
    <SafeAreaView style={{flex: 1, marginTop: 20, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          marginHorizontal: 10,
          marginBottom: 30,
          // marginTop: orientationScreen === 'landscape' ? 20 : 20,
          // marginBottom: orientationScreen === 'landscape' ? 20 : 20,
        }}>
        <View style={{marginTop: 20}}>
          <TextAtom value="Tipe Kategori" />
          <DropDownPicker
            placeholder="Pilih Tipe Kategori"
            items={[
              {label: 'Pilih Tipe Kategori', value: '', hidden: true},
              {label: 'Pemasukan', value: 'pemasukan'},
              {label: 'Pengeluaran', value: 'pengeluaran'},
            ]}
            defaultValue={tipeKategori}
            containerStyle={{height: 50, marginTop: 5}}
            style={{backgroundColor: COLOR_DISABLED, borderColor: COLOR_INPUT_PLACEHOLDER}}
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
              console.log(item);
              setTipeKategori(item.value);
            }}
          />
          <View style={{marginTop: 20}}>
            <TextAtom value="Nama Kategori" />
            <TextInputAtom
              label="Masukan Kategori"
              value={namaKategori}
              keyboardType={'default'}
              placeholderTextColor={COLOR_INPUT_PLACEHOLDER}
              onChangeText={setNamaKategori}
              mode={'outlined'}
              theme={{ colors: { primary: COLOR_ACTIVE}}}
              marginX={0}
              marginY={0}
            />
          </View>
        </View>

        <View style={{marginTop: 20, marginBottom: 20}}>
          <ButtonAtom
            title={loading ? 'Menyimpan Data' : 'Simpan'}
            uppercase={true}
            bgColor={COLOR_ACTIVE}
            action={() => {
              // closeModalInputKategori();
              editCategory();
            }}
            disabled={loading}
            marginX={0}
          />
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
};

export default InputEditCategory;
