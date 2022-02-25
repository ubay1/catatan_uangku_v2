import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export const COLOR_ACTIVE =  Colors.blue400;
export const COLOR_ERROR =  Colors.red400;
export const COLOR_DISABLED = '#f6f6f6';
export const COLOR_WHITE = '#fff';
export const COLOR_BLACK = '#000';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // flex: 1,
    // height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
