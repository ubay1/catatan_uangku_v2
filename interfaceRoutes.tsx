import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Intro: any;
  Home: any;
  Note: any;
  FilterCustomTanggalNote: any;
  AddNote: {
    title: string;
    type: string;
    saldoAtm?: number;
    saldoDompet?: number;
  };
  DetailNote: {
    title?: string;
    type?: string;
    data?: any;
    listKategori?: any;
    listAtm?: any;
    listEmoney?: any;
    saldoAtm?: number;
    saldoDompet?: number;
    saldoEmoney?: number;
  };
  Category: any;
  Info: any;
  AddAtm: any;
  RincianAtm: {
    saldoAtm?: number;
  };
  ListNotePerAtm: any;
  AddEmoney: any;
  RincianEmoney: {
    saldoEmoney?: number;
  };
  ListNotePerEmoney: any;
};

export type StackIntro = {
  route: RouteProp<RootStackParamList, 'Intro'>;
  navigation: StackNavigationProp<RootStackParamList, 'Intro'>;
};
export type StackHome = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
export type StackNote = {
  route: RouteProp<RootStackParamList, 'Note'>;
  navigation: StackNavigationProp<RootStackParamList, 'Note'>;
};
export type StackFilterCustomTanggalNote = {
  route: RouteProp<RootStackParamList, 'FilterCustomTanggalNote'>;
  navigation: StackNavigationProp<
    RootStackParamList,
    'FilterCustomTanggalNote'
  >;
};
export type StackAddNote = {
  route: RouteProp<RootStackParamList, 'AddNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddNote'>;
};
export type StackDetailNote = {
  route: RouteProp<RootStackParamList, 'DetailNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailNote'>;
};
export type StackCategory = {
  route: RouteProp<RootStackParamList, 'Category'>;
  navigation: StackNavigationProp<RootStackParamList, 'Category'>;
};
export type StackInfo = {
  route: RouteProp<RootStackParamList, 'Info'>;
  navigation: StackNavigationProp<RootStackParamList, 'Info'>;
};
export type StackAddAtm = {
  route: RouteProp<RootStackParamList, 'AddAtm'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddAtm'>;
};
export type StackRincianAtm = {
  route: RouteProp<RootStackParamList, 'RincianAtm'>;
  navigation: StackNavigationProp<RootStackParamList, 'RincianAtm'>;
};
export type StackListNotePerAtm = {
  route: RouteProp<RootStackParamList, 'ListNotePerAtm'>;
  navigation: StackNavigationProp<RootStackParamList, 'ListNotePerAtm'>;
};
export type StackAddEmoney = {
  route: RouteProp<RootStackParamList, 'AddEmoney'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddEmoney'>;
};
export type StackRincianEmoney = {
  route: RouteProp<RootStackParamList, 'RincianEmoney'>;
  navigation: StackNavigationProp<RootStackParamList, 'RincianEmoney'>;
};
export type StackListNotePerEmoney = {
  route: RouteProp<RootStackParamList, 'ListNotePerEmoney'>;
  navigation: StackNavigationProp<RootStackParamList, 'ListNotePerEmoney'>;
};
