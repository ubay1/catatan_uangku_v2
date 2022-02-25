/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { IPropsSnackbar } from './types';

const SnackbarAtom = ({title, isOpen, action, bgColor, color}: IPropsSnackbar) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
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
    <Snackbar
      visible={isOpen}
      onDismiss={action}
      style={{
        backgroundColor: bgColor,
        elevation: 0,
      }}
      action={{
        labelStyle: {
          color: color,
        },
        color: color,
        label: 'Tutup',
        onPress: () => {
          // console.log('close snackbar');
        },
      }}>
      {title}
    </Snackbar>
  );
};

export default SnackbarAtom;
