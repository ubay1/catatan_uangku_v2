/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB, Colors} from 'react-native-paper';
import styles from '../../../assets/styles/global';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { IPropsHeaderAddNote } from './types';
import TextAtom from '../../atoms/text/TextAtom';

const Header = ({navigation, title}: IPropsHeaderAddNote) => {
  return (
    <View style={stylesCustom.container}>
      <FAB
        style={{
          ...styles.btnFab,
          position: 'absolute',
          top: -12,
          left: 0,
          backgroundColor: Colors.pink400,
        }}
        icon={() => {
          return <IconMCI name="arrow-left" color={Colors.white} size={23} />;
        }}
        onPress={() => {
          navigation.pop();
        }}
      />
      <View>
        <TextAtom size={20} value={title} />
      </View>
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Header;
