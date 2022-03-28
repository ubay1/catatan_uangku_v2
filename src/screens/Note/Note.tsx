/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import { StackNote } from '../../../interfaceRoutes';
import NoteOrganisms from '../../components/organisms/Note';

const Note = ({route, navigation}: StackNote) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NoteOrganisms route={route} navigation={navigation}/>
    </ScrollView>
  );
};

export default Note;
