/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors, Divider} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {COLOR_BLACK} from '../../../../assets/styles/global';
import {formatRupiah} from '../../../../helper/formatNumber';
import {RootState} from '../../../../store/rootReducer';
import TextAtom from '../../../atoms/text/TextAtom';
const Logo = require('../../../../assets/logo/logo2.png');
import styles from '../../../../assets/styles/global';

const ListCatatan = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const listNotes: any = useSelector((state: RootState) => state.listNote.data);
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
    <View style={{marginTop: 10}}>
      <View style={{borderBottomWidth: 1, width: '23%'}}>
        <TextAtom
          value="List Catatan"
          color={COLOR_BLACK}
          fontWeight={'bold'}
          textTransform={'none'}
        />
      </View>

      <View style={{marginTop: 20}}>
        {listNotes.length === 0 ? (
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={Logo} style={styles.logo} />
            <TextAtom value="Catatan tidak ditemukan." mBottom={20} />
          </View>
        ) : (
          listNotes.map((item: any) => {
            return (
              <View key={`item-${item.id}`}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: responsiveHeight(7),
                    marginBottom: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'space-between'}}>
                      <View style={{justifyContent: 'center', height: '50%'}}>
                        <TextAtom fontWeight={'bold'} value={item.keterangan} />
                      </View>
                      <View
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          flexDirection: 'row',
                          height: '50%',
                        }}>
                        <TextAtom
                          textTransform="uppercase"
                          color={Colors.grey400}
                          value={item.akun}
                        />
                        {item.tujuan === 'tarik tunai' ? (
                          <TextAtom
                            textTransform="uppercase"
                            color={
                              item.tipe === 'pemasukan'
                                ? Colors.green400
                                : Colors.red400
                            }
                            value="tarik tunai"
                            bgColor={
                              item.tipe === 'pemasukan'
                                ? Colors.green50
                                : Colors.red50
                            }
                            pHorizontal={5}
                            mLeft={10}
                            fontWeight="bold"
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
                            item.tipe === 'pemasukan'
                              ? Colors.green400
                              : Colors.red400
                          }
                          value={`${
                            item.tipe === 'pemasukan' ? '+ ' : '- '
                          } ${formatRupiah(item.nominal)}`}
                          fontWeight="bold"
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          height: '50%',
                        }}>
                        <TextAtom
                          textTransform="uppercase"
                          color={Colors.grey400}
                          textAlign="right"
                          value={moment(item.tanggal).format('L')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <Divider
                  style={{
                    marginBottom: 5,
                    borderColor: Colors.grey100,
                    borderWidth: 1,
                  }}
                />
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

export default ListCatatan;
