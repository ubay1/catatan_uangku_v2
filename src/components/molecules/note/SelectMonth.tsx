/* eslint-disable no-undef */
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
import TextAtom from '../../atoms/text/TextAtom';
import styles, {
  COLOR_DISABLED,
  COLOR_INPUT_PLACEHOLDER,
} from '../../../assets/styles/global';
import moment from 'moment';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getFilterCatatanByDate,
  getFilterCatatanByMonth,
} from '../../../../db/database';
import {IPropsSelectMonth} from './types';

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
        labelStyle={{textTransform: 'capitalize', fontSize: 15}}
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

      <Portal>
        <Modal
          visible={visibleCustomDate}
          onDismiss={eventCloseModalCustom}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
          }}
          style={{marginHorizontal: 20}}>
          <Text style={{marginBottom: 5, color: '#000'}}>Dari Tanggal</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 55,
            }}>
            <View
              style={{
                ...stylesCustom.border_text,
              }}>
              <Text style={{color: '#000'}}>
                {moment(fromDate).format('YYYY-MM-DD').toString()}
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
              }}>
              <Button
                onPress={showDatepickerFromDate}
                style={{
                  ...stylesCustom.border_calender,
                }}>
                <IconMCI name="calendar" size={25} color={Colors.black} />
              </Button>
            </View>
            {showFromDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                maximumDate={new Date()}
                mode={modeFromDate}
                is24Hour={true}
                display="default"
                onChange={onChangeFromDate}
              />
            )}
          </View>

          <Text style={{marginBottom: 5, marginTop: 10, color: '#000'}}>
            Sampai Tanggal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 55,
            }}>
            <View
              style={{
                ...stylesCustom.border_text,
              }}>
              <Text style={{color: '#000'}}>
                {moment(toDate).format('YYYY-MM-DD').toString()}
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
              }}>
              <Button
                onPress={showDatepickerToDate}
                style={{
                  ...stylesCustom.border_calender,
                }}>
                <IconMCI name="calendar" size={25} color={Colors.black} />
              </Button>
            </View>
            {showToDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toDate}
                maximumDate={new Date()}
                mode={modeToDate}
                is24Hour={true}
                display="default"
                onChange={onChangeToDate}
              />
            )}
          </View>
          <Button
            dark
            uppercase={false}
            color={Colors.blue400}
            mode="contained"
            onPress={() => {
              // setloading(true);
              // getCatatanByDate();
              // setTimeout(() => {
              //   setloading(false)
              // }, 2000);
            }}
            contentStyle={{paddingVertical: 5}}
            style={{borderRadius: 5, marginTop: 10}}
            disabled={loading ? true : false}
            theme={{colors: {disabled: 'grey'}}}>
            {loading ? (
              <Text style={{fontSize: responsiveFontSize(2), color: 'grey'}}>
                Mengirim data ..
              </Text>
            ) : (
              <Text style={{fontSize: responsiveFontSize(2), color: '#fff'}}>
                Kirim
              </Text>
            )}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    top: 10,
    width: '100%',
    height: 150,
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
