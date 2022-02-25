/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { IPropsTextInput } from './types';
import styles from '../../../assets/styles/global';

const TextInputAtom = ({label, theme, mode = 'flat', onChangeText, keyboardType = 'default', placeholderTextColor = '#000'}: IPropsTextInput) => {
  return (
    <TextInput
      style={styles.input}
      mode={mode}
      label={label}
      theme={theme}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default TextInputAtom;
