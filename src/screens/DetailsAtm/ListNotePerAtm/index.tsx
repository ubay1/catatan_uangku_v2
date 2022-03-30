/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import {StackListNotePerAtm} from '../../../../interfaceRoutes';
import ListNotePerAtmOrganisms from '../../../components/organisms/ListNotePerAtm';

const ListNotePerAtm = ({route, navigation}: StackListNotePerAtm) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <ListNotePerAtmOrganisms route={route} navigation={navigation} />
    </ScrollView>
  );
};

export default ListNotePerAtm;
