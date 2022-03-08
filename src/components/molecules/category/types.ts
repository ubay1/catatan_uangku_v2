export interface IPropsListCategory {
  fetchListKategori: boolean;
  listKategori: any;
  openModalInputKategori?: any;
  openModalDelete?: any;
  setidListKategori?: number;
}

export interface IPropsBtnAddCategory {
  isPageCategory?: boolean;
  openModalInputKategori?: any;
}

export interface IPropsInputCategory {
  closeModalInputKategori?: any;
  idInputKategori?: number;
  defaultValueTipeCategory?: string;
  defaultValueNameCategory?: string;
}
