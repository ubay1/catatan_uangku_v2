/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Divider} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useSelector, useDispatch} from 'react-redux';
import {COLOR_ACTIVE, COLOR_ERROR} from '../../../assets/styles/global';
import {AppDispatch} from '../../../store';
import {RootState} from '../../../store/rootReducer';
import {setPage} from '../../../store/whatsPage';
import {IPropsListCategory} from './types';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../../assets/styles/global';
import TextAtom from '../../atoms/text/TextAtom';
import ButtonIconAtom from '../../atoms/button/ButtonIconAtom';
const Logo = require('../../../assets/logo/logo2.png');

const ListCategory = ({
  fetchListKategori,
  listKategori,
  openModalInputKategori,
  openModalDelete,
  setidListKategori,
}: IPropsListCategory) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const whatspage = useSelector((state: RootState) => state.whatsPage);
  const dispatch: AppDispatch = useDispatch();

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
    <ScrollView
      style={{
        // marginHorizontal: 10,
        height: responsiveHeight(100),
      }}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            marginBottom: 30,
            marginTop: 20,
          }}>
          {!fetchListKategori ? (
            <ActivityIndicator
              animating={true}
              color={COLOR_ACTIVE}
              size="large"
              style={{marginTop: 20}}
            />
          ) : listKategori.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: responsiveHeight(80),
              }}>
              <Image source={Logo} style={styles.logo} />
              <TextAtom value="Belum ada kategori" mTop={10} />
            </View>
          ) : (
            listKategori.map((item: any, index: number) => {
              return (
                <View key={`item-${item.id}`} style={{}}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                      height: responsiveHeight(7),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <View style={{justifyContent: 'center', height: '100%'}}>
                        <View style={{height: '50%'}}>
                          <TextAtom
                            value={item.nama_kategori}
                            textTransform="capitalize"
                            fontWeight="bold"
                          />
                        </View>
                        <View style={{height: '50%'}}>
                          <TextAtom
                            value={item.tipe_kategori}
                            textTransform="capitalize"
                            color={Colors.grey400}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <View style={{marginRight: 5}}>
                            <ButtonIconAtom
                              icon="pencil"
                              color={COLOR_ACTIVE}
                              size={18}
                              action={() => {
                                // dispatch(setPage({page: 'Input'}));
                                openModalInputKategori(true, item.id, item.tipe_kategori, item.nama_kategori);
                              }}
                            />
                          </View>

                        {/* <TouchableOpacity
                          style={{
                            padding: 5,
                          }}
                          onPress={() => {
                            dispatch(setPage({page: 'Input'}));
                            openModalInputKategori(true, index);
                          }}>
                          <IconMCI
                            name="pencil"
                            size={20}
                            color={Colors.blue400}
                          />
                        </TouchableOpacity> */}

                          <View>
                            <ButtonIconAtom
                              icon="delete"
                              color={COLOR_ERROR}
                              size={18}
                              action={() => {
                                openModalDelete(item.id);
                              }}
                            />
                          </View>
                        {/* <TouchableOpacity
                          style={{
                            padding: 5,
                          }}
                          onPress={() => {
                            openModalDelete();
                            // setidListKategori(item.id);
                          }}>
                          <IconMCI
                            name="delete"
                            size={20}
                            color={Colors.blue400}
                          />
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>

                  <Divider
                    style={{
                      marginBottom: 5,
                      borderColor: Colors.grey300,
                      borderWidth: 0.3,
                    }}
                  />
                </View>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListCategory;
