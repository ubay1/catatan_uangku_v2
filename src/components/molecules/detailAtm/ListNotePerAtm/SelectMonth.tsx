/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors, Button, Portal, Modal} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import TextAtom from '../../../atoms/text/TextAtom';
import styles, {
  COLOR_ACTIVE,
  COLOR_DISABLED,
  COLOR_INPUT_PLACEHOLDER,
} from '../../../../assets/styles/global';
import moment from 'moment';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getFilterCatatanByDate,
  getFilterCatatanByMonth,
} from '../../../../../db/database';
import {IPropsSelectMonth} from './types';
import ModalAtom from '../../../atoms/alert/ModalAtom';
import ButtonAtom from '../../../atoms/button/ButtonAtom';

const SelectMonth = ({
  loading,
  fromDate,
  toDate,
  selectJenisFilter,
  showFromDate,
  showToDate,
  modeFromDate,
  modeToDate,
  eventSelectTypeNote,
  eventOpenCustomFromDate,
  eventOpenCustomToDate,
  eventCloseModalCustom,
  visibleCustomDate,
  isShowFromDateCustom,
  isShowToDateCustom,
  onChangeFromDate,
  showDatepickerFromDate,
  onChangeToDate,
  showDatepickerToDate,
  onSubmitCustomDate,
}: IPropsSelectMonth) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View style={stylesCustom.container}>
      <DropDownPicker
        placeholder="Pilih Tipe Catatan"
        items={[
          {label: 'Pilih Tipe Catatan', value: '', hidden: true},
          {label: 'Bulan Ini', value: 'bulanIni'},
          {label: 'Bulan Lalu', value: 'bulanLalu'},
          {label: 'Atur Tanggal Sendiri', value: 'customTanggal'},
        ]}
        defaultValue={selectJenisFilter}
        containerStyle={{height: 50, marginHorizontal: 0}}
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
          // console.log(item)
          eventSelectTypeNote(item.value);
          // setselectJenisFilter(item.value);
          // settampungJenisFilter(item.value);
        }}
      />
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    top: 10,
    width: '100%',
    // backgroundColor: 'red',
    height: 200,
  },
  border_text: {
    backgroundColor: Colors.white,
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: Colors.grey600,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  border_calender: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderColor: Colors.grey600,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default SelectMonth;
