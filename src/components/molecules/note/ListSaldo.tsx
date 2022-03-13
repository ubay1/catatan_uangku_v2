/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {formatRupiah} from '../../../helper/formatNumber';
import TextAtom from '../../atoms/text/TextAtom';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

const ListSaldo = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  // const [data, setData] = React.useState(null);
  const totalSaldo: any = useSelector(
    (state: RootState) => state.listNote.totalSaldo,
  );
  const totalSaldoPemasukan: any = useSelector(
    (state: RootState) => state.listNote.totalSaldoPemasukan,
  );
  const totalSaldoPengeluaran: any = useSelector(
    (state: RootState) => state.listNote.totalSaldoPengeluaran,
  );
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
      <View>
        {/* <View
          style={{
            borderLeftColor: Colors.blue300,
            ...stylesCustom.styleTotal,
            backgroundColor: Colors.blue50,
          }}>
          <View>
            <TextAtom value="Total Seluruh Saldo" />
            <TextAtom value={formatRupiah(totalSaldo)} fontWeight="bold" />
          </View>
        </View> */}
        <View
          style={{
            borderLeftColor: Colors.green300,
            ...stylesCustom.styleTotal,
            backgroundColor: Colors.green50,
          }}>
          <View>
            <TextAtom value="Total Pemasukan" />
            <TextAtom
              value={formatRupiah(totalSaldoPemasukan)}
              fontWeight="bold"
            />
          </View>
        </View>
        <View
          style={{
            borderLeftColor: Colors.red300,
            ...stylesCustom.styleTotal,
            backgroundColor: Colors.red50,
          }}>
          <View>
            <TextAtom value="Total Pengeluaran" />
            <TextAtom
              value={formatRupiah(totalSaldoPengeluaran)}
              fontWeight="bold"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  styleTotal: {
    height: 50,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 7,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 0,
  },
});

export default ListSaldo;
