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
  saldoAtm: number;
  saldoDompet: number;
  navigation?: any;
  route?: any;
  openModalDelete?: any;
}
