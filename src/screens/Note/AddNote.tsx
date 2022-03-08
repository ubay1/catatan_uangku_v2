import React from 'react';
import 'moment/locale/id';
import { StackAddNote } from '../../../interfaceRoutes';
import AddNoteOrganisms from '../../components/organisms/AddNote';


// const AddCatatan = (props: {data: any}) => {
const AddCatatan = ({route, navigation}: StackAddNote) => {
  return (
    <AddNoteOrganisms navigation={navigation} route={route}/>
  );
};

export default AddCatatan;
