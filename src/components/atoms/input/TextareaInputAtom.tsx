/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {IPropsTextInput} from './types';
import styles from '../../../assets/styles/global';
import { Colors } from 'react-native-paper';

const TextareaInputAtom = ({
  label,
  theme,
  mode = 'flat',
  onChangeText,
  keyboardType = 'default',
  placeholderTextColor = '#000',
  marginX = 20,
  marginY = 5,
  height = 50,
  numberOfLines = 0,
  multiLine = false,
}: IPropsTextInput) => {
  return (
    <TextInput
      style={{
        ...styles.input,
        borderColor: Colors.grey600,
        borderWidth: 1,
        marginHorizontal: marginX,
        marginVertical: marginY,
        height: height,
        borderRadius: 5,
        fontSize: 15,
        paddingLeft: 13,
      }}
      placeholder={label}
      textAlignVertical="top"
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
      numberOfLines={numberOfLines}
      multiline={multiLine}
    />
  );
};

export default TextareaInputAtom;
