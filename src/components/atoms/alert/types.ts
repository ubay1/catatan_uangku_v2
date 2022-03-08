export interface IPropsSnackbar {
  title: string;
  isOpen?: any;
  action?: any;
  bgColor?: string;
  color?: string;
}

export interface IPropsModal {
  closeModal: any;
  visible: boolean;
  children: any;
  setPageActive?: string;
}
