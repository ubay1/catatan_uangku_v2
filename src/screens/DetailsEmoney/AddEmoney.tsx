import React from 'react';
import { StackAddEmoney } from '../../../interfaceRoutes';
import AddEmoneyOrganisms from '../../components/organisms/AddEmoney';

const AddEmoney = ({navigation, route}: StackAddEmoney) => {
  return (
    <AddEmoneyOrganisms navigation={navigation} route={route}/>
  );
};

export default AddEmoney;
