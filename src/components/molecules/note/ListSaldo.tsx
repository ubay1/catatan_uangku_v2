/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native-paper';
import { formatRupiah } from '../../../helper/formatNumber';
import TextAtom from '../../atoms/text/TextAtom';
import styles, { COLOR_ACTIVE_SOFT } from '../../../assets/styles/global';

const ListSaldo = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  // const [data, setData] = React.useState(null);
  const [fetchAllCatatan, setfetchAllCatatan] = useState(false);
  const [allTotal, setallTotal] = useState(0);
  const [totalPemasukan, settotalPemasukan] = useState(0);
  const [totalPengeluaran, settotalPengeluaran] = useState(0);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <View style={{marginTop: 80, zIndex: 0}}>
      {
        fetchAllCatatan ?
          <ActivityIndicator animating={true} color={Colors.blue400} style={{ marginTop: 20 }} />
          :
          <View>
            <View style={{
              borderLeftColor: Colors.blue300,
              ...stylesCustom.styleTotal,
              backgroundColor: Colors.blue50,
            }}
            >
              <View>
                <TextAtom value="Total Seluruh Saldo" />
                <TextAtom value={formatRupiah(allTotal)} fontWeight="bold" />
              </View>
            </View>
            <View
              style={{
                borderLeftColor: Colors.green300,
                ...stylesCustom.styleTotal,
                backgroundColor: Colors.green50,
              }}
            >
              <View>
                <TextAtom value="Total Pemasukan" />
                <TextAtom value={formatRupiah(totalPemasukan)} fontWeight="bold" />
              </View>
            </View>
            <View
              style={{
                borderLeftColor: Colors.red300,
                ...stylesCustom.styleTotal,
                backgroundColor: Colors.red50,
              }}
            >
              <View>
                <TextAtom value="Total Pengeluaran" />
                <TextAtom value={formatRupiah(totalPengeluaran)} fontWeight="bold" />
              </View>
            </View>
          </View>
      }
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  styleTotal: {
    height: 50,
    backgroundColor: '#fff', padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 7,
    // borderRightColor: Colors.grey600, borderRightWidth: 1,
    // borderTopColor: Colors.grey600, borderTopWidth: 1,
    // borderBottomColor: Colors.grey600, borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10, elevation: 0,
  },
});

export default ListSaldo;
