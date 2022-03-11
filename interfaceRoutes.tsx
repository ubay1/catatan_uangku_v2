/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IPropsListCatatan } from './src/components/molecules/home/types';

export type RootStackParamList = {
  Intro: undefined;
  Beranda: undefined;
  Catatan: undefined;
  FilterNote: undefined;
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
  Detail: {
    data: any;
    listKategori?: any;
    saldoAtm?: any;
    saldoDompet?: any
  },
  Laporan: undefined;
  ListLaporan: {
    tipe: string,
    tipe2: string,
    fromDate?: any;
    toDate?: any;
  },
  Category: undefined
  Info: undefined
};


type BerandaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Beranda'>;
/* -------------------------------------------------------------------------- */
/*                             screen Beranda                                    */
/* -------------------------------------------------------------------------- */
export type StackIntro = {
  route: RouteProp<RootStackParamList, 'Intro'>;
  navigation: StackNavigationProp<RootStackParamList, 'Intro'>;
}
export type StackBeranda = {
  route: RouteProp<RootStackParamList, 'Beranda'>;
  navigation: BerandaScreenNavigationProp;
}
export type StackCatatan = {
  route: RouteProp<RootStackParamList, 'Catatan'>;
  navigation: StackNavigationProp<RootStackParamList, 'Catatan'>;
}
export type StackFilterNote = {
  route: RouteProp<RootStackParamList, 'FilterNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'FilterNote'>;
}
export type StackAddNote = {
  route: RouteProp<RootStackParamList, 'AddNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddNote'>;
}
export type StackDetailNote = {
  route: RouteProp<RootStackParamList, 'DetailNote'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailNote'>;
}
export type StackDetail = {
  route: RouteProp<RootStackParamList, 'Detail'>;
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
}
export type StackLaporan = {
  route: RouteProp<RootStackParamList, 'Laporan'>;
  navigation: StackNavigationProp<RootStackParamList, 'Laporan'>;
}
export type StackListLaporan = {
  route: RouteProp<RootStackParamList, 'ListLaporan'>;
  navigation: StackNavigationProp<RootStackParamList, 'ListLaporan'>;
}
export type StackCategory = {
  route: RouteProp<RootStackParamList, 'Category'>;
  navigation: StackNavigationProp<RootStackParamList, 'Category'>;
}
export type StackInfo = {
  route: RouteProp<RootStackParamList, 'Info'>;
  navigation: StackNavigationProp<RootStackParamList, 'Info'>;
}
