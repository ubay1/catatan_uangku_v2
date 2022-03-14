/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLOR_WHITE } from '../../../assets/styles/global';
import TextAtom from '../text/TextAtom';

const OverlayWithText = (props: {loadingScreen: boolean}) => {
  return (
    <View style={{
      display: props.loadingScreen ? 'flex' : 'none',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: props.loadingScreen ? 100 : 0,
    }}>
      <View style={{
        display: props.loadingScreen ? 'flex' : 'none',
        position: 'relative',
        zIndex: 101,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,.8)',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
      }}>
        <ActivityIndicator size="large" color={COLOR_WHITE} />
        <TextAtom value="Memuat data .." color="#fff" mTop={5}/>
      </View>
    </View>
  );
};

export default OverlayWithText;
