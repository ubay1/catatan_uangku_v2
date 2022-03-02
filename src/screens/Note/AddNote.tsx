import React from 'react';
import 'moment/locale/id';
import { StackAddNote } from '../../../interfaceRoutes';
import AddNote from '../../components/organisms/AddNote';


// const AddCatatan = (props: {data: any}) => {
const AddCatatan = ({route, navigation}: StackAddNote) => {
  return (
    <AddNote navigation={navigation} route={route}/>
  );
};

export default AddCatatan;
