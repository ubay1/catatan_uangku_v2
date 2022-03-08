/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, FAB } from 'react-native-paper';
import { COLOR_ACTIVE, COLOR_ACTIVE_SOFT } from '../../../assets/styles/global';
import user from '../../../store/user';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import TextAtom from '../../atoms/text/TextAtom';
import styles from '../../../assets/styles/global';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { IPropsHomeScreen } from './types';

const Greeting = ({name}: IPropsHomeScreen) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const sliceToOneString = (value: string) => {
    return value.slice(0,1).toUpperCase();
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View style={stylesCustom.container}>
      <View style={stylesCustom.greeting}>
        <Avatar.Text
          size={responsiveHeight(7)}
          label={sliceToOneString(name)}
          color={COLOR_ACTIVE}
          style={{backgroundColor: COLOR_ACTIVE_SOFT}}
          labelStyle={{fontWeight: 'bold'}}
        />
        <View style={{marginLeft: 10}}>
          <View>
            <TextAtom value="Selamat Datang," color="#000"/>
          </View>
          <View>
            <TextAtom value={name} color="#000" fontWeight={'bold'} textTransform={'capitalize'}/>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  greeting: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Greeting;
