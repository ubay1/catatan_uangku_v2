/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Image, Dimensions, ScrollView, Alert, Text, Keyboard, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';
import styles, { COLOR_ACTIVE, COLOR_ACTIVE_SOFT, COLOR_BLACK, COLOR_DISABLED, COLOR_DISABLED_TEXT, COLOR_ERROR, COLOR_WHITE } from '../../assets/styles/global';
import ButtonAtom from '../atoms/button/ButtonAtom';
import TextInputAtom from '../atoms/input/TextInputAtom';

import SnackbarAtom from '../atoms/alert/SnackbarAtom';
// const SnackbarAtom = lazy(()=> import('../atoms/alert/SnackbarAtom'));
const Logo = require('../../assets/logo/logo2.png');

const IntroOrganism = () => {
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

  const { signIn } = React.useContext<any>(AuthContext);

  useEffect(() => {
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

  const submitData = () => {
    if (name === '') {
      setVisibleSnackbar({
        isOpen: true,
        type: 'error',
        msg: 'Harap isi semua form yang disediakan',
      });
    } else {
      setloading(true);

      setTimeout(() => {
        setVisibleSnackbar({
          isOpen: true,
          type: 'success',
          msg: 'Nama berhasil disimpan',
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
      <Image source={Logo} style={styles.logo} />
      <TextInputAtom
        mode={'outlined'}
        label="Masukan nama anda"
        onChangeText={(e: any) => setName(e)}
        theme={{ colors: { primary: COLOR_ACTIVE}}}
      />
      <View style={{marginHorizontal: 20, marginTop: 10}}>
        <ButtonAtom
          title={loading ? 'Menyimpan Data' : 'Simpan'}
          uppercase={true}
          marginX={0}
          bgColor={loading ? COLOR_DISABLED : COLOR_ACTIVE}
          textColor={loading ? COLOR_DISABLED_TEXT : COLOR_WHITE}
          action={submitData}
          disabled={loading}
        />
      </View>
      {/* <Suspense fallback={<Text> loading.. </Text>}> */}
        <SnackbarAtom
          title={visibleSnackbar.msg}
          isOpen={visibleSnackbar.isOpen}
          action={closeSnackbar}
          bgColor={visibleSnackbar.type === 'error' ? COLOR_ERROR : visibleSnackbar.type === 'success' ? COLOR_ACTIVE : COLOR_WHITE}
          color={visibleSnackbar.type === 'error' ? COLOR_WHITE : COLOR_WHITE}
        />
      {/* </Suspense> */}
    </ScrollView>
  );
};

export default IntroOrganism;
