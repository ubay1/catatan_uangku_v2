import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppIntroScreen from './src/screens/Intro';
import HomeScreen from './src/screens/Home';
import InfoScreen from './src/screens/Info';
import LaporanScreen from './src/screens/Laporan';
import ListLaporanScreen from './src/screens/ListLaporan';
import { RootState } from './src/store/rootReducer';
import { AppDispatch } from './src/store';
import { setUserName } from './src/store/user';
import { setIntroFinish } from './src/store/appIntro';
import { AuthContext } from './context/AuthContext';
import SplashScreenss from './src/screens/Splash';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';
import { setPage } from './src/store/whatsPage';
import DetailScreen from './src/screens/DetailCatatan';
import InputPemasukanScreen from './src/screens/Input/pemasukan';
import InputPengeluaranScreen from './src/screens/Input/pengeluaran';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SetelanScreen from './src/screens/Setelan';
import { Colors } from 'react-native-paper';

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const verticalAnimation = {
  // gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const MyTransition = {
  // gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}


// ini jika ingin pake top tabs navigator
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


const HomeNavigator = () => {
  const navigationredux = useSelector((state: RootState) => state.navigationredux)
  return (
    <Stack.Navigator
      initialRouteName={"Beranda"}
      mode={"modal"}
      screenOptions={{
        headerShown: false,
        ...horizontalAnimation
      }}
    >
      <Stack.Screen name="Beranda" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="InputPemasukan" component={InputPemasukanScreen} />
      <Stack.Screen name="InputPengeluaran" component={InputPengeluaranScreen} />
    </Stack.Navigator>
  )
}

const LaporanNavigator = () => {
  const navigationredux = useSelector((state: RootState) => state.navigationredux)
  return (
    <Stack.Navigator
      initialRouteName={"Laporan"}
      mode={"modal"}
      screenOptions={{
        headerShown: !navigationredux.showTab
      }}
    >
      <Stack.Screen name="Laporan" component={LaporanScreen}/>
      <Stack.Screen name="ListLaporan" component={ListLaporanScreen} />
    </Stack.Navigator>
  )
}

const SetelanNavigator = () => {
  const navigationredux = useSelector((state: RootState) => state.navigationredux)
  return (
    <Stack.Navigator
      initialRouteName={"Setelan"}
      mode={"modal"}
      screenOptions={{
        headerShown: !navigationredux.showTab
      }}
    >
      <Stack.Screen name="Setelan" component={SetelanScreen} />
    </Stack.Navigator>
  )
}

// custom bottom navigation
function MyTabBar({ state, descriptors, navigation }: any) {
  const dispatch: AppDispatch = useDispatch()
  const navigationredux = useSelector((state: RootState) => state.navigationredux)
  
  
  return (
    <View style={{ 
      flexDirection: 'row',
      justifyContent:"center",
      alignItems:"center", 
      backgroundColor:  '#fff',
      height:70,
      elevation: 10,
      display: navigationredux.showTab === true ? "flex" : "none",
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        // state
        // {"history": [{"key": "Laporan-B9U2FwL7XKOiovPZfSwiB", "type": "route"}, {"key": "Input-IT2dVpWWDEepUKYs0klvr", "type": "route"}, {"key": "Beranda-iMRyvBKhp0oDJplai4eVv", "type": "route"}], "index": 0, "key": "tab-bCK3gqLY6JiGa964lx7IX", "routeNames": ["Beranda", "Input", "Laporan"], "routes": [{"key": "Beranda-iMRyvBKhp0oDJplai4eVv", "name": "Beranda", "params": undefined}, {"key": "Input-IT2dVpWWDEepUKYs0klvr", "name": "Input", "params": undefined}, {"key": "Laporan-B9U2FwL7XKOiovPZfSwiB", "name": "Laporan", "params": undefined}], "stale": false, "type": "tab"}
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
            let iconName: any;

            if (route.name === 'Beranda') {
              iconName = 'home';
            } else if (route.name === 'Laporan') {
              iconName = 'history';
            } else {
              iconName = 'plus'
            }

        const isFocused = state.index === index;

        const onPress = () => {
          // console.log('test',navigation)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          // console.log(route)

          if (!isFocused && !event.defaultPrevented) {
            dispatch(setPage({
              page: route.name
            }))
            navigation.navigate(route.name)
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            // accessibilityLabel={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:"center" }}
          >
            <View style={{ 
              position: 'relative',
              bottom: iconName === 'plus' ? 20 : 0,
              backgroundColor: iconName === 'plus' ? '#D0D9F9' : 'transaprent',
              borderRadius: iconName === 'plus' ? 100 : 0,
              elevation: iconName === 'plus' ? 2 : 0,
              alignItems: 'center'
            }}>
              {
                iconName === 'plus' ?
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#4E54C8', '#8F94FB']}
                  style={{ borderRadius: 100, padding: 10, elevation: 5 }}
                >
                  <IconMCI 
                    name={iconName} 
                    size={iconName === 'plus' ? 40 : 30} 
                    color='#fff'
                  />
                </LinearGradient>
                :
                <>
                <IconMCI 
                  name={iconName} 
                  size={iconName === 'plus' ? 40 : 30} 
                  color={isFocused ? '#4E54C8' : iconName === 'plus' ? '#859CF1' : '#C4C4C4'} 
                />
                <Text style={{color: isFocused ? '#4E54C8': '#c4c4c4', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold'}}>{label}</Text> 
                </>
              }
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Routes = () => {
  
  const dispatches: AppDispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loading)
  const appIntro = useSelector((state: RootState) => state.appIntro)
  const navigationredux = useSelector((state: RootState) => state.navigationredux)
  const user = useSelector((state: RootState) => state.user)
  const auth = useSelector((state: RootState) => state.auth)

  const [stateAppIntro, setstateAppIntro] = useState(false)

  const emptyRedux = () => {
    dispatches(setUserName({name: ''}))
    dispatches(setIntroFinish({
      introFinish: false
    }))
  }

  const storeToRedux = (profile: any, introFinish: any) => {
    // console.log(profile, userAuth,auth)
    dispatches(setUserName(profile))
    dispatches(setIntroFinish({
      introFinish: introFinish
    }))
  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      dispatches(setPage({page: 'Beranda'}))
      let username
      try {
        const valueStorage = await AsyncStorage.getItem('auth');

        const parseValueStorage = JSON.parse(valueStorage as any)
        
        console.log(parseValueStorage.isIntroFinish, parseValueStorage.name)

        /**
         * jika app intro = true, maka akan lanjut ke global screen
         * jika tidak maka akan menampilkan screen App intro
         */
        if (parseValueStorage.isIntroFinish === true || parseValueStorage.isIntroFinish !== null) {
          console.log('app intro = ',parseValueStorage.isIntroFinish)
          dispatches(setIntroFinish({
            introFinish: true
          }))
          setstateAppIntro(true)
        } else {
          setstateAppIntro(false)
          dispatches(setIntroFinish({
            introFinish: false
          }))
        }
        
        if (parseValueStorage.name === null) {
          emptyRedux()
        } else {
          const dataProfil = {
            name: parseValueStorage.name,
          }

          username = parseValueStorage.name;
          storeToRedux(dataProfil, true)
        }
      } catch (e) {
        console.log('error - '+ e)
        // Restoring token failed
      }

      dispatches(setUserName({name: `${username}`}))
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (name: any, isIntroFinish: any) => {
      const dataProfil = {
        name: name,
      }

      storeToRedux(dataProfil, isIntroFinish)
      // AsyncStorage.setItem('name', dataProfil.name)
      AsyncStorage.setItem('auth', JSON.stringify({
        name: name,
        isIntroFinish: true
      }))
    },
    signOut: () => {
      AsyncStorage.removeItem('name')
      emptyRedux()
    }
  }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          user.isLoading ? 
            <Stack.Navigator
              initialRouteName={"Splash"}
              mode="card"
              screenOptions={{
                headerShown: !navigationredux.showTab
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreenss} />
            </Stack.Navigator>
          : appIntro.introFinish === false ?
            <Stack.Navigator
              initialRouteName={"AppIntro"}
              mode="card"
              screenOptions={{
                headerShown: !navigationredux.showTab
              }}
            >
              {/* <Stack.Screen name="AppIntro">
                {(props) => <AppIntroScreen /> }
              </Stack.Screen> */}
              <Stack.Screen name="AppIntro" component={AppIntroScreen} />
            </Stack.Navigator>
              : 
                <Tab.Navigator
                  // tabBar={props => <MyTabBar {...props} />}
                  // tabBarPosition={'bottom'}
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }: any) => {
                      let iconName: any;

                      if (route.name === 'Beranda') {
                        iconName = focused ? 'home' : 'home';
                      } else if (route.name === 'Laporan') {
                        iconName = focused ? 'history' : 'history';
                      }

                      // if (route.name === 'Input') {
                      //   return (
                      //     <TouchableOpacity style={{}}>
                      //       <IconMCI name="plus" size={30} color={color} />
                      //     </TouchableOpacity>
                      //   )
                      // } else {
                        return <IconMCI name={iconName} size={30} color={color} />
                      // }
                      
                    },
                  })}
                  swipeEnabled={true}
                  tabBarOptions={{
                    tabStyle: {alignItems: 'center', justifyContent: 'center', padding: 10},
                    showLabel: true,
                    // showIcon: true,
                    indicatorStyle: {
                      // borderRadius: 10,
                      backgroundColor: Colors.blue400,
                      height: 3,
                      // width: '25%',
                      // marginLeft: 11,
                      // marginRight: 10,
                      // marginBottom: 6,
                    },
                    activeTintColor: Colors.blue400,
                    inactiveTintColor: Colors.grey400,
                    labelStyle: { fontWeight: 'bold', textTransform: 'uppercase' },
                    style: {
                      // height: 70,
                      paddingBottom: 0,
                      backgroundColor:  '#fff',
                      borderTopColor: '#f2f2f2',
                      borderTopWidth: 0,
                      borderBottomColor: '#fff',
                      borderBottomWidth: 0,
                      overflow: 'hidden',
                      display: navigationredux.showTab === true ? "flex" : "none",
                    },
                  }}
                >
                  <Tab.Screen name="Beranda" component={HomeNavigator} />
                  <Tab.Screen name="Laporan" component={LaporanNavigator} />
                  <Tab.Screen name="Kategori" component={SetelanNavigator}/>
                </Tab.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

//  <Stack.Navigator
//           mode="card"
//           initialRouteName={"Home"}
//         >
//           {state.isLoading ? (
//             // We haven't finished checking for the token yet
//             <Stack.Screen  name="Splash" component={SplashScreenss} />
//           ) :
//           state.gotek !== null ? (
//             <Stack.Screen
//               name="Home"
//               component={Tabs}
//               options={({ route, navigation }) => ({
//                 headerTitle: getFocusedRouteNameFromRoute(route),
//                 headerRight: () => (
//                   <View style={{ marginRight: 10 }}>
//                     <Button danger 
//                       onPress={handleSignOut}
//                       style={{ padding: 10 }}>
//                       <Text style={{ color: '#fff' }}>Sign Out</Text>
//                     </Button>
//                   </View>
//                 ),
//               })}
//             />
//           ) : 
//           (
//             <>
//               <Stack.Screen name="SignIn">
//                 {(props) => {
//                   return(
//                     // jika {...props} tidak dimasukan, maka tidak dapat navigate
//                     <SignInScreen {...props} onSignIn={handleSignIn} />
//                   )
//                 }}
//               </Stack.Screen>
//               <Stack.Screen name="SignUp">
//                 {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
//               </Stack.Screen>
//               <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//             </>
//           )}
//         </Stack.Navigator> 

export default Routes;