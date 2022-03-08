/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button, Colors, Divider, FAB} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {StackCategory} from '../../../interfaceRoutes';
import {AppDispatch} from '../../store';
import {setPage} from '../../store/whatsPage';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../store/rootReducer';
import InputKategori from '../Input/kategori/input';
import {deleteKategori, getAllKategori} from '../../../db/database';
import ListCategory from '../../components/molecules/category/ListCategory';
import ModalAtom from '../../components/atoms/alert/ModalAtom';
import LinearGradient from 'react-native-linear-gradient';
import TextAtom from '../../components/atoms/text/TextAtom';
import ButtonAtom from '../../components/atoms/button/ButtonAtom';
import { COLOR_ACTIVE, COLOR_ERROR } from '../../assets/styles/global';
import DeleteContent from '../../components/atoms/DeleteContent';

const CategoryScreen = ({route, navigation}: StackCategory) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  const [fetchListKategori, setfetchListKategori] = useState<any>(false);
  const [listKategori, setlistKategori] = useState<any>([]);

  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [visibleModalDelete, setvisibleModalDelete] = React.useState(false);

  // const [selectTipeKategori, setselectTipeKategori] = useState('');
  const [stateOpenFabGroup, setStateOpenFabGroup] = React.useState({
    open: false,
  });

  const onStateChangeFabGroup = ({open}: any) => {
    setStateOpenFabGroup({open});
  };

  const [isEdit, setisEdit] = useState(false);
  const [idListKategori, setidListKategori] = useState(0);
  const [
    visibleModalInputKategori,
    setvisibleModalInputKategori,
  ] = React.useState(false);

  const openModalInputKategori = React.useCallback(
    (isedit?: any, id?: any) => {
      console.log('teeee ', id);
      setidListKategori(id);
      setisEdit(isedit);
      setvisibleModalInputKategori(true);
    },
    [visibleModalInputKategori],
  );

  const closeModalInputKategori = React.useCallback(() => {
    setvisibleModalInputKategori(false);
  }, [visibleModalInputKategori]);

  const openModalDelete = React.useCallback((id) => {
    setidListKategori(id);
    setvisibleModalDelete(true);
  }, [visibleModalDelete]);

  const closeModalDelete = React.useCallback(() => {
    setvisibleModalDelete(false);
  }, [visibleModalInputKategori]);

  useEffect(() => {
    // getOrientation();
    // Dimensions.addEventListener('change', () => {
    //   getOrientation();
    // });
  }, []);

  useEffect(() => {
    if (whatspage.page === 'Category') {
      getListKategori();
      closeModalInputKategori();
    }
  }, [whatspage]);

  React.useEffect(() => {
    navigation.addListener('focus', e => {
      dispatch(setPage({page: 'Category'}));
    });
  }, [navigation]);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const ModalInputKategori = () => {
    return (
      <Modal
        animationType="slide"
        visible={visibleModalInputKategori}
        transparent={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <FAB
            style={{
              backgroundColor: Colors.pink400,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              top: 10,
              left: 10,
              height: responsiveHeight(6),
              width: responsiveHeight(6),
            }}
            icon={() => {
              return <IconMCI name="close" color={Colors.white} size={23} />;
            }}
            onPress={() => {
              closeModalInputKategori();
              dispatch(setPage({page: 'Category'}));
            }}
          />

          <InputKategori
            edit={isEdit}
            dataProps={listKategori[idListKategori]}
          />
        </View>
      </Modal>
    );
  };

  const ModalOpenDelete = () => {
    return (
      <ModalAtom
        closeModal={closeModalDelete}
        visible={visibleModalDelete}
        setPageActive="Category"
      >
        <DeleteContent
          cancelDelete={() => {
            setvisibleModalDelete(false);
          }}
          submitDelete={()=> {
            setvisibleModalDelete(false);
            setloadingDelete(true);
            delKategori(idListKategori);
            getListKategori();
          }}
        />
      </ModalAtom>
    );
  };

  const getListKategori = () => {
    getAllKategori()
      .then(respListKategori => {
        setlistKategori(respListKategori);
        setfetchListKategori(true);
      })
      .catch(err => {
        console.log('error = ', err);
      });
  };

  const delKategori = (id: any) => {
    deleteKategori(id)
      .then(respListKategori => {
        setloadingDelete(false);
      })
      .catch(err => {
        console.log('error = ', err);
        setloadingDelete(false);
      });

    // try {
    //   const respListKategori: any = deleteKategori(id);
    //   setloadingDelete(false)
    // } catch (error) {
    //   console.log('error kategori = ',error)
    //   setloadingDelete(false)
    // }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ListCategory
          fetchListKategori={fetchListKategori}
          listKategori={listKategori}
          openModalInputKategori={openModalInputKategori}
          openModalDelete={openModalDelete}
        />

        <ModalOpenDelete />

        {/* button add */}
        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <ModalInputKategori />

          <FAB
            visible={whatspage.page === 'Category' ? true : false}
            style={{
              backgroundColor: Colors.blue400,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 0,
              right: 20,
              height: responsiveHeight(6),
              width: responsiveHeight(6),
            }}
            icon={() => {
              return <IconMCI name="plus" color={Colors.white} size={23} />;
            }}
            onPress={() => {
              dispatch(setPage({page: 'Input'}));
              openModalInputKategori(false);
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  modalText2: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
    color: 'grey',
  },
});

export default CategoryScreen;
