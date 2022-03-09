/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Modal, View} from 'react-native';
import {FAB, Colors} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import { useDispatch } from 'react-redux';
import InfoScreen from '../../../screens/Info';
import { AppDispatch } from '../../../store';
import {setPage} from '../../../store/whatsPage';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { IPropsModal } from './types';
import styles from '../../../assets/styles/global';


const ModalAtom = ({closeModal, visible, setPageActive = 'Home', children}: IPropsModal) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();

  // const [data, setData] = React.useState(null);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  return (
    <Modal animationType="slide" visible={visible} transparent={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <FAB
          style={{ ...styles.btnFab, marginTop: 20, marginLeft: 10, marginBottom:0, backgroundColor: Colors.pink400,
          }}
          icon={() => {
            return <IconMCI name="close" color={Colors.white} size={23} />;
          }}
          onPress={() => {
            closeModal();
            dispatch(setPage({page: setPageActive}));
          }}
        />

        {children}
      </View>
    </Modal>
  );
};

export default React.memo(ModalAtom);
