/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFh from 'react-native-vector-icons/Feather';
import {getAllCatatan, getAllKategori} from '../../../../db/database';
import TextAtom from '../../atoms/text/TextAtom';
import {formatRupiah} from '../../../helper/formatNumber';
import {IPropsListSaldo} from './types';
import ButtonTextAtom from '../../atoms/button/ButtonTextAtom';
import {COLOR_ERROR} from '../../../assets/styles/global';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import {setPage} from '../../../store/whatsPage';

const ListSaldo = ({loading, allBalanceData, navigation}: IPropsListSaldo) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const [loadings, setloadings] = React.useState(true);

  React.useEffect(() => {
    setloadings(loading);
    return () => {
      loading;
    };
  }, [loading]);

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <View
        style={{
          ...stylesCustom.cardSaldo,
          backgroundColor: Colors.orange50,
        }}>
        <View style={stylesCustom.betweenCenterRow}>
          <View
            style={{
              ...stylesCustom.spaceBackgroundColor,
              backgroundColor: Colors.orange400,
            }}>
            <IconFh name="dollar-sign" color="#fff" size={30} />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TextAtom value="Total Saldo" />
            {loadings ? (
              <ActivityIndicator animating={true} color={Colors.red500} />
            ) : (
              <TextAtom
                value={formatRupiah(allBalanceData.totalSaldo)}
                fontWeight={'bold'}
              />
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          ...stylesCustom.cardSaldo,
          backgroundColor: Colors.green50,
        }}>
        <View style={{...stylesCustom.betweenCenterRow, width: '100%'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                ...stylesCustom.spaceBackgroundColor,
                backgroundColor: Colors.green400,
              }}>
              <IconEntypo name="credit-card" color="#fff" size={30} />
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <TextAtom value="Saldo ATM" />
              {loadings ? (
                <ActivityIndicator animating={true} color={Colors.blue500} />
              ) : (
                <TextAtom
                  value={formatRupiah(allBalanceData.saldoAtm)}
                  fontWeight={'bold'}
                />
              )}
            </View>
          </View>
          <View>
            <ButtonTextAtom
              title="Rincian"
              bgColor={Colors.green400}
              paddingX={5}
              paddingY={5}
              rounded={5}
              action={() => {
                dispatch(setPage({page: 'RincianAtm'}));
                navigation.navigate('RincianAtm', {
                  saldoAtm: allBalanceData.saldoAtm,
                });
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          ...stylesCustom.cardSaldo,
          backgroundColor: Colors.blue50,
        }}>
        <View style={stylesCustom.betweenCenterRow}>
          <View
            style={{
              ...stylesCustom.spaceBackgroundColor,
              backgroundColor: Colors.blue400,
            }}>
            <IconMCI name="bag-personal-outline" color="#fff" size={30} />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <TextAtom value="Saldo Dompet" />
            {loadings ? (
              <ActivityIndicator animating={true} color={Colors.blue500} />
            ) : (
              <TextAtom
                value={formatRupiah(allBalanceData.saldoDompet)}
                fontWeight={'bold'}
              />
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          ...stylesCustom.cardSaldo,
          backgroundColor: Colors.red50,
        }}>
        <View style={{...stylesCustom.betweenCenterRow, width: '100%'}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <View
              style={{
                ...stylesCustom.spaceBackgroundColor,
                backgroundColor: Colors.red400,
              }}>
              <IconMCI name="cellphone-nfc" color="#fff" size={30} />
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <TextAtom value="Saldo eMoney" />
              {loadings ? (
                <ActivityIndicator animating={true} color={Colors.blue500} />
              ) : (
                <TextAtom
                  value={formatRupiah(allBalanceData.saldoEmoney)}
                  fontWeight={'bold'}
                />
              )}
            </View>
          </View>
          <View>
            <ButtonTextAtom
              title="Rincian"
              bgColor={Colors.red400}
              paddingX={5}
              paddingY={5}
              rounded={5}
              action={() => {
                dispatch(setPage({page: 'RincianEmoney'}));
                navigation.navigate('RincianEmoney', {
                  saldoEmoney: allBalanceData.saldoEmoney,
                });
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const stylesCustom = StyleSheet.create({
  cardSaldo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 0,
    marginTop: 10,
    marginHorizontal: 10,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: .5,
  },
  betweenCenterRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spaceBackgroundColor: {
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default ListSaldo;
