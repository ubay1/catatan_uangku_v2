/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import { StatusBar } from 'react-native';
 import {DefaultTheme, Provider as PaperProvider, Colors } from 'react-native-paper';
 import SplashScreen from 'react-native-splash-screen';
 import { Provider } from 'react-redux';
 import { store } from './src/store';
import Boot from './src/boot/boot';
import { COLOR_ACTIVE } from './src/assets/styles/global';

export const adUnitId = 'ca-app-pub-6232514642053563/5051942477';

 const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    // admobStart();
  }, []);


  const theme = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
      ...DefaultTheme.colors,
      primary: '#91B3FA',
      text: Colors.black,
      disabled: Colors.grey400,
      // accent: '#f1c40f',
    },
  };

   return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={'light-content'}
          backgroundColor={COLOR_ACTIVE}
        />
        <Boot />
      </PaperProvider>
    </Provider>
   );
 };
 export default App;
