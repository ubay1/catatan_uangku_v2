/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TouchableWithoutFeedback, View, Alert, Dimensions } from 'react-native';

import { responsiveHeight } from 'react-native-responsive-dimensions';
import { TextInput, Button, Colors } from 'react-native-paper';
import { AuthContext } from '../../../context/AuthContext';

const AppIntroScreen = () => {

  const [name, setName] = React.useState('');
  const [loading, setloading] = React.useState(false);

  const [orientationScreen, setorientationScreen] = useState('');

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  };

  useEffect(() => {
    getOrientation();
    Dimensions.addEventListener('change', () => {
      getOrientation();
    });
  }, []);

  const { signIn } = React.useContext<any>(AuthContext);

  const backgroundScreen =  '#fff';

  return (
    <ScrollView style={{
      backgroundColor: backgroundScreen,
    }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        <View style={{height: responsiveHeight(100), marginHorizontal: 20, justifyContent: 'center'}}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            // height: orientationScreen === 'portrait' ? responsiveHeight(24) : responsiveHeight(45) ,
            // width: '100%',
            // backgroundColor: 'red'
          }}>
            <Image source={require('../../assets/logo/logo2.png')}
              resizeMode="stretch"
              style={{
                // width: scale(180),
                // height: verticalScale(150)
                width: orientationScreen === 'portrait' ? responsiveHeight(25) : responsiveHeight(50),
                height: orientationScreen === 'portrait' ? responsiveHeight(25) : responsiveHeight(50),
                // height: orientationScreen === 'portrait' ? verticalScale(24) : verticalScale(35)
              }}
            />
          </View>

          {/* <Text style={{fontSize: responsiveFontSize(1.5)}}>{orientationScreen} {width} x {height}</Text> */}

          <TextInput
            style={{
              // borderColor: '#c2c2c2', paddingLeft: 10, borderWidth: 1, borderRadius: 10, color: '#000',
              backgroundColor:'#fff',
              marginBottom: 10,

              /* ---------------------------- // height: '10%' ---------------------------- */
            }}
            mode="outlined"
            label="Masukan nama"
            theme={{ colors: { primary: Colors.blue400}}}
            value={name}
            onChangeText={name => setName(name)}
            // placeholder="Masukan nama"
            keyboardType="default"
            placeholderTextColor={'#000'}
          />

          <Button
            uppercase={false}
            color={Colors.blue400}
            mode="contained"
            onPress={() => {
              if (name === '') {
                Alert.alert('Harap isi form yang disediakan');
              } else {
                setloading(true);
                setTimeout(() => {
                  setloading(false);
                  signIn(name, true);
                }, 2000);
              }
            }}
            contentStyle={{paddingVertical: 5}}
            style={{borderRadius: 10}}
            disabled={loading === true ? true : false}
            theme={{ colors: { disabled: 'grey' } }}
          >
            {
              loading === true ?
              // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
              <Text style={{ color: 'grey'}}>Menyimpan data ..</Text>
              :
              <Text style={{ color: '#fff'}}>
                Simpan
              </Text>
            }
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AppIntroScreen;
