/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Image, Dimensions, ScrollView, Alert, Text, Keyboard, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import { AuthContext } from '../../../../context/AuthContext';
import styles, { COLOR_ACTIVE, COLOR_BLACK, COLOR_DISABLED, COLOR_ERROR, COLOR_WHITE } from '../../../assets/styles/global';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import TextInputAtom from '../../atoms/input/TextInputAtom';

const SnackbarAtom = lazy(()=> import('../../atoms/alert/SnackbarAtom'));

const Intro = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = React.useState({
    isOpen: false,
    type: '',
    msg: '',
  });

  const [orientationScreen, setorientationScreen] = useState('');

  const { signIn } = React.useContext<any>(AuthContext);

  useEffect(() => {
    getOrientation();
    Dimensions.addEventListener('change', () => {
      getOrientation();
    });

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('open keyboard');
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('close keyboard');
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  };

  const submitData = () => {
    if (name === '') {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi form yang disediakan',
      });
    } else {
      setloading(true);

      setTimeout(() => {
        setVisibleSnackbar({
          isOpen: true,
          type: 'success',
          msg: 'Nama telah disimpan',
        });
      }, 2000);

      setTimeout(() => {
        setloading(false);
        signIn(name, true);
      }, 2500);
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
    <ScrollView contentContainerStyle={{flex: isKeyboardVisible ? 0 : 1, justifyContent: 'center'}} style={{backgroundColor: '#fff'}}>
      <Image source={require('../../../assets/logo/logo2.png')} style={styles.logo} />
      <TextInputAtom
        mode={'outlined'}
        label="Masukan nama anda"
        onChangeText={(e: any) => setName(e)}
        theme={{ colors: { primary: COLOR_ACTIVE}}}
      />
      <ButtonAtom
        title={loading ? 'menyimpan data' : 'simpan'}
        uppercase={true}
        color={Colors.blue400}
        mode="contained"
        action={submitData}
        disabled={loading}
        theme={{ colors: { disabled: COLOR_DISABLED } }}
      />
      <Suspense fallback={<Text />}>
        <SnackbarAtom
          title={visibleSnackbar.msg}
          isOpen={visibleSnackbar.isOpen}
          action={closeSnackbar}
          bgColor={visibleSnackbar.type === 'error' ? COLOR_ERROR : visibleSnackbar.type === 'success' ? COLOR_ACTIVE : COLOR_WHITE}
          color={visibleSnackbar.type === 'error' ? COLOR_WHITE : COLOR_WHITE}
        />
      </Suspense>
    </ScrollView>
  );
};

export default Intro;
