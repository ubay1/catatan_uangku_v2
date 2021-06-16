import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Button, Colors, Divider, FAB } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { StackSetelan } from '../../../interfaceRoutes';
import { AppDispatch } from '../../store';
import { setPage } from '../../store/whatsPage';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../store/rootReducer';
import InputKategori from '../Input/kategori/input';
import { deleteKategori, getAllKategori } from '../../../db/database';

const SetelanScreen = ({ route, navigation }: StackSetelan) => {
  
  const dispatch: AppDispatch = useDispatch()
  const whatspage = useSelector((state: RootState) => state.whatsPage)

  const [fetchListKategori, setfetchListKategori] = useState<any>(false)
  const [listKategori, setlistKategori] = useState<any>([]);
  const [orientationScreen, setorientationScreen] = useState('');
  
  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }
  
  // const [selectTipeKategori, setselectTipeKategori] = useState('');
  const [stateOpenFabGroup, setStateOpenFabGroup] = React.useState({ open: false });

  const onStateChangeFabGroup = ({ open }: any) => {
    setStateOpenFabGroup({ open })
  };
  const { open } = stateOpenFabGroup;

  const [isEdit, setisEdit] = useState(false);
  const [idListKategori, setidListKategori] = useState(0);
  const [visibleModalInputKategori, setvisibleModalInputKategori] = React.useState(false)
  const openModalInputKategori = React.useCallback((isedit?: any, id?: any) => {
    console.log('teeee ', id)
    setidListKategori(id)
    setisEdit(isedit)
    setvisibleModalInputKategori(true);
  }, [visibleModalInputKategori])

  const closeModalInputKategori = React.useCallback(() => {
    setvisibleModalInputKategori(false);
  }, [visibleModalInputKategori])

  const ModalInputKategori = () => {
    return (
      <Modal
        animationType="slide"
        visible={visibleModalInputKategori}
        transparent={false}
      >
        <View style={{
          flex: 1,
          backgroundColor:  '#fff'
        }}>
          <FAB
            style={{
              backgroundColor: Colors.pink400, borderRadius: 100,
              justifyContent: 'center', alignItems: 'center',
              top: 10, left: 10,
              height: responsiveHeight(6),
              width: responsiveHeight(6)
            }}
            icon={() => {
              return (
                <IconMCI name="close" color={Colors.white} size={23} />
              )
            }}
            onPress={() => {
              closeModalInputKategori()
              dispatch(setPage({ page: 'Setelan' }))
            }}
          />

          <InputKategori edit={isEdit} dataProps={listKategori[idListKategori]}/>
        </View>
      </Modal>
    )
  }

  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [visibleModalDelete, setvisibleModalDelete] = React.useState(false)
  const openModalDelete = React.useCallback(() => {
    setvisibleModalDelete(true);
  }, [visibleModalDelete])

  const closeModalDelete = React.useCallback(() => {
    setvisibleModalDelete(false);
  }, [visibleModalDelete])

  const ModalOpenDelete = () => {
    return (
      <Modal
        animationType="slide"
        visible={visibleModalDelete}
        transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setvisibleModalDelete(!visibleModalDelete);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>Yakin mau hapus ?</Text>
            <Text style={{color: Colors.grey600}}>data yang telah dihapus</Text>
            <Text style={{color: Colors.grey600, marginBottom: 10 }}>tidak dapat dikembalikan</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-around'
            }}>
              <Button
                dark
                uppercase={false}
                color="#2196F3"
                mode="contained"
                onPress={() => {
                  setvisibleModalDelete(false)
                }}
                contentStyle={{}}
                style={{ borderRadius: 10, marginTop: 10, marginRight: 5 }}
                disabled={
                  loadingDelete === true ? true : false
                }
                theme={{ colors: { disabled: 'grey' } }}
              >
                <Text style={{ }}>Tidak</Text>
              </Button>
              <Button
                dark
                uppercase={false}
                color="#f24b51"
                mode="contained"
                onPress={() => {
                  setvisibleModalDelete(false)
                  setloadingDelete(true)
                  delKategori(idListKategori)
                  getListKategori()
                }}
                contentStyle={{}}
                style={{ borderRadius: 10, marginTop: 10 }}
                disabled={
                  loadingDelete === true ? true : false
                }
                theme={{ colors: { disabled: 'grey' } }}
              >
                <Text style={{ }}>Ya</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const getListKategori = () => {
    getAllKategori()
    .then((respListKategori) => {
      setlistKategori(respListKategori)
      setfetchListKategori(true)
    })
    .catch((err) => {
      console.log('error = ', err);
    })
    // try { 
    //   const respListKategori: any = await getAllKategori();
    //   setlistKategori(respListKategori)
    //   setfetchListKategori(true)
    // } catch (error) {
    //   console.log('error kategori = ',error)
    // }
  }

  const delKategori = (id: any) => {
    deleteKategori(id)
    .then((respListKategori) => {
      setloadingDelete(false)
    })
    .catch((err) => {
      console.log('error = ', err);
      setloadingDelete(false)
    })

    // try { 
    //   const respListKategori: any = deleteKategori(id);
    //   setloadingDelete(false)
    // } catch (error) {
    //   console.log('error kategori = ',error)
    //   setloadingDelete(false)
    // }
  }
  
  useEffect(() => {
    getOrientation();
    Dimensions.addEventListener('change', () => {
      getOrientation()
    })
  }, [])

  useEffect(() => {
    if (whatspage.page === 'Setelan') {
      getListKategori()
      closeModalInputKategori()
    }
  }, [whatspage])
  
  React.useEffect(() => {
    navigation.addListener('focus', e => {
      dispatch(setPage({ page: 'Setelan' }))
    });
  }, [navigation]);

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor:  '#fff' }}>
      <ScrollView style={{
        // marginHorizontal: 10,
        height: responsiveHeight(100)
      }}>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <View 
            style={{
              marginBottom: 30, marginTop: 20
            }}
          >
            {
              fetchListKategori === false ?
              <ActivityIndicator animating={true} color={Colors.blue400} size="large" style={{ marginTop: 20, }} />
              :
              listKategori.length === 0 ?
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginVertical: 20,
                  height: responsiveHeight(80),
                  // height: orientationScreen === 'portrait' ? responsiveHeight(24) : responsiveHeight(45) ,
                  // width: '100%', 
                  // backgroundColor: 'red'
                }}>
                  <Image source={require('../../assets/logo/logo2.png')}
                    resizeMode="stretch"
                    style={{
                      // width: scale(180),
                      // height: verticalScale(150) 
                      width: responsiveHeight(25),
                      height: responsiveHeight(25)
                      // height: orientationScreen === 'portrait' ? verticalScale(24) : verticalScale(35) 
                    }}
                  />
                  <Text style={{ marginTop: 10, color: Colors.black}}>Belum ada kategori</Text>
                </View>
              :
              listKategori.map((item: any, index: number) => {
                return(
                  <View key={`item-${item.id}`} style={{}}>
                    <View
                      style={{
                        backgroundColor:  '#fff',
                        flexDirection: 'row', justifyContent: 'space-between',
                        // alignItems: 'center',
                        height: responsiveHeight(7),
                      }}
                    >
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <View style={{ justifyContent: 'center', height: '100%' }}>
                          <View style={{ height: '50%' }}>
                            <Text style={{  fontWeight: 'bold', textTransform: 'capitalize', color: Colors.black }}
                            >
                              {item.nama_kategori}
                            </Text>
                          </View>
                          <View style={{ height: '50%' }}>
                            <Text style={{ textTransform: 'capitalize', color: Colors.grey400 }}
                            >
                              {item.tipe_kategori}
                            </Text>
                          </View>
                        </View>
                        <View 
                          style={{
                            flexDirection: 'row', alignItems: 'center'
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              padding: 5,
                            }}
                            onPress={() => {
                              dispatch(setPage({ page: 'Input' }))
                              openModalInputKategori(true, index)
                            }}
                          >
                            <IconMCI name="pencil" size={20} color={Colors.blue400}/>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              padding: 5,
                            }}
                            onPress={() => {
                              openModalDelete()
                              setidListKategori(item.id)
                            }}
                          >
                            <IconMCI name="delete" size={20} color={Colors.blue400} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <Divider 
                      style={{
                        marginBottom: 5, borderColor: Colors.grey300, borderWidth: .3,
                      }}
                    />
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      
      <ModalOpenDelete />

      {/* button add */}
      <View style={{
        // backgroundColor: 'red',
        width: '100%', height: 50,
        position: 'absolute', bottom: 20,
        justifyContent: 'center', alignItems: 'flex-end',
      }}>
        <ModalInputKategori />

        <FAB
          visible={whatspage.page === 'Setelan' ? true : false}
          style={{
            backgroundColor: Colors.blue400, borderRadius: 100,
            justifyContent: 'center', alignItems: 'center',
            bottom: 0, right: 20,
            height: responsiveHeight(6),
            width: responsiveHeight(6)
          }}
          icon={() => {
            return (
              <IconMCI name="plus" color={Colors.white} size={23} />
            )
          }}
          onPress={() => {
            dispatch(setPage({ page: 'Input' }))
            openModalInputKategori(false)
          }}
        />
      </View>

    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
      },
  modalText2: {
    textAlign: "center",
    fontSize: responsiveFontSize(1.5),
    color: 'grey'
  }
});

export default SetelanScreen
