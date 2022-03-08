/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Image, LogBox, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Modal, Dimensions, Pressable } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
// import Database from "../../../db/database";
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import { Avatar, ActivityIndicator, Divider, FAB, Colors } from 'react-native-paper';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFh from 'react-native-vector-icons/Feather';
import 'intl';
import 'intl/locale-data/jsonp/id';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { StackBeranda } from '../../../interfaceRoutes';
import moment from 'moment';
import { setShowTab } from '../../store/navigationRedux';
import { setPage } from '../../store/whatsPage';
// import Animated from 'react-native-reanimated';
import IconEntypo from 'react-native-vector-icons/Entypo';
import InfoScreen from '../Info';
import { StyleSheet } from 'react-native';
import { getAllCatatan, getAllKategori, getFilterCatatanByMonth } from '../../../db/database';
import DetailScreen from '../DetailCatatan';
export interface IListKategori {
  id: any,
  nama_kategori: any,
}

const HomeScreen = ({ navigation }: StackBeranda) => {

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  const [stateOpenFabGroup, setStateOpenFabGroup] = React.useState({ open: false });

  const { open } = stateOpenFabGroup;

  const [pemasukan, setpemasukan] = useState(0);
  const [pemasukanATM, setpemasukanATM] = useState(0);
  const [pemasukanDompet, setpemasukanDompet] = useState(0);
  const [pengeluaranATM, setpengeluaranATM] = useState(0);
  const [pengeluaranDompet, setpengeluaranDompet] = useState(0);
  const [totalsaldo, settotalsaldo] = useState(0);
  const [saldoatm, setsaldoatm] = useState(0);
  const [saldodompet, setsaldodompet] = useState(0);
  const [fetchSaldo, setfetchSaldo] = useState<any>(false);

  const [allKategori, setallKategori] = useState<any>([]);
  const [filterLabelValueKategori, setfilterLabelValueKategori] = useState<any>([]);
  const [filterKategori, setfilterKategori] = useState<any>([]);
  const [fetchAllCatatan, setfetchAllCatatan] = useState<any>(false);
  const [allCatatan, setallCatatan] = useState<any[]>([]);

  LogBox.ignoreAllLogs();//Ignore all log notifications

  function formatRupiah(value: any) {
    return new Intl.NumberFormat('id').format(value);
  }

  const [selectTipeInput, setselectTipeInput] = useState('');
  const [visiblemodal, setvisiblemodal] = React.useState(false);
  const setModal = React.useCallback(() => {
    setvisiblemodal(true);
  }, [visiblemodal]);

  const closeModalAddCatatan = React.useCallback(() => {
    setvisiblemodal(false);
  }, [visiblemodal]);

  const TypeInput = () => {
    return (
      <View style={{
        // flex:1,
        marginTop: 40,
        marginHorizontal: 10,
        justifyContent: 'center', alignItems: 'center',
      }}>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[Colors.green100, Colors.green50]}
          style={{ height: responsiveHeight(15), position: 'relative', width: '100%', borderRadius: 5, elevation: 2, marginBottom: 20 }}
        >
          <Pressable style={{
            borderRadius: 5, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
            position: 'absolute', bottom: 0, top: 3,
            // backgroundColor: 'red'
          }}
            onPress={() => {
              closeModalAddCatatan();
              navigation.navigate('InputPemasukan', {
                data: _filterKategori('pemasukan'),
                saldoAtm: saldoatm,
                saldoDompet: saldodompet,
              });
              // dispatch(setPage({ page: 'Input' }))
              // setselectTipeInput('pemasukan')
            }}
          >
            <Text style={{ color: Colors.green400, textTransform: 'uppercase', fontWeight: 'bold' }}>Pemasukan</Text>
            <Image source={require('../../assets/images/pemasukan.png')}
              resizeMode="stretch"
              style={{
                width: responsiveHeight(20),
                height: responsiveHeight(20),
                // height: orientationScreen === 'portrait' ? verticalScale(24) : verticalScale(35)
              }}
            />
          </Pressable>
        </LinearGradient>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={[Colors.red100, Colors.red50]}
          style={{ height: responsiveHeight(15), position: 'relative', width: '100%', borderRadius: 5, elevation: 2, marginBottom: 10 }}
        >
          <Pressable style={{
            borderRadius: 5, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
            position: 'absolute', bottom: 0, top: 3,
            // backgroundColor: 'red'
          }}
            onPress={() => {
              closeModalAddCatatan();
              navigation.navigate('InputPengeluaran', {
                data: _filterKategori('pengeluaran'),
                saldoAtm: saldoatm,
                saldoDompet: saldodompet,
              });
              // dispatch(setPage({ page: 'Input' }))
              // setselectTipeInput('pengeluaran')
            }}
          >
            <Text style={{ color: Colors.red400, textTransform: 'uppercase', fontWeight: 'bold' }}>Pengeluaran</Text>
            <Image source={require('../../assets/images/pengeluaran.png')}
              resizeMode="stretch"
              style={{
                width: responsiveHeight(20),
                height: responsiveHeight(20),
                // height: orientationScreen === 'portrait' ? verticalScale(24) : verticalScale(35)
              }}
            />
          </Pressable>
        </LinearGradient>
      </View>
    );
  };

  const ModalOpenAddCatatan = () => {
    return (
      <Modal
        animationType="slide"
        visible={visiblemodal}
        transparent={false}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
          <FAB
            style={{
              backgroundColor: Colors.pink400, borderRadius: 100,
              justifyContent: 'center', alignItems: 'center',
              top: 10, left: 10,
              height: responsiveHeight(6),
              width: responsiveHeight(6),
            }}
            icon={() => {
              return (
                <IconMCI name="close" color={Colors.white} size={23} />
              );
            }}
            onPress={() => {
              closeModalAddCatatan();
              dispatch(setPage({ page: 'Home' }));
            }}
          />

          {/* <TypeInput /> */}
          {
            // selectTipeInput === 'pemasukan'
            // ? <InputPemasukanScreen data={listKategori}/>
            // : selectTipeInput === 'pengeluaran'
            // ? <InputPengeluaranScreen data={listKategori} saldoAtm={saldoatm} saldoDompet={saldodompet}/>
            selectTipeInput === 'tipe_input'
            ? <TypeInput />
            : <InfoScreen />
          }
        </View>
      </Modal>
    );
  };

  const [selectTipeInputDetail, setselectTipeInputDetail] = useState('');
  const [visiblemodalDetail, setvisiblemodalDetail] = React.useState(false);
  const [dataItemDetail, setdataItemDetail] = React.useState();
  const setModalDetail = React.useCallback((data: any) => {
    setvisiblemodalDetail(true);
    setdataItemDetail(data);
  }, [visiblemodalDetail]);

  const closeModalDetailCatatan = React.useCallback(() => {
    setvisiblemodalDetail(false);
  }, [visiblemodalDetail]);

  const ModalOpenDetailCatatan = () => {
    return (
      <Modal
        animationType="slide"
        visible={visiblemodalDetail}
        transparent={false}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
          <FAB
            style={{
              backgroundColor: Colors.pink400, borderRadius: 100,
              justifyContent: 'center', alignItems: 'center',
              top: 10, left: 10,
              height: responsiveHeight(6),
              width: responsiveHeight(6),
            }}
            icon={() => {
              return (
                <IconMCI name="close" color={Colors.white} size={23} />
              );
            }}
            onPress={() => {
              closeModalDetailCatatan();
              dispatch(setPage({ page: 'Home' }));
            }}
          />

          <DetailScreen data={dataItemDetail} listKategori={allKategori} saldoAtm={saldoatm} saldoDompet={saldodompet} />

          {/* {
            selectTipeInput === 'pemasukan'
            ? <InputPemasukanScreen data={listKategori}/>
            : selectTipeInput === 'pengeluaran'
            ? <InputPengeluaranScreen data={listKategori} saldoAtm={saldoatm} saldoDompet={saldodompet}/>
            : selectTipeInput === 'tipe_input'
            ? <TypeInput />
            : <InfoScreen />
          } */}
        </View>
      </Modal>
    );
  };

  function _filterKategori(type: string) {
    const filterItem: any[] = [];
    allKategori.map((item: any) => {
      if (item.tipe_kategori === type) {
        const list: any = {
          label: item.nama_kategori,
          value: item.nama_kategori,
        };
        filterItem.push(list);
      }
    });
    return filterItem;
  }

  const getListKategori = () => {
    getAllKategori()
      .then((respListKategori: any) => {
        console.log('data kategori = ', respListKategori);

        const filterData: any[] = [];
        respListKategori.map((item: any) => {
          const list: any = {
            label: item.nama_kategori,
            value: item.nama_kategori,
          };
          filterData.push(list);
        });
        setfilterLabelValueKategori(filterData);
        setallKategori(respListKategori);
      })
      .catch((err) => {
        console.log('error = ', err);
      });

    // try {
    //   const respListKategori: any = await getAllKategori();
    //   console.log('kategori = ',respListKategori)

    // const filterData: any[] = []
    // respListKategori.map((item: any) => {
    //   const list: any = {
    //     label: item.nama_kategori,
    //     value: item.nama_kategori,
    //   }
    //   filterData.push(list)
    // })
    // setfilterLabelValueKategori(filterData)
    // setallKategori(respListKategori)
    // } catch (error) {
    //   console.log('error kategori = ',error)
    // }
  };

  const getListCatatan = () => {
    getAllCatatan()
      .then((respListCatatan: any) => {
        console.log('data catatan = ', respListCatatan);
        setallCatatan(respListCatatan);
        setfetchAllCatatan(true);
      })
      .catch((err) => {
        console.log('error = ', err);
      });
    // try {
    //   const respListCatatan: any = getAllCatatan();
    //   console.log('data = ',respListCatatan)
    //   setallCatatan(respListCatatan)
    //   setfetchAllCatatan(true)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const getCatatanByMonth = () => {
    getFilterCatatanByMonth('06')
      .then((respListCatatan: any) => {
        console.log('data tanggal catatan = ', respListCatatan);
      })
      .catch((err) => {
        console.log('error = ', err);
      });
  };

  useEffect(() => {
    dispatch(setShowTab());
    navigation.addListener('focus', () => {
      dispatch(setPage({ page: 'Home' }));
    });
  }, [navigation]);

  useEffect(() => {
    // deleteAllCatatan();
    getListKategori();
    getListCatatan();
    getCatatanByMonth();
  }, []);

  useEffect(() => {
    let pemasukan_atm: any[] = [];
    let pemasukan_dompet: any[] = [];
    let pengeluaran_atm: any[] = [];
    let pengeluaran_dompet: any[] = [];

    if (allCatatan.length !== 0) {
      allCatatan.map((item: any) => {
        // jika akun ATM
        if (item.akun === 'atm') {
          if (item.tipe === 'pemasukan') {
            pemasukan_atm.push(parseInt(item.nominal));
          } else {
            if (item.tujuan === 'tarik tunai') {
              pemasukan_dompet.push(parseInt(item.nominal));
              pengeluaran_atm.push(parseInt(item.nominal));
            } else {
              pengeluaran_atm.push(parseInt(item.nominal));
            }
          }
        } else {
          if (item.tipe === 'pemasukan') {
            pemasukan_dompet.push(parseInt(item.nominal));
          } else {
            pengeluaran_dompet.push(parseInt(item.nominal));
          }
        }
      });

      const totalPemasukanAtm = pemasukan_atm.reduce((a, b) => a + b, 0);
      const totalPemasukanDompet = pemasukan_dompet.reduce((a, b) => a + b, 0);
      const totalPengeluaranAtm = pengeluaran_atm.reduce((a, b) => a + b, 0);
      const totalPengeluaranDompet = pengeluaran_dompet.reduce((a, b) => a + b, 0);
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;

      // console.log('pemasukan', totalPemasukan)
      // console.log('pengeluaranATM', totalPengeluaranATM)
      // console.log('atm', totalAtm)
      // console.log('dompet', totalDompet)

      // setpemasukan(totalPemasukan)
      setpemasukanATM(totalPemasukanAtm);
      setpengeluaranATM(totalPengeluaranAtm);
      setpemasukanDompet(totalPemasukanDompet);
      setpengeluaranDompet(totalPengeluaranDompet);
      settotalsaldo(totalSaldo);
      setsaldoatm(totalSaldoAtm);
      setsaldodompet(totalSaldoDompet);
      setfetchSaldo(true);
    }
    else {
      const totalPemasukanAtm = 0;
      const totalPemasukanDompet = 0;
      const totalPengeluaranAtm = 0;
      const totalPengeluaranDompet = 0;
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm;
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet;

      // console.log('pemasukan', totalPemasukan)
      // console.log('pengeluaranATM', totalPengeluaranATM)
      // console.log('atm', totalAtm)
      // console.log('dompet', totalDompet)

      // setpemasukan(totalPemasukan)
      setpemasukanATM(totalPemasukanAtm);
      setpengeluaranATM(totalPengeluaranAtm);
      setpemasukanDompet(totalPemasukanDompet);
      setpengeluaranDompet(totalPengeluaranDompet);
      settotalsaldo(totalSaldo);
      setsaldoatm(totalSaldoAtm);
      setsaldodompet(totalSaldoDompet);
      setfetchSaldo(true);
    }
  }, [allCatatan]);


  useEffect(() => {
    if (whatspage.page === 'Beranda' || whatspage.page === 'UpdateBeranda') {
      closeModalDetailCatatan();
      getListCatatan();
      getListKategori();
      closeModalAddCatatan();
    }
  }, [whatspage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* greeting */}
      <View style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20, marginHorizontal: 10,
      }}>

        <View style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Avatar.Text
            size={responsiveHeight(6)}
            label={user.name.slice(0,1).toUpperCase()}
            color={Colors.blue400}
            style={{backgroundColor: Colors.blue50}}
            labelStyle={{fontWeight: 'bold'}}
          />
          <View style={{marginLeft: 10}}>
            <View>
              <Text style={{
                color: '#000',
              }}>Selamat Datang,</Text>
            </View>
            <View>
              <Text style={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                color: '#000',
              }}>{user.name}</Text>
            </View>
          </View>
        </View>

        <FAB
          visible={true}
          style={{
            backgroundColor: Colors.blue50, borderRadius: 100,
            justifyContent: 'center', alignItems: 'center',
            bottom: 0, right: 0,
            height: responsiveHeight(6),
            width: responsiveHeight(6),
            elevation: 0,
          }}
          icon={() => {
            return (
              <IconMCI name="folder-image" color={Colors.blue400} size={23} />
            );
          }}
          onPress={() => {
            setselectTipeInput('info');
            setModal();
          }}
        />

        {/* <TouchableOpacity style={{
          backgroundColor: Colors.blue400,
          height: responsiveHeight(5),
          width: responsiveHeight(5),
          borderRadius: 100,
          justifyContent: 'center', alignItems: 'center',
          elevation: 5
          // borderColor: '#5157CB', borderWidth: 2
        }}
        onPress={()=>{
          setselectTipeInput('info')
          setModal()
          // navigation.navigate('Info')
          // dispatch(setPage({page: 'Info'}))
        }}
        >
          <IconEntypo name="info" color={Colors.white} size={20}/>
        </TouchableOpacity> */}
      </View>

      {/* saldo */}
      <View style={{
        ...styles.boxSaldo,
        marginTop: 20,
        backgroundColor: Colors.red50,
      }}
      >
        <View style={styles.between_center_row}>
          <View style={{
            backgroundColor: Colors.red400,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
          }}>
            <IconFh name="dollar-sign" color="#fff" size={30} />
          </View>
          <View>
            <Text>Total Saldo</Text>
            {
              fetchAllCatatan === false ?
                <ActivityIndicator animating={true} color={Colors.red500} />
                :
                <Text style={{ fontWeight: 'bold' }}>Rp. {formatRupiah(totalsaldo)}</Text>
            }
          </View>
        </View>
      </View>

      <View style={{
        ...styles.boxSaldo,
        marginTop: 10,
        backgroundColor: Colors.green50,
      }}
      >
        <View style={styles.between_center_row}>
          <View style={{
            backgroundColor: Colors.green400,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
          }}>
            <IconEntypo name="credit-card" color="#fff" size={30} />
          </View>
          <View>
            <Text>Saldo ATM</Text>
            {
              fetchAllCatatan === false ?
                <ActivityIndicator animating={true} color={Colors.red500} />
                :
                <Text style={{ fontWeight: 'bold' }}>Rp. {formatRupiah(saldoatm)}</Text>
            }
          </View>
        </View>
      </View>

      <View style={{
        ...styles.boxSaldo,
        marginTop: 10,
        backgroundColor: Colors.blue50,
      }}
      >
        <View style={styles.between_center_row}>
          <View style={{
            backgroundColor: Colors.blue400,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
          }}>
            <IconMCI name="bag-personal-outline" color="#fff" size={30} />
          </View>
          <View>
            <Text>Saldo Dompet</Text>
            {
              fetchAllCatatan === false ?
                <ActivityIndicator animating={true} color={Colors.red500} />
                :
                <Text style={{ fontWeight: 'bold' }}>Rp. {formatRupiah(saldodompet)}</Text>
            }
          </View>
        </View>
      </View>


      {/* list catatan */}
      <View style={{
        justifyContent: 'center', alignItems: 'center',
        flexDirection: 'row', marginVertical: 20, marginHorizontal: 10,
      }}>
        <View style={{
          marginTop: 10, borderColor: Colors.grey600, borderWidth: 2,
          borderStyle: 'dotted', borderRadius: 1, width: '33.3333333333%',
        }}
        />
        <Text style={{ width: '33.3333333333%', color: Colors.black, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>List Catatan</Text>
        <View style={{
          marginTop: 10, borderColor: Colors.grey600, borderWidth: 2,
          borderStyle: 'dotted', borderRadius: 1, width: '33.3333333333%',
        }}
        />
      </View>
      {
        allCatatan.length === 0 ?
          <View style={{
            flex: 1, marginTop: 10, justifyContent: 'center', alignItems: 'center',
          }}
          >
            <Image source={require('../../assets/logo/logo2.png')}
              resizeMode="stretch"
              style={{
                width: responsiveHeight(25),
                height: responsiveHeight(25),
                // height: orientationScreen === 'portrait' ? verticalScale(24) : verticalScale(35)
              }}
            />
            <Text>Belum ada data..</Text>
          </View>
          :
          <ScrollView style={{marginHorizontal: 10}}>
                {
                  allCatatan.map((item: any) => {
                  return (
                    <View key={`item-${item.id}`}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#fff',
                          flexDirection: 'row', justifyContent: 'space-between',
                          height: responsiveHeight(7),
                        }}
                        onPress={() => {
                          dispatch(setPage({ page: 'Edit' }));
                          setModalDetail(item);
                          // <navigation.navigate('Detail', {
                          //   data: item,
                          //   listKategori: allKategori,
                          //   saldoAtm: saldoatm,
                          //   saldoDompet: saldodompet,
                          // })>
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center', height: '50%' }}>
                              <Text style={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }}
                              >
                                {item.keterangan}
                              </Text>
                            </View>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: '50%' }}>
                              <Text style={{ textTransform: 'uppercase', color: Colors.grey400 }}
                              >
                                {item.akun}
                              </Text>
                              {
                                item.tujuan === 'tarik tunai' ?
                                  <Text style={{
                                    backgroundColor: item.tipe === 'pemasukan' ? Colors.green50 : Colors.red50, marginLeft: 10, fontWeight: 'bold', textTransform: 'uppercase', color: item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400, paddingHorizontal: 5,
                                  }}>Tarik Tunai</Text>
                                  : <Text />
                              }
                            </View>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <View style={{ marginLeft: 10, height: '100%' }}>
                            <View style={{ justifyContent: 'center', height: '50%' }}>
                              <Text style={{
                                fontWeight: 'bold', textTransform: 'capitalize', color: item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400,
                              }}>
                                {item.tipe === 'pemasukan' ? '+ ' : '- '}
                                Rp. {formatRupiah(item.nominal)}
                              </Text>
                            </View>
                            <View style={{ justifyContent: 'center', height: '50%' }}>
                              <Text style={{ textTransform: 'uppercase', color: Colors.grey400, textAlign: 'right' }}
                              >{moment(item.tanggal).format('YYYY/MM/DD')}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* <View style={{
                        marginBottom: 5, borderColor: Colors.grey600, borderWidth: 1.5,
                        borderStyle: 'dotted', borderRadius: 1,
                      }}
                      /> */}
                      <Divider
                        style={{
                          marginBottom: 5, borderColor: Colors.grey300, borderWidth: 0.3,
                        }}
                      />
                    </View>
                  );
                })
              }
          </ScrollView>
      }

      <ModalOpenDetailCatatan />

      {/* button add */}
      <View style={{
        // backgroundColor: 'red',
        width: '100%',
        height: 50,
        position: 'absolute', bottom: 20,
        // marginBottom: 80,
        justifyContent: 'center', alignItems: 'flex-end',
      }}>
        <ModalOpenAddCatatan />

        <FAB
          visible={whatspage.page === 'Beranda' ? true : whatspage.page === 'UpdateBeranda' ? true : false}
          style={{
            backgroundColor: Colors.blue400, borderRadius: 100,
            justifyContent: 'center', alignItems: 'center',
            bottom: 0, right: 20,
            height: responsiveHeight(6),
            width: responsiveHeight(6),
          }}
          icon={() => {
            return (
              <IconMCI name="plus" color={Colors.white} size={23} />
            );
          }}
          onPress={() => {
            dispatch(setPage({ page: 'Input' }));
            setselectTipeInput('tipe_input');
            setModal();
            // openModalInputKategori(false)
          }}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxSaldo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 1,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: .5,
  },
  between_center_row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HomeScreen;
