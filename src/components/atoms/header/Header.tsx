/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB, Colors} from 'react-native-paper';
import styles from '../../../assets/styles/global';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import TextAtom from '../text/TextAtom';

interface IPropsHeader {
  navigation?: any;
  title: string;
}

const Header = ({navigation, title}: IPropsHeader) => {
  return (
    <View style={stylesCustom.container}>
      <View style={{position: 'absolute', left: 0, height: '100%', justifyContent: 'center'}}>
        <FAB
          style={{
            ...styles.btnFab,
            backgroundColor: Colors.pink400,
          }}
          icon={() => {
            return <IconMCI name="arrow-left" color={Colors.white} size={23} />;
          }}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
      <View>
        <TextAtom size={20} value={title} />
      </View>
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    height: 60,
  },
});

export default Header;
