/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { COLOR_ACTIVE, COLOR_DISABLED } from '../../../../assets/styles/global';
import { AppDispatch } from '../../../../store';
import { setHideTab, setShowTab } from '../../../../store/navigationRedux';
import { IPropsRincianAtm } from './types';
import styles from '../../../../assets/styles/global';
import TextAtom from '../../../atoms/text/TextAtom';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Divider } from 'react-native-paper';
import { formatRupiah } from '../../../../helper/formatNumber';

const Logo = require('../../../../assets/logo/logo2.png');


const ListAtm = ({navigation, route, loading, listAtm}: IPropsRincianAtm) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setHideTab());
    navigation.addListener('beforeRemove', (param: any) => {
      dispatch(setShowTab());
    });
  }, [navigation]);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View>
      {
        loading ?
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={COLOR_ACTIVE}
          />
        : listAtm.length === 0 ?
          <View style={stylesCustom.spaceIfNoteNotFound}>
            <Image source={Logo} style={styles.logo} />
            <TextAtom value="Belum ada ATM" mBottom={20}/>
          </View>
        :
      listAtm.map((item: any) => {
        return (
          <>
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // height: responsiveHeight(7),
                // marginBottom: 5,
                marginHorizontal: 10,
              }}
            >
              <TextAtom value={item.nama_atm} mBottom={20} mTop={20}/>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextAtom value={formatRupiah(item.totalSaldo)} mBottom={20} mTop={20} mRight={20}/>
                <IconMCI name="chevron-right" size={25} />
              </View>
            </TouchableOpacity>
            <Divider
              style={{
                marginBottom: 5,
                borderColor: Colors.grey100,
                borderWidth: 0,
              }}
            />
          </>
        );
      })
    }

    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  borderTitle: {
    // borderBottomColor: Colors.grey600,
    // borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'transparent',
    elevation: 0,
    borderStyle: 'dotted',
    borderRadius: 5,
    width: '100%',
  },
  spaceIfNoteNotFound: {
    // marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListAtm;
