export interface IPropsHomeScreen {
  name: string;
  pageActive?: string;
  navigation?: any;
  route?: any;
}

export interface IPropsListSaldo {
  loading: boolean;
  allBalanceData: any;
}

export interface IPropsListCatatan {
  loading: boolean;
  allCatatan: any;
  allKategori: any;
  allAtm: any;
  allEmoney: any;
  saldoAtm: number;
  saldoDompet: number;
  saldoEmoney: number;
  navigation?: any;
  route?: any;
  openModalDelete?: any;
}
