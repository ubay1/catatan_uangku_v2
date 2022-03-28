import React from 'react';
import { StackRincianAtm } from '../../../interfaceRoutes';
import RincianAtmOrganisms from '../../components/organisms/RincianAtm';

const RincianAtm = ({navigation, route}: StackRincianAtm) => {
  return (
    <RincianAtmOrganisms navigation={navigation} route={route}/>
  );
};

export default RincianAtm;
