import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Intro: undefined,
  Beranda: undefined,
  Detail: {
    data: any,
    listKategori?: any,
    saldoAtm?: any,
    saldoDompet?: any
  },
  InputPemasukan: {
    data?: any,
    saldoAtm?: any,
    saldoDompet?: any,
  },
  InputPengeluaran: {
    data?: any,
    saldoAtm?: any,
    saldoDompet?: any,
  },
  Laporan: undefined,
  ListLaporan: {
    tipe: string,
    tipe2: string,
    fromDate?: any,
    toDate?: any,
  },
  Setelan: undefined
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
export type StackInputPemasukan = {
  route: RouteProp<RootStackParamList, 'InputPemasukan'>;
  navigation: StackNavigationProp<RootStackParamList, 'InputPemasukan'>;
}
export type StackInputPengeluaran = {
  route: RouteProp<RootStackParamList, 'InputPengeluaran'>;
  navigation: StackNavigationProp<RootStackParamList, 'InputPengeluaran'>;
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
export type StackSetelan = {
  route: RouteProp<RootStackParamList, 'Setelan'>;
  navigation: StackNavigationProp<RootStackParamList, 'Setelan'>;
}
export type StackInfo = {
  route: RouteProp<RootStackParamList, 'Info'>;
  navigation: StackNavigationProp<RootStackParamList, 'Info'>;
}
