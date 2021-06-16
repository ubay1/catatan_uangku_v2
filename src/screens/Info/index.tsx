import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useDispatch } from 'react-redux';
import { StackInfo } from '../../../interfaceRoutes'
import { AppDispatch } from '../../store';
import { setHideTab, setShowTab } from '../../store/navigation_redux';
import { setPage } from '../../store/whatsPage';

const InfoScreen = () => {
  const dispatch: AppDispatch = useDispatch()
  
  const OpenURLButton = ({ url, children }: any) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <TouchableOpacity
      // style=
      onPress={handlePress}
    >{children}</TouchableOpacity>;
  };

  const [orientationScreen, setorientationScreen] = useState('');

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }

  useEffect(() => {
    getOrientation()
    Dimensions.addEventListener('change', () => {
      getOrientation()
    })
  }, [])
  
  // useEffect(() => {
  //   dispatch(setHideTab())
  //   navigation.addListener("beforeRemove", (param) => {
  //     console.log('back to home')
  //     dispatch(setPage({ page: 'Beranda' }))
  //     dispatch(setShowTab())
  //   })
  // }, [navigation])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:  '#fff' }}>
      <View style={{
        justifyContent: 'center', alignItems: 'center', flex: 1, 
      }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{
              color: '#000'
            }}
          >
            * icon oleh vectorjuice cek
          </Text>
          <OpenURLButton url={'https://www.freepik.com/vectorjuice'}>
            <Text
              style={{
                color: '#4f9a6b',
                fontWeight: 'bold',
              }}
            > disini </Text>
          </OpenURLButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default InfoScreen
