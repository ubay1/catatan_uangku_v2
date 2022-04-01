/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from 'react-native-paper';
import {
  COLOR_DISABLED,
  COLOR_INPUT_PLACEHOLDER,
} from '../../assets/styles/global';
import {IPropsSelectMonth} from './types';

const SelectMonth = ({
  selectJenisFilter,
  eventSelectTypeNote,
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
