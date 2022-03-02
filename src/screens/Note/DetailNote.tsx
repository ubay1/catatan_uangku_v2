import React, {  } from 'react';
import { StackDetailNote } from '../../../interfaceRoutes';
import DetailNoteOrganisms from '../../components/organisms/DetailNote';
// const DetailNote = ({ route, navigation }: StackDetail) => {
const DetailNote = ({navigation, route}: StackDetailNote) => {
  return (
    <DetailNoteOrganisms navigation={navigation} route={route}/>
  );
};

export default DetailNote;
