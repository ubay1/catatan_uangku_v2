/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLOR_ACTIVE, COLOR_DISABLED} from '../../../../assets/styles/global';
import {formatRupiah} from '../../../../helper/formatNumber';
import TextAtom from '../../../atoms/text/TextAtom';
import {IPropsFooterRincianEmoney} from './types';

const FooterListEmoney = ({loading, totalSaldo}: IPropsFooterRincianEmoney) => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopColor: COLOR_DISABLED,
        borderWidth: 1,
        borderColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        elevation: 0.6,
      }}>
      <TextAtom value="Total" size={20} />
      {loading ? (
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={COLOR_ACTIVE}
        />
      ) : (
        <TextAtom value={formatRupiah(totalSaldo)} size={20} />
      )}
    </View>
  );
};

export default FooterListEmoney;
