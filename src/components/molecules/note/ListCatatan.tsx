/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {View} from 'react-native';
import {COLOR_BLACK} from '../../../assets/styles/global';
import TextAtom from '../../atoms/text/TextAtom';

const ListCatatan = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  // const [data, setData] = React.useState(null);
  const [allCatatan, setallCatatan] = useState([]);
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
      <TextAtom
        color={COLOR_BLACK}
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase"
        value="List Catatan"
      />
    </View>
  );
};

export default ListCatatan;
