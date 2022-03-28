import React from 'react';
import { StackAddAtm } from '../../../interfaceRoutes';
import AddAtmOrganisms from '../../components/organisms/AddAtm';

const AddAtm = ({navigation, route}: StackAddAtm) => {
  return (
    <AddAtmOrganisms navigation={navigation} route={route}/>
  );
};

export default AddAtm;
