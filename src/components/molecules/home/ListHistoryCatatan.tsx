/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import {Button, Colors, Divider} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  COLOR_ACTIVE,
  COLOR_ACTIVE_SOFT,
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_ERROR_SOFT,
  COLOR_WHITE,
} from '../../../assets/styles/global';
import {formatRupiah} from '../../../helper/formatNumber';
import TextAtom from '../../atoms/text/TextAtom';
import {IPropsListCatatan} from './types';
import styles from '../../../assets/styles/global';
import ButtonTextAtom from '../../atoms/button/ButtonTextAtom';
import List from '../../atoms/List';
import ModalAtom from '../../atoms/alert/ModalAtom';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import {useFocusEffect} from '@react-navigation/native';
import ButtonAtom from '../../atoms/button/ButtonAtom';
import ButtonIconAtom from '../../atoms/button/ButtonIconAtom';
import ButtonIconTextAtom from '../../atoms/button/ButtonIconTextAtom';
import { deleteCatatan } from '../../../../db/database';

const Logo = require('../../../assets/logo/logo2.png');

const ListHistoryCatatan = ({
  loading,
  allCatatan,
  allKategori,
  saldoAtm,
  saldoDompet,
  navigation,
  openModalDelete,
}: IPropsListCatatan) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  // const [data, setData] = React.useState(null);
  const [loadings, setloadings] = React.useState(true);
  const [visibleModalInputType, setVisibleModalInputType] = React.useState(
    false,
  );
  const [visibleModalDetailNote, setVisibleModalDetailNote] = React.useState(
    false,
  );

  React.useEffect(() => {
    setloadings(loading);
    return () => {
      loading;
    };
  }, [loading]);
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */

  /* ------------------------- Modal Select Input Type ------------------------ */
  const showModalSelectInputType = () => {
    setVisibleModalInputType(true);
  };

  const closeModalSelectInputType = () => {
    setVisibleModalInputType(false);
  };

  const filterKategori = (type: string) => {
    const filterItem: any[] = [];
    allKategori.forEach((item: any) => {
      if (item.tipe_kategori === type) {
        const list: any = {
          label: item.nama_kategori,
          value: item.nama_kategori,
        };
        filterItem.push(list);
      }
    });
    return filterItem;
  };

  const SelectTypeNote = () => {
    return (
      <View
        style={{
          // flex:1,
          marginTop: 20,
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          colors={[Colors.purple200, Colors.purple100]}
          style={{
            height: responsiveHeight(15),
            position: 'relative',
            width: '100%',
            borderRadius: 5,
            marginBottom: 20,
          }}>
          <Pressable
            style={{
              borderRadius: 5,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              top: 3,
              // backgroundColor: 'red'
            }}
            onPress={() => {
              dispatch(setPage({page: 'AddNote'}));
              navigation.navigate('AddNote', {
                title: 'Input Pemasukan',
                type: 'pemasukan',
                data: filterKategori('pemasukan'),
                saldoAtm: saldoAtm,
                saldoDompet: saldoDompet,
              });
              closeModalSelectInputType();
            }}>
            <TextAtom
              value="Pemasukan"
              color={Colors.purple400}
              fontWeight="bold"
              size={20}
            />
            <Image
              source={require('../../../assets/images/pemasukan.png')}
              resizeMode="stretch"
              style={{
                width: responsiveHeight(22),
                height: responsiveHeight(22),
              }}
            />
          </Pressable>
        </LinearGradient>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          colors={[Colors.red200, Colors.red100]}
          style={{
            height: responsiveHeight(15),
            position: 'relative',
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Pressable
            style={{
              borderRadius: 5,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              top: 3,
              // backgroundColor: 'red'
            }}
            onPress={() => {
              dispatch(setPage({page: 'AddNote'}));
              navigation.navigate('AddNote', {
                title: 'Input Pengeluaran',
                type: 'pengeluaran',
                data: filterKategori('pengeluaran'),
                saldoAtm: saldoAtm,
                saldoDompet: saldoDompet,
              });
              closeModalSelectInputType();
            }}>
            <TextAtom
              value="Pengeluaran"
              color={Colors.red400}
              fontWeight="bold"
              size={20}
            />
            <Image
              source={require('../../../assets/images/pengeluaran.png')}
              resizeMode="stretch"
              style={{
                width: responsiveHeight(22),
                height: responsiveHeight(22),
              }}
            />
          </Pressable>
        </LinearGradient>
      </View>
    );
  };

  const ModalOpenSelectTypeNote = () => {
    return (
      <ModalAtom
        closeModal={closeModalSelectInputType}
        visible={visibleModalInputType}
        setPageActive="Beranda"
      >
        <SelectTypeNote />
      </ModalAtom>
    );
  };
  /* ------------------------- Modal Select Input Type ------------------------ */

  /* ---------------------------- Modal Delete --------------------------- */
  /* ---------------------------- Modal Delete --------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <ModalOpenSelectTypeNote />

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
              action={showModalSelectInputType}
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
        // <List data={allCatatan} renderItem={renderItems} />
        allCatatan.map((item: any, index: number) => (
          <View key={`item-${item.id}`}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: responsiveHeight(7),
                marginHorizontal: 10,
              }}
              onPress={() => {
                // dispatch(setPage({ page: 'Edit' }));
                // showModalDetailNote(item);
                navigation.navigate('Detail', {
                  data: item,
                  listKategori: allKategori,
                  saldoAtm: saldoAtm,
                  saldoDompet: saldoDompet,
                });
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
        ))
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
