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
  icon: string;
  color?: any;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  disabled?: boolean;
  action?: any;
  bgColor?: string;
  rounded?: number;
}
export interface IPropsButtonWithIconText {
  title?: string;
  icon: string;
  uppercase?: boolean;
  color?: any;
  disabled?: boolean;
  action?: any;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  rounded?: number;
  size?: number;
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
  fontWeight?: string;
}
