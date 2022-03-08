/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {FAB} from 'react-native-paper';
import styles, {COLOR_ACTIVE, COLOR_WHITE} from '../../../assets/styles/global';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {IPropsBtnAddCategory} from './types';

const AddCategory = ({isPageCategory, openModalInputKategori}: IPropsBtnAddCategory) => {
  return (
    <View
      style={{
        // backgroundColor: 'red',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      <FAB
        visible={isPageCategory}
        style={{
          ...styles.btnFab,
          marginTop: 20,
          marginRight: 10,
          marginBottom: 20,
          backgroundColor: COLOR_ACTIVE,
        }}
        icon={() => {
          return <IconMCI name="plus" color={COLOR_WHITE} size={23} />;
        }}
        onPress={() => {
          openModalInputKategori(false, null);
        }}
      />
      {/* onPress={() => {
              dispatch(setPage({page: 'Input'}));
            }} */}
    </View>
  );
};

export default AddCategory;
