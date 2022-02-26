/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Routes from '../../routes';

const Boot = () => {
  const [isAppReady, setisAppReady] = React.useState(false);

  React.useEffect(() => {
    loadPermission();
    console.log('boot.tsx mounted');
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for Device connections',
          message: 'This app needs location permission as this is required',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera permission is required for Device connections',
          message: 'This app needs camera permission as this is required',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio permission is required for Device connections',
          message: 'This app needs audio permission as this is required',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Microphone');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const loadPermission = async () => {
    try {
      // await requestLocationPermission();
      // await requestCameraPermission();
      // await requestAudioPermission();
      setisAppReady(true);
    } catch (error) {
      setisAppReady(false);
      Alert.alert('error permission');
    }
  };

  return (
    <Routes />
  );
};

export default Boot;
