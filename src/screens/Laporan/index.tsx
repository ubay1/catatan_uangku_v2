/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import NoteOrganisms from '../../components/organisms/Note';

const Note = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NoteOrganisms />
    </ScrollView>
  );
};

export default Note;
