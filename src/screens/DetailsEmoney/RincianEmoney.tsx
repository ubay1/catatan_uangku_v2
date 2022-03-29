import React from 'react';
import {StackRincianEmoney} from '../../../interfaceRoutes';
import RincianEmoneyOrganisms from '../../components/organisms/RincianEmoney';

const RincianEmoney = ({navigation, route}: StackRincianEmoney) => {
  return <RincianEmoneyOrganisms navigation={navigation} route={route} />;
};

export default RincianEmoney;
