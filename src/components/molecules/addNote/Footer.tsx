/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { COLOR_ACTIVE, COLOR_ACTIVE_SOFT } from '../../../assets/styles/global';
import ButtonAtom from '../../atoms/button/ButtonAtom';

interface IPropsFooterAddNote {
  loading: boolean;
  submitNote?: any;
}

const FooterAddNote = ({loading, submitNote}: IPropsFooterAddNote) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      <ButtonAtom
        title={loading ? 'Menyimpan Data' : 'Simpan'}
        uppercase={true}
        color={COLOR_ACTIVE}
        mode="contained"
        action={submitNote}
        disabled={loading}
        theme={{ colors: { disabled: COLOR_ACTIVE_SOFT } }}
        marginX={0}
      />
    </View>
  );
};

export default FooterAddNote;
