/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AppIntroScreen from './src/screens/Intro';
import HomeScreen from './src/screens/Home';
import InfoScreen from './src/screens/Info';
import NoteScreen from './src/screens/Note/Note';
import SplashScreenss from './src/screens/Splash';
import CategoryScreen from './src/screens/Category';
import AddNote from './src/screens/Note/AddNote';
import DetailNote from './src/screens/Note/DetailNote';
import AddAtm from './src/screens/DetailsAtm/AddAtm';
import RincianAtm from './src/screens/DetailsAtm/RincianAtm';
import AddEmoney from './src/screens/DetailsEmoney/AddEmoney';
import FilterCustomTanggalNote from './src/screens/Note/FilterCustomTanggalNote';

import {RootState} from './src/store/rootReducer';
import {AppDispatch} from './src/store';
import {setUserName} from './src/store/user';
import {setIntroFinish} from './src/store/appIntro';
import {AuthContext} from './context/AuthContext';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {setPage} from './src/store/whatsPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLOR_ACTIVE} from './src/assets/styles/global';
import TextAtom from './src/components/atoms/text/TextAtom';

const horizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}: any) => {
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
  cardStyleInterpolator: ({current, layouts}: any) => {
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
  cardStyleInterpolator: ({current, next, layouts}: any) => {
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
};

// ini jika ingin pake top tabs navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {
  const navigationredux = useSelector(
    (state: RootState) => state.navigationredux,
  );
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      mode={'modal'}
      screenOptions={{
        headerShown: false,
        ...horizontalAnimation,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="DetailNote" component={DetailNote} />
      <Stack.Screen name="AddNote" component={AddNote} />
      <Stack.Screen name="AddAtm" component={AddAtm} />
      <Stack.Screen name="RincianAtm" component={RincianAtm} />
      <Stack.Screen name="AddEmoney" component={AddEmoney} />
    </Stack.Navigator>
  );
};

const NoteNavigator = () => {
  const navigationredux = useSelector(
    (state: RootState) => state.navigationredux,
  );
  return (
    <Stack.Navigator
      initialRouteName={'Note'}
      mode={'modal'}
      screenOptions={{
        headerShown: !navigationredux.showTab,
      }}>
      <Stack.Screen name="Note" component={NoteScreen} />
      <Stack.Screen
        name="FilterCustomTanggalNote"
        component={FilterCustomTanggalNote}
      />
    </Stack.Navigator>
  );
};

const CategoryNavigator = () => {
  const navigationredux = useSelector(
    (state: RootState) => state.navigationredux,
  );
  return (
    <Stack.Navigator
      initialRouteName={'Category'}
      mode={'modal'}
      screenOptions={{
        headerShown: !navigationredux.showTab,
      }}>
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

// custom bottom navigation
function MyTabBar({state, descriptors, navigation}: any) {
  const dispatch: AppDispatch = useDispatch();
  const navigationredux = useSelector(
    (state: RootState) => state.navigationredux,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        // elevation: 10,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        display: navigationredux.showTab === true ? 'flex' : 'none',
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name === 'Home'
            ? 'Beranda'
            : route.name === 'Note'
            ? 'Catatan'
            : 'Kategori';

        let iconName: any;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Note') {
          iconName = 'notebook';
        } else if (route.name === 'Category') {
          iconName = 'plus-box-multiple';
        } else {
          iconName = 'plus';
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
            dispatch(
              setPage({
                page: route.name,
              }),
            );
            navigation.navigate(route.name);
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
            style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                position: 'relative',
                bottom: 0,
                backgroundColor: 'transaprent',
                borderRadius: 0,
                elevation: 0,
                alignItems: 'center',
              }}>
              {
                <>
                  <IconMCI
                    name={iconName}
                    size={25}
                    color={isFocused ? COLOR_ACTIVE : '#ddd'}
                  />
                  <TextAtom
                    color={isFocused ? COLOR_ACTIVE : '#ddd'}
                    value={label}
                    textTransform={'uppercase'}
                    size={12}
                    fontWeight="bold"
                  />
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
  const dispatches: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);
  const appIntro = useSelector((state: RootState) => state.appIntro);
  const navigationredux = useSelector(
    (state: RootState) => state.navigationredux,
  );
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);

  const [stateAppIntro, setstateAppIntro] = useState(false);

  const emptyRedux = () => {
    dispatches(setUserName({name: ''}));
    dispatches(
      setIntroFinish({
        introFinish: false,
      }),
    );
  };

  const storeToRedux = (name: string, introFinish: boolean) => {
    dispatches(setUserName({name: name}));
    dispatches(
      setIntroFinish({
        introFinish: introFinish,
      }),
    );
  };

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      dispatches(setPage({page: 'Home'}));
      // let username;

      try {
        const valueStorage = await AsyncStorage.getItem('auth');

        const parseValueStorage = JSON.parse(valueStorage as any);

        /**
         * jika app intro = true, maka akan lanjut ke global screen
         * jika tidak maka akan menampilkan screen App intro
         */
        if (![null, undefined, ''].includes(parseValueStorage.isIntroFinish)) {
          // console.log('app intro = ',parseValueStorage.isIntroFinish);
          dispatches(
            setIntroFinish({
              introFinish: true,
            }),
          );
          setstateAppIntro(true);
        } else {
          setstateAppIntro(false);
          dispatches(
            setIntroFinish({
              introFinish: false,
            }),
          );
        }

        if ([null, undefined, ''].includes(parseValueStorage.name)) {
          emptyRedux();
        } else {
          storeToRedux(parseValueStorage.name, true);
        }
      } catch (e) {
        emptyRedux();
        console.log('error - ' + e);
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (name: string, isIntroFinish: boolean) => {
        storeToRedux(name, isIntroFinish);
        // AsyncStorage.setItem('name', dataProfil.name)
        AsyncStorage.setItem(
          'auth',
          JSON.stringify({
            name: name,
            isIntroFinish: true,
          }),
        );
      },
      signOut: () => {
        AsyncStorage.removeItem('name');
        emptyRedux();
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {user.isLoading ? (
          <Stack.Navigator
            initialRouteName={'Splash'}
            mode="card"
            screenOptions={{
              headerShown: !navigationredux.showTab,
            }}>
            <Stack.Screen name="Splash" component={SplashScreenss} />
          </Stack.Navigator>
        ) : appIntro.introFinish === false ? (
          <Stack.Navigator
            initialRouteName={'AppIntro'}
            mode="card"
            screenOptions={{
              headerShown: !navigationredux.showTab,
            }}>
            <Stack.Screen name="AppIntro" component={AppIntroScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
            /* ------------------------- material top navigator ------------------------- */
            // tabBarPosition={'bottom'}
            // swipeEnabled={false}
            // tabBarOptions={{
            //   tabStyle: {alignItems: 'center', justifyContent: 'center', padding: 10},
            //   showLabel: true,
            //   indicatorStyle: {
            //     backgroundColor: Colors.blue400,
            //     height: 3,
            //   },
            //   activeTintColor: Colors.blue400,
            //   inactiveTintColor: Colors.grey400,
            //   labelStyle: { fontWeight: 'bold', textTransform: 'uppercase' },
            //   style: {
            //     paddingBottom: 0,
            //     backgroundColor:  '#fff',
            //     borderTopColor: '#f2f2f2',
            //     borderTopWidth: 0,
            //     borderBottomColor: '#fff',
            //     borderBottomWidth: 0,
            //     overflow: 'hidden',
            //     display: navigationredux.showTab === true ? 'flex' : 'none',
            //   },
            // }}
            // screenOptions={({ route }) => ({
            //   tabBarIcon: ({ focused, color, size }: any) => {
            //     let iconName: any;

            //     if (route.name === 'Home') {
            //       iconName = 'home';
            //     } else if (route.name === 'Catatan') {
            //       iconName = 'history';
            //     } else {
            //       iconName = 'history';
            //     }
            //       return <IconMCI name={iconName} size={30} color={color} />;

            //   },
            // })}
          >
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Note" component={NoteNavigator} />
            <Tab.Screen name="Category" component={CategoryNavigator} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Routes;
