/* eslint-disable react-native/no-inline-styles */
import React, {} from 'react';
import {
  SafeAreaView,
} from 'react-native';

import {StackCategory} from '../../../interfaceRoutes';
import CategoryOrganisms from '../../components/organisms/Category';

const CategoryScreen = ({route, navigation}: StackCategory) => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <CategoryOrganisms route={route} navigation={navigation} />
    </SafeAreaView>
  );
};

export default CategoryScreen;
