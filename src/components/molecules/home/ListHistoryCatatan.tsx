/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Colors, Divider} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  COLOR_ACTIVE,
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_WHITE,
} from '../../../assets/styles/global';
import {formatRupiah} from '../../../helper/formatNumber';
import TextAtom from '../../atoms/text/TextAtom';
import {IPropsListCatatan} from './types';
import styles from '../../../assets/styles/global';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import ButtonTextAtom from '../../atoms/button/ButtonTextAtom';
import List from '../../atoms/List';

const Logo = require('../../../assets/logo/logo2.png');

const ListHistoryCatatan = ({loading, allCatatan}: IPropsListCatatan) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  // const [data, setData] = React.useState(null);
  const [loadings, setloadings] = React.useState(true);

  React.useEffect(() => {
    setloadings(loading);
    return () => {
      loading;
    };
  }, [loading]);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const renderItems = ({item, index}: any) => {
    return (
      <View key={`item-${item.id}`}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: responsiveHeight(7),
          }}
          onPress={() => {
            // dispatch(setPage({ page: 'Edit' }));
            // setModalDetail(item);
            // <navigation.navigate('Detail', {
            //   data: item,
            //   listKategori: allKategori,
            //   saldoAtm: saldoatm,
            //   saldoDompet: saldodompet,
            // })>
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'space-between'}}>
              <View style={{justifyContent: 'center', height: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    color: '#000',
                  }}>
                  {item.keterangan}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: '50%',
                }}>
                <Text
                  style={{textTransform: 'uppercase', color: Colors.grey400}}>
                  {item.akun}
                </Text>
                {item.tujuan === 'tarik tunai' ? (
                  <Text
                    style={{
                      backgroundColor:
                        item.tipe === 'pemasukan'
                          ? Colors.green50
                          : Colors.red50,
                      marginLeft: 10,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color:
                        item.tipe === 'pemasukan'
                          ? Colors.green400
                          : Colors.red400,
                      paddingHorizontal: 5,
                    }}>
                    Tarik Tunai
                  </Text>
                ) : (
                  <Text />
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 10, height: '100%'}}>
              <View style={{justifyContent: 'center', height: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    color:
                      item.tipe === 'pemasukan'
                        ? Colors.green400
                        : Colors.red400,
                  }}>
                  {item.tipe === 'pemasukan' ? '+ ' : '- '}
                  {formatRupiah(item.nominal)}
                </Text>
              </View>
              <View style={{justifyContent: 'center', height: '50%'}}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: Colors.grey400,
                    textAlign: 'right',
                  }}>
                  {moment(item.tanggal).format('L')}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* <View style={{
          marginBottom: 5, borderColor: Colors.grey600, borderWidth: 1.5,
          borderStyle: 'dotted', borderRadius: 1,
        }}
        /> */}
        <Divider
          style={{
            marginBottom: 5,
            borderColor: Colors.grey300,
            borderWidth: 0.3,
          }}
        />
      </View>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <View style={stylesCustom.container}>
        <View style={stylesCustom.borderTitle}>
          <View style={{borderBottomWidth: 1}}>
            <TextAtom
              value="List Catatan Terakhir"
              color={COLOR_BLACK}
              fontWeight={'bold'}
              textTransform={'none'}
            />
          </View>
          <View>
            <ButtonTextAtom
              title="Tambah Catatan"
              paddingX={5}
              paddingY={5}
              rounded={5}
              textColor={COLOR_ACTIVE}
              uppercase={false}
            />
          </View>
        </View>
      </View>
      {loadings ? (
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={COLOR_ACTIVE}
        />
      ) : allCatatan.length === 0 ? (
        <View style={stylesCustom.spaceIfNoteNotFound}>
          <Image source={Logo} style={styles.logo} />
          <TextAtom value="Belum ada catatan ." />
        </View>
      ) : (
        <List data={allCatatan} renderItem={renderItems} />
      )}
    </>
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
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListHistoryCatatan;
