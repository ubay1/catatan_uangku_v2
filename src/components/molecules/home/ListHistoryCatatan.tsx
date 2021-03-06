/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
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
import ButtonTextAtom from '../../atoms/button/ButtonTextAtom';
import ModalAtom from '../../atoms/alert/ModalAtom';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';
import ButtonIconTextAtom from '../../atoms/button/ButtonIconTextAtom';

const Logo = require('../../../assets/logo/logo2.png');

const ListHistoryCatatan = ({
  loading,
  allCatatan,
  allKategori,
  allAtm,
  allEmoney,
  saldoAtm,
  saldoDompet,
  saldoEmoney,
  navigation,
  openModalDelete,
}: IPropsListCatatan) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  // const [data, setData] = React.useState(null);
  const [loadings, setloadings] = React.useState(true);
  const [visibleModalInputType, setVisibleModalInputType] = React.useState(false);

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

  const filterNamaAtm = () => {
    const filterItem: any[] = [];
    allAtm.forEach((item: any) => {
        const list: any = {
          label: item.nama_atm,
          value: item.nama_atm,
        };
        filterItem.push(list);
    });
    return filterItem;
  };

  const filterNamaEmoney = () => {
    const filterItem: any[] = [];
    allEmoney.forEach((item: any) => {
        const list: any = {
          label: item.nama_emoney,
          value: item.nama_emoney,
        };
        filterItem.push(list);
    });
    return filterItem;
  };

  const filterAkun = (data: any) => {
    return data.akun === 'atm'
    ? `Atm (${data.nama_atm})`
    : data.akun === 'emoney'
    ? `e-Money (${data.nama_emoney})`
    : 'Dompet';
  };

  const filterType = (data: any) => {
    return `${data.tipe === 'pemasukan' ? '+ ' : '- '} ${formatRupiah(data.nominal)}`;
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
            height: 120,
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
                saldoAtm: saldoAtm,
                saldoDompet: saldoDompet,
                saldoEmoney: saldoEmoney,
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
                width: 150,
                height: 150,
              }}
            />
          </Pressable>
        </LinearGradient>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          colors={[Colors.red200, Colors.red100]}
          style={{
            height: 120,
            position: 'relative',
            width: '100%',
            borderRadius: 5,
            marginBottom: 10,
            // marginTop: 10,
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
                saldoAtm: saldoAtm,
                saldoDompet: saldoDompet,
                saldoEmoney: saldoEmoney,
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
                width: 150,
                height: 150,
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
        visible={visibleModalInputType}>
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
          <TextAtom value="Belum ada catatan." mBottom={20}/>
        </View>
      ) :
          allCatatan.map((item: any) => {
            return (
              <View key={`item-${item.id}`}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: responsiveHeight(7),
                    marginBottom: 5,
                    marginHorizontal: 10,
                  }}
                >
                  <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'space-between'}}>
                      <View style={{justifyContent: 'center', height: '50%'}}>
                        <TextAtom
                          fontWeight={'bold'}
                          value={item.keterangan}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          flexDirection: 'row',
                          height: '50%',
                        }}>
                        <TextAtom
                          color={Colors.grey400}
                          value={filterAkun(item)}
                          size={14}
                        />
                        {item.tujuan === 'tarik tunai' ? (
                          <TextAtom
                            textTransform="capitalize"
                            color={
                              item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400
                            }
                            value="tarik tunai"
                            bgColor={
                              item.tipe === 'pemasukan' ? Colors.green50 : Colors.red50
                            }
                            pHorizontal={5}
                            mLeft={5}
                            fontWeight="bold"
                            size={14}
                          />
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
                        <TextAtom
                          textTransform="capitalize"
                          color={
                            item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400
                          }
                          value={filterType(item)}
                          fontWeight="bold"
                        />
                      </View>
                      <View style={{justifyContent: 'center', alignItems: 'flex-end', height: '50%'}}>
                        <TextAtom
                          textTransform="uppercase"
                          color={Colors.grey400}
                          textAlign="right"
                          value={moment(item.tanggal).format('L')}
                          size={14}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    height: 35,
                    marginHorizontal: 10,
                    // backgroundColor: 'orange',
                  }}>
                  <View
                    style={{width: '48%', height: '100%', justifyContent: 'center'}}>
                    <ButtonIconTextAtom
                      bgColor={COLOR_WHITE}
                      borderColor={COLOR_ERROR}
                      borderWidth={1}
                      icon="delete"
                      iconColor={COLOR_ERROR}
                      textColor={COLOR_ERROR}
                      title="Hapus"
                      size={20}
                      textSize={14}
                      action={() => {
                        openModalDelete(item.id);
                      }}
                    />
                  </View>
                  <View
                    style={{width: '48%', height: '100%', justifyContent: 'center'}}>
                    <ButtonIconTextAtom
                      bgColor={COLOR_WHITE}
                      borderColor={Colors.blue400}
                      borderWidth={1}
                      icon="pencil"
                      iconColor={COLOR_ACTIVE}
                      textColor={COLOR_ACTIVE}
                      title="Edit"
                      size={20}
                      textSize={14}
                      action={() => {
                        dispatch(setPage({ page: 'DetailNote' }));
                        navigation.navigate('DetailNote', {
                          // data: item,
                          // saldoAtm: saldoAtm,
                          // saldoDompet: saldoDompet,
                          title: item.tipe === 'pemasukan' ? 'Edit Pemasukan' : 'Edit Pengeluaran',
                          type: item.tipe,
                          data: item,
                          listKategori: filterKategori(item.tipe),
                          listAtm: filterNamaAtm(),
                          listEmoney: filterNamaEmoney(),
                          saldoAtm: saldoAtm,
                          saldoDompet: saldoDompet,
                          saldoEmoney: saldoEmoney,
                        });
                      }}
                    />
                  </View>
                </View>
                <Divider
                  style={{
                    marginBottom: 5,
                    borderColor: Colors.grey100,
                    borderWidth: 0,
                  }}
                />
              </View>
            );
          }
        // List data={allCatatan} renderItem={renderItems} />
      )
      }
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
    // marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListHistoryCatatan;
