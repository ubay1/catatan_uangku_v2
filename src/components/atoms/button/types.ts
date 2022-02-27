export interface IPropsButton {
  title: string;
  mode: any;
  uppercase?: boolean;
  color?: any;
  disabled?: boolean;
  theme?: object,
  action?: any;
  textColor?: string;
  marginX?: number;
  marginY?: number;
}
export interface IPropsButtonWithIcon {
  title: string;
  mode: any;
  icon: string;
  uppercase?: boolean;
  color?: any;
  disabled?: boolean;
  theme?: object,
  action?: any;
  textColor?: string;
}

export interface IPropsButtonText {
  title: string;
  bgColor?: string;
  paddingX?: number;
  paddingY?: number;
  textColor?: string;
  uppercase?: boolean;
  rounded?: number;
  action?: any;
}
