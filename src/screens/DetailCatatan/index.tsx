/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput as TextInputRN, Alert, Modal, StyleSheet } from 'react-native';

import { Button, Colors } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
// import Database from '../../../db/database';
import { setPage } from '../../store/whatsPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { deleteCatatan, updateCatatan } from '../../../db/database';

// const DetailScreen = ({ route, navigation }: StackDetail) => {
const DetailScreen = (props: {data:any, listKategori:any, saldoAtm:any, saldoDompet:any}) => {
  const dispatch: AppDispatch = useDispatch();
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  // const params = route.params.data;
  // const params_list_kategori = route.params.listKategori;
  // const param_saldo_atm = route.params.saldoAtm;
  // const param_saldo_dompet = route.params.saldoDompet;
  const params = props.data;
  const params_list_kategori = props.listKategori;
  const param_saldo_atm = props.saldoAtm;
  const param_saldo_dompet = props.saldoDompet;

  const [orientationScreen, setorientationScreen] = useState('');


  const [date, setDate] = useState<any>(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const [idCatatan, setidCatatan] = useState('');
  const [tipeCatatan, settipeCatatan] = useState('');
  const [selectAkun, setselectAkun] = useState('');
  const [selectKategori, setselectKategori] = useState('');
  const [listKategori, setlistKategori] = useState<any[]>([]);
  const [selectTujuan, setselectTujuan] = useState('');
  const [nominal, setnominal] = useState<any>('');
  const handleInputnominal = (text: any) => {
    if (/^\d+$/.test(text) || text === '') {
      setnominal(text);
    }
  };

  const [keterangan, setketerangan] = useState('');

  const [name, setName] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [loadingDelete, setloadingDelete] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    // console.log(currentDate)
    // setShow(Platform.OS === 'android');
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function formatRupiah(value: any) {
    return new Intl.NumberFormat('id').format(value);
  }


  const editCatatan = () => {
    if (selectAkun === '' || nominal === '' || keterangan === '') {
      Alert.alert('harap isi semua form yang disediakan');
      setloading(false);
    } else {
      const data: any = {
        id: parseInt(idCatatan),
        tipe: params.tipe,
        tanggal: moment(date).format('YYYY-MM-DD').toString(),
        akun: selectAkun,
        nominal: parseInt(nominal),
        tujuan: selectTujuan,
        keterangan: keterangan,
        kategori: selectKategori,
      };

      updateCatatan(data)
      .then(()=>{
        setloading(false);
        dispatch(setPage({page: 'updateHome'}));
      })
      .catch((err) => {
        console.log('error = ',err);
      });

      // try {
      //   setTimeout(async () => {
      //     const respUpdateCatatan = await updateCatatan(data)
      //     console.log('aa = ',respUpdateCatatan)
      //     setloading(false);

      //     dispatch(setPage({page: 'updateHome'}))
      //     // navigation.navigate('Beranda')
      //   }, 300);
      // } catch (error) {
      //   console.log('error update catatan :', error);
      //   setloading(false);
      // }
    }
  };

  const delCatatan = (id: any) => {
    deleteCatatan(parseInt(id))
    .then(() => {
      dispatch(setPage({page: 'updateHome'}));
    })
    .catch((err) => {
      console.log('error = ',err);
    });
  };

  const [visiblemodal, setvisiblemodal] = React.useState(false);
  const setModal = React.useCallback(() => {
    setvisiblemodal(true);
  }, [visiblemodal]);


  const ModalOpenDelete = () => {
    return (
      <Modal
        animationType="slide"
        visible={visiblemodal}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setvisiblemodal(!visiblemodal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>Yakin mau hapus ?</Text>
            <Text style={{color: Colors.grey600}}>data yang telah dihapus</Text>
            <Text style={{color: Colors.grey600, marginBottom: 10 }}>tidak dapat dikembalikan</Text>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-around',
            }}>
              <Button
                dark
                uppercase={false}
                color="#2196F3"
                mode="contained"
                onPress={() => {
                  setvisiblemodal(false);
                  // setloadingDelete(true)
                  // deleteCatatan(idCatatan)
                }}
                contentStyle={{  }}
                style={{ borderRadius: 5, marginTop: 10, marginRight: 5 }}
                disabled={
                  loadingDelete === true ? true :
                    loading === true ? true : false
                }
                theme={{ colors: { disabled: 'grey' } }}
              >
                <Text style={{}}>Tidak</Text>
              </Button>
              <Button
                dark
                uppercase={false}
                color="#f24b51"
                mode="contained"
                onPress={() => {
                  setvisiblemodal(false);
                  setloadingDelete(true);
                  delCatatan(idCatatan);
                }}
                contentStyle={{  }}
                style={{ borderRadius: 5, marginTop: 10 }}
                disabled={
                  loadingDelete === true ? true :
                    loading === true ? true : false
                }
                theme={{ colors: { disabled: 'grey' } }}
              >
                <Text>Ya</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  function _filterKategori(type: string) {
    const filterItem: any[] = [];
    params_list_kategori.map((item: any) => {
      console.log('test = ', item);
      if (item.tipe_kategori === type) {
        const list: any = {
          label: item.nama_kategori,
          value: item.nama_kategori,
        };
        filterItem.push(list);
      }
    });

    setlistKategori(filterItem);
  }

  // useEffect(() => {
  //   // dispatch(setHideTab())
    // console.log('params = ',params.nominal)
    // _filterKategori(params.tipe)
    // setidCatatan(params.id)
    // settipeCatatan(params.tipe)
    // setDate(new Date(params.tanggal))
    // setselectAkun(params.akun)
    // setselectTujuan(params.tujuan)
    // setnominal(params.nominal.toString())
    // setketerangan(params.keterangan)
    // setselectKategori(params.kategori)


  //   navigation.addListener("beforeRemove", (param) => {
  //     console.log('back to home')
  //     dispatch(setPage({ page: 'Home' }))
  //     dispatch(setShowTab())
  //   })
  // }, [navigation])

  useEffect(() => {
    if (whatspage.page === 'Edit') {
      _filterKategori(params.tipe);
      setidCatatan(params.id);
      settipeCatatan(params.tipe);
      setDate(new Date(params.tanggal));
      setselectAkun(params.akun);
      setselectTujuan(params.tujuan);
      setnominal(params.nominal.toString());
      setketerangan(params.keterangan);
      setselectKategori(params.kategori);
    }
  }, [whatspage]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:  '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 0}}>
        <View style={{
          marginTop: 20,
        }}>
          <Text style={{ marginBottom: 5, color: '#000'  }}>Tanggal</Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',
            height: responsiveHeight(7),
          }}>
            <View style={{
              backgroundColor: Colors.white, height: '100%', width: '80%', justifyContent:'center', paddingLeft: 10,
              borderColor: Colors.grey600,
              borderWidth: 1, borderRightWidth: 0,
              borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
              }}
            >
              <Text style={{ color: '#000'  }}>{moment(date).format('YYYY-MM-DD').toString()}</Text>
            </View>
            <View style={{ height: '100%', width: '20%',
              }}
            >
              <Button onPress={showDatepicker} style={{
                backgroundColor: Colors.white,
                alignItems: 'center', justifyContent: 'center',
                height: '100%', width: '100%',
                borderColor: Colors.grey600,
                borderWidth: 1, borderLeftWidth: 0,
                borderTopRightRadius: 5, borderBottomRightRadius: 5,
                borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
              }}
              >
                <IconMCI name="calendar" size={23} color={Colors.black}/>
              </Button>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                maximumDate={new Date()}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
          }}>
            <Text style={{ marginBottom: 5, color: '#000'  }}>Saldo</Text>
            <Text style={{
              fontWeight: 'bold', color: Colors.blue400,
            }}>
            {
              tipeCatatan === 'pengeluaran' ?
                selectAkun === 'atm' ?
                  `Rp.${formatRupiah(param_saldo_atm + parseInt(params.nominal))}`
                  :
                  selectAkun === 'dompet' ? `Rp.${formatRupiah(
                    (parseInt(param_saldo_dompet) + parseInt(params.nominal))
                  )}`
                    : false
                : false
            }
          </Text>
          </View>
          <DropDownPicker
            disabled={tipeCatatan === 'pemasukan' ? false : true}
            items={[
              { label: 'Pilih Saldo', value: '', hidden: true },
              { label: 'ATM', value: 'atm' },
              { label: 'Dompet', value: 'dompet' },
            ]}
            defaultValue={selectAkun}
            containerStyle={{ height: responsiveHeight(7) }}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{  }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            onChangeItem={(item: any) => {
              console.log(item);
              if (item.value === 'dompet' && params.tipe === 'pengeluaran') {
                setselectAkun(item.value);
                setselectTujuan('');
              } else {
                setselectAkun(item.value);
              }
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 5, color: '#000'  }}>Kategori</Text>
          <DropDownPicker
            placeholder="Pilih Kategori"
            items={listKategori}
            defaultValue={selectKategori}
            containerStyle={{ height: responsiveHeight(7) }}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            labelStyle={{ textTransform: 'capitalize' }}
            onChangeItem={(item: any) => {
              console.log(item);
              setselectKategori(item.value);
            }}
          />
        </View>

        {
          selectAkun === 'atm' && params.tipe === 'pengeluaran' ?
          <View style={{marginTop: 20}}>
            <Text style={{ marginBottom: 5, color: '#000'  }}>Tujuan</Text>
            <DropDownPicker
              placeholder="Pilih Tujuan"
              items={[
                { label: 'Tarik Tunai', value: 'tarik tunai' },
                { label: 'Transfer', value: 'transfer' },
              ]}
              defaultValue={selectTujuan}
              containerStyle={{ height: responsiveHeight(7) }}
              style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{  }}
              dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
              onChangeItem={(item: any) => {
                console.log(item);
                setselectTujuan(item.value);
              }}
            />
          </View>
          :
          <View />
        }

        <View style={{marginTop: 20}}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
          }}>
            <Text
              style={{ marginBottom: 5, color: '#000'  }}
            >
              Nominal
            </Text>
          </View>
          <TextInputRN
            style={{ height: responsiveHeight(7),borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000' }}
            onChangeText={handleInputnominal}
            value={nominal}
            placeholder="Masukan Nominal"
            keyboardType="numeric"
            placeholderTextColor={'#000'}
          />
        </View>

        <View style={{
          flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <Text style={{ color: '#000', fontWeight: 'bold'}}>Rp. {new Intl.NumberFormat('id').format(nominal)}</Text>
          {
            tipeCatatan === 'pengeluaran' ?
            selectAkun === 'atm' ?
                parseInt(nominal) > (parseInt(param_saldo_atm) + parseInt(params.nominal)) ?
                <Text
                  style={{
                    color: 'red', fontWeight: 'bold',
                  }}
                >tidak bisa melebihi dari saldo akhir</Text>
                : <Text />
              : parseInt(nominal) > (parseInt(param_saldo_dompet) + parseInt(params.nominal)) ?
                <Text
                  style={{
                    color: 'red', fontWeight: 'bold',
                  }}
                >tidak bisa melebihi dari saldo akhir</Text>
                : <Text />
            : false
          }
        </View>

          <View style={{marginTop: 20}}>
            <Text style={{ marginBottom: 5, color: '#000'  }}>Keterangan</Text>
            <TextInputRN
              style={{ height: responsiveHeight(10), borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000' }}
              multiline={true}
              numberOfLines={5}
              onChangeText={setketerangan}
              value={keterangan}
              placeholder="Masukan Keterangan"
              keyboardType="default"
              placeholderTextColor={'#000'}
            />
          </View>

          <View style={{marginTop: 20, marginBottom: 20}}>
            <Button
              dark
              uppercase={false}
              color={'#91B3FA'}
              mode="contained"
              onPress={() => {
                setloading(true);
                editCatatan();
              }}
              contentStyle={{paddingVertical: 5}}
              style={{borderRadius: 5}}
              disabled={
                loading === true ? true :
                loadingDelete === true ? true :
                  tipeCatatan === 'pengeluaran' ?
                    selectAkun === 'atm' ?
                      parseInt(nominal) > (parseInt(param_saldo_atm) + parseInt(params.nominal)) ? true : false
                    :
                    parseInt(nominal) > (parseInt(param_saldo_dompet) + parseInt(params.nominal)) ? true :
                    false
                    : false
              }
              theme={{ colors: { disabled: 'grey' } }}
            >
              {
                loading === true ?
                // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ color: 'grey'}}>Perbarui data ..</Text>
                :
                loadingDelete === true ?
                  // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ color: 'grey' }}>Perbarui</Text>
                :
                <Text style={{ color: '#fff'}}>
                  Perbarui
                </Text>
              }
            </Button>
            <Button
              dark
              uppercase={false}
              color="#f24b51"
              mode="contained"
              onPress={() => {
                setModal();
                // setloadingDelete(true)
                // deleteCatatan(idCatatan)
              }}
              contentStyle={{ paddingVertical: 5 }}
              style={{ borderRadius: 5, marginTop: 10 }}
              disabled={
                loadingDelete === true ? true :
                loading === true ? true : false
              }
              theme={{ colors: { disabled: 'grey' } }}
            >
              {
                loadingDelete === true ?
                // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ color: 'grey' }}>Hapus data ..</Text>
                :
                loading === true ?
                // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ color: 'grey' }}>Hapus</Text>
                :
                <Text style={{ color: '#fff' }}>
                  Hapus
                </Text>
              }
            </Button>

            <ModalOpenDelete />

          </View>
      </ScrollView>
    </SafeAreaView>
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
    borderRadius: 5,
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
    fontSize: responsiveFontSize(1.7),
  },
  modalText2: {
    textAlign: 'center',
    color: 'grey',
  },
});

export default DetailScreen;
