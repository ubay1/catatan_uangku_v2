/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createAtm, createEmoney} from '../../../../../db/database';
import {
  COLOR_ERROR,
  COLOR_ACTIVE,
  COLOR_WHITE,
  COLOR_DISABLED,
  COLOR_INPUT_PLACEHOLDER,
  COLOR_DISABLED_TEXT,
} from '../../../../assets/styles/global';
import {AppDispatch} from '../../../../store';
import { setPage } from '../../../../store/whatsPage';
import SnackbarAtom from '../../../atoms/alert/SnackbarAtom';
import ButtonAtom from '../../../atoms/button/ButtonAtom';
import TextInputAtom from '../../../atoms/input/TextInputAtom';
import TextAtom from '../../../atoms/text/TextAtom';
import {IPropsFormInputAddEmoney} from './types';

const InputAddEmoney = ({navigation, route}: IPropsFormInputAddEmoney) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const [namaEmoney, setNamaEmoney] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // snackbar
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */

  const addEmoney = async () => {
    setLoading(true);

    try {
      const data = {
        nama_emoney: namaEmoney,
      };
      await createEmoney(data);
      setTimeout(() => {
        setVisibleSnackbar({
          isOpen: true,
          type: 'success',
          msg: 'Emoney berhasil ditambahkan',
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
        setNamaEmoney('');
        setLoading(false);
        dispatch(setPage({page: 'AddNote'}));
        navigation.goBack();
      }, 1000);
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
    <View>
      <View>
        <View style={{marginTop: 0}}>
          <TextAtom value="Nama eMoney" />
          <TextInputAtom
            label="Masukan Nama eMoney"
            value={namaEmoney}
            keyboardType={'default'}
            placeholderTextColor={COLOR_INPUT_PLACEHOLDER}
            onChangeText={setNamaEmoney}
            mode={'outlined'}
            theme={{colors: {primary: COLOR_ACTIVE}}}
            marginX={0}
            marginY={0}
          />
        </View>
      </View>

      <View style={{marginTop: 20, marginBottom: 20}}>
        <ButtonAtom
          title={loading ? 'Menyimpan Data' : 'Simpan'}
          uppercase={true}
          bgColor={loading ? COLOR_DISABLED : COLOR_ACTIVE}
          textColor={loading ? COLOR_DISABLED_TEXT : COLOR_WHITE}
          action={() => {
            // closeModalInputKategori();
            addEmoney();
          }}
          disabled={loading}
          marginX={0}
        />
      </View>

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

export default InputAddEmoney;
