export interface IPropsButton {
  title: string;
  size?: number;
  uppercase?: boolean;
  fontWeight?: string;
  bgColor?: any;
  disabled?: boolean;
  action?: any;
  textColor?: string;
  marginX?: number;
  marginY?: number;
}
export interface IPropsButtonWithIcon {
  icon: string;
  color?: any;
  disabled?: boolean;
  action?: any;
  iconColor?: string;
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

export interface IPropsButtonWithIconText {
  title: string;
  bgColor?: string;
  borderColor: string;
  borderWidth: number;
  icon: string;
  iconColor: string;
  textColor?: string;
  uppercase?: boolean;
  rounded?: number;
  size: number;
  textSize?: number;
  action?: any;
  disabled?: boolean;
}
