/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native-paper';
import {
  COLOR_ACTIVE,
  COLOR_DISABLED,
  COLOR_DISABLED_TEXT,
  COLOR_ERROR,
  COLOR_WHITE,
} from '../../assets/styles/global';
import ButtonAtom from './button/ButtonAtom';
import TextAtom from './text/TextAtom';

const DeleteContent = (props: {
  loading?: boolean;
  cancelDelete: any;
  submitDelete: any;
}) => {
  return (
    <View style={{marginHorizontal: 10, marginTop: 20}}>
      <TextAtom fontWeight={'bold'} value="Yakin mau hapus ?" size={25} />
      <TextAtom
        fontWeight={'bold'}
        color={Colors.grey500}
        value="data yang telah dihapus"
        size={25}
      />
      <TextAtom
        fontWeight={'bold'}
        color={Colors.grey500}
        value="tidak dapat dikembalikan"
        size={25}
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View style={{marginTop: 10}}>
          <ButtonAtom
            title="Tidak"
            fontWeight="bold"
            bgColor={COLOR_ACTIVE}
            uppercase={true}
            marginX={0}
            action={() => {
              props.cancelDelete();
            }}
          />
        </View>

        <View style={{marginTop: 10}}>
          <ButtonAtom
            title="Ya"
            fontWeight="bold"
            bgColor={props.loading ? COLOR_DISABLED : COLOR_ERROR}
            textColor={props.loading ? COLOR_DISABLED_TEXT : COLOR_WHITE}
            uppercase={true}
            marginX={0}
            disabled={props.loading}
            action={() => {
              props.submitDelete();
              // setvisibleModalDelete(false);
              // setloadingDelete(true);
              // delKategori(idListKategori);
              // getListKategori();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteContent;
