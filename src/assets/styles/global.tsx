import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
import { responsiveHeight } from 'react-native-responsive-dimensions';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export const COLOR_ACTIVE =  Colors.blue400;
export const COLOR_ACTIVE_SOFT =  Colors.blue50;
export const COLOR_ERROR_SOFT =  Colors.red50;
export const COLOR_ERROR =  Colors.red400;
export const COLOR_DISABLED = '#f6f6f6';
export const COLOR_DISABLED_TEXT = '#ccc';
export const COLOR_INPUT_PLACEHOLDER = Colors.grey600;
export const COLOR_WHITE = '#fff';
export const COLOR_BLACK = '#000';

export default StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: COLOR_DISABLED,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  logo: {
    height: IMAGE_HEIGHT,
    width: window.width,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 0,
  },
  btnFab: {
    backgroundColor: COLOR_ACTIVE_SOFT,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    height: responsiveHeight(7),
    width: responsiveHeight(7),
    elevation: 0,
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 5,
  },
  inputDate: {
    backgroundColor: COLOR_DISABLED,
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: COLOR_INPUT_PLACEHOLDER,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  btnShowDatepicker: {
    backgroundColor: COLOR_DISABLED,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderColor: COLOR_INPUT_PLACEHOLDER,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
