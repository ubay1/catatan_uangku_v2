import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Intro: undefined;
  Home: undefined;
  Note: undefined;
  FilterCustomTanggalNote: undefined;
  AddNote: {
    title: string;
    type: string;
    saldoAtm?: number,
    saldoDompet?: number,
  },
  DetailNote: {
    title?: string;
    type?: string;
    data?: any;
    listKategori?: any;
    saldoAtm?: number,
    saldoDompet?: number,
  },
  Category: undefined
  Info: undefined
};


export type StackIntro = {
  route: RouteProp<RootStackParamList, 'Intro'>;
  navigation: StackNavigationProp<RootStackParamList, 'Intro'>;
}
export type StackHome = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}
export type StackNote = {
  route: RouteProp<RootStackParamList, 'Note'>;
  navigation: StackNavigationProp<RootStackParamList, 'Note'>;
}
export type StackFilterCustomTanggalNote = {
  route: RouteProp<RootStackParamList, 'FilterCustomTanggalNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'FilterCustomTanggalNote'>;
}
export type StackAddNote = {
  route: RouteProp<RootStackParamList, 'AddNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddNote'>;
}
export type StackDetailNote = {
  route: RouteProp<RootStackParamList, 'DetailNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailNote'>;
}
export type StackCategory = {
  route: RouteProp<RootStackParamList, 'Category'>;
  navigation: StackNavigationProp<RootStackParamList, 'Category'>;
}
export type StackInfo = {
  route: RouteProp<RootStackParamList, 'Info'>;
  navigation: StackNavigationProp<RootStackParamList, 'Info'>;
}
