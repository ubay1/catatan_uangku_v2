/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import realm, {
  createDefaultEmoney,
  createDefaultKategori,
  SALDO_SCHEMA,
} from '../../../db/database';
import {AppDispatch} from '../../store';
import {setCategory} from '../../store/category';

const SplashScreenss = () => {
  const loadAll = async () => {
    try {
      const values: any = await Promise.all([
        createDefaultKategori(),
        createDefaultEmoney(),
      ]);
      console.log(values);
    } catch (error) {
      console.log('error membuat default kategori dan default emoney');
    } finally {
      console.log('sukses membuat default kategori dan default emoney');
    }
  };

              // const createKategori = () => {
              //   createDefaultKategori()
              //     .then(item => {
              //       console.log('data default kategori = ', item);
              //     })
              //     .catch(err => {
              //       console.log('error = ', err);
              //     });
              // };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          // backgroundColor: '#eee',
          // opacity: .5,
          height: responsiveHeight(150),
          width: responsiveWidth(150),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <ActivityIndicator size="large" color={Colors.blue400} />
        {/* <Text style={{color:'#152A3B', fontSize: responsiveFontSize(2)}}>cek data user..</Text> */}
      </View>
    </SafeAreaView>
  );
};
export default SplashScreenss;
