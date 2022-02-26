import React from 'react';
import { View } from 'react-native';
import Greeting from '../molecules/home/Greeting';
import ListSaldo from '../molecules/home/ListSaldo';
import { IPropsHomeScreen } from '../molecules/home/types';

const HomeOrganims = ({name}: IPropsHomeScreen) => {
  return (
    <View>
      <Greeting name={name}/>
      <ListSaldo />
    </View>
  );
};

export default HomeOrganims;
