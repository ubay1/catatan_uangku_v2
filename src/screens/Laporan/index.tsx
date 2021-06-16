import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Button, Colors, Divider, Modal, Portal } from 'react-native-paper';

import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackLaporan } from '../../../interfaceRoutes'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setPage } from '../../store/whatsPage';
import DropDownPicker from 'react-native-dropdown-picker';
import { getFilterCatatanByDate, getFilterCatatanByMonth } from '../../../db/database';

const LaporanScreen = ({ route, navigation }: StackLaporan) => {


  const dispatch: AppDispatch = useDispatch()
  // const laporan = useSelector((state: RootState) => state.laporan)

  const [orientationScreen, setorientationScreen] = useState('');

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }

  const [loading, setloading] = React.useState(false);
  const [selectJenisFilter, setselectJenisFilter] = useState('');
  const [tampungJenisFilter, settampungJenisFilter] = useState('');
  const [tampungJenisFilterfromDate, settampungJenisFilterfromDate] = useState<any>('');
  const [tampungJenisFiltertoDate, settampungJenisFiltertoDate] = useState<any>('');

  const [fetchAllCatatan, setfetchAllCatatan] = useState<any>(false)
  const [allCatatan, setallCatatan] = useState<any>([]);

  const [allTotal, setallTotal] = useState<number>(0);
  const [totalPemasukan, settotalPemasukan] = useState<number>(0);
  const [totalPengeluaran, settotalPengeluaran] = useState<number>(0);

  const [date, setDate] = useState<any>(new Date())
  const [fromDate, setfromDate] = useState<any>(new Date())
  const [toDate, settoDate] = useState<any>(new Date())
  const [mode1, setMode1] = useState<any>('date');
  const [show1, setShow1] = useState(false);
  const [mode2, setMode2] = useState<any>('date');
  const [show2, setShow2] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setselectJenisFilter('');
    setfromDate(new Date());
    settoDate(new Date());
  };

  /* -------------------------------------------------------------------------- */
  /*                         date picker custom tanggal                         */
  /* -------------------------------------------------------------------------- */

  const onChange1 = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || fromDate;
    setfromDate(currentDate);
    settampungJenisFilterfromDate(currentDate)
    setShow1(false)
  };

  const showMode1 = (currentMode: React.SetStateAction<string>) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const showDatepicker1 = () => {
    showMode1('date');
  };

  const onChange2 = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || toDate;
    settoDate(currentDate);
    settampungJenisFiltertoDate(currentDate)
    setShow2(false)
  };

  const showMode2 = (currentMode: React.SetStateAction<string>) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  /* -------------------------------------------------------------------------- */
  /*                        end date picker custom tanggal                      */
  /* -------------------------------------------------------------------------- */

  function formatRupiah(value: any) {
    return new Intl.NumberFormat('id').format(value)
  }

  interface IListCatatan {
    id: number, kategori: number,
    akun: string, keterangan: string, nominal: string,
    tanggal: string, tipe: string, tujuan: string,
  }
  const getCatatanByMonth = (month: any) => {
    setTimeout(() => {
      getFilterCatatanByMonth(month)
        .then((respListCatatan: any) => {
          if (respListCatatan.length === 0) {
            setallTotal(0)
            settotalPemasukan(0)
            settotalPengeluaran(0)
            ToastAndroid.showWithGravity(
              "Data tidak ditemukan",
              ToastAndroid.LONG,
              ToastAndroid.LONG
            );
            setallCatatan([])
          } else {
            const all_total: any[] = [];
            const total_pemasukan: any[] = [];
            const total_pengeluaran: any[] = [];
            respListCatatan.map((item: IListCatatan) => {
              if (item.tipe === 'pemasukan') {
                total_pemasukan.push(parseInt(item.nominal))
                all_total.push(parseInt(item.nominal))
              } else {
                total_pengeluaran.push(parseInt(item.nominal))
                all_total.push(parseInt(item.nominal))
              }
            })
  
            const reduce_all_total = all_total.reduce((a, b) => a + b, 0)
            const reduce_total_pemasukan = total_pemasukan.reduce((a, b) => a + b, 0)
            const reduce_total_pengeluaran = total_pengeluaran.reduce((a, b) => a + b, 0)
  
            setallCatatan([])
            setallCatatan(respListCatatan);
            setallTotal(reduce_all_total)
            settotalPemasukan(reduce_total_pemasukan)
            settotalPengeluaran(reduce_total_pengeluaran)
          }
  
          setfetchAllCatatan(false)
        })
        .catch((err) => {
          console.log('error = ', err)
          setfetchAllCatatan(false)
        })
    }, 500);
    
  }

  const getCatatanByDate = () => {
    setTimeout(() => {
      getFilterCatatanByDate(fromDate, toDate)
        .then((respListCatatan: any) => {
          console.log('data catatan by date = ', respListCatatan)
          setVisible(false)
          setfromDate(new Date());
          settoDate(new Date());
          setloading(false)
          setselectJenisFilter('');
  
          if (respListCatatan.length === 0) {
            setallTotal(0)
            settotalPemasukan(0)
            settotalPengeluaran(0)
            ToastAndroid.showWithGravity(
              "Data tidak ditemukan",
              ToastAndroid.LONG,
              ToastAndroid.LONG
            );
            setallCatatan([])
          } else {
            const all_total: any[] = [];
            const total_pemasukan: any[] = [];
            const total_pengeluaran: any[] = [];
            respListCatatan.map((item: IListCatatan) => {
              if (item.tipe === 'pemasukan') {
                total_pemasukan.push(parseInt(item.nominal))
                all_total.push(parseInt(item.nominal))
              } else {
                total_pengeluaran.push(parseInt(item.nominal))
                all_total.push(parseInt(item.nominal))
              }
            })
  
            const reduce_all_total = all_total.reduce((a, b) => a + b, 0)
            const reduce_total_pemasukan = total_pemasukan.reduce((a, b) => a + b, 0)
            const reduce_total_pengeluaran = total_pengeluaran.reduce((a, b) => a + b, 0)
  
            setallCatatan([])
            setallCatatan(respListCatatan);
            setallTotal(reduce_all_total)
            settotalPemasukan(reduce_total_pemasukan)
            settotalPengeluaran(reduce_total_pengeluaran)
          }
  
          setfetchAllCatatan(false)
          setloading(false)
        })
        .catch((err) => {
          console.log('error = ', err)
          setfetchAllCatatan(false)
          setloading(false)
        })
    }, 500);

  }

  useEffect(() => {
    if (selectJenisFilter === 'custom_tanggal') {
      showModal()
    } else if (selectJenisFilter === 'bulan_ini') {
      setfetchAllCatatan(true)
      getCatatanByMonth(moment().format('M'))
    } else if (selectJenisFilter === 'bulan_lalu') {
      setfetchAllCatatan(true)
      getCatatanByMonth(moment().subtract(1, 'months').format('M'))
    }
  }, [selectJenisFilter])

  React.useEffect(() => {
    navigation.addListener('focus', e => {
      dispatch(setPage({ page: 'Laporan' }))
    });
  }, [navigation]);

  useEffect(() => {
    getOrientation()
    Dimensions.addEventListener('change', () => {
      getOrientation()
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{
        // backgroundColor: 'red', 
        height: responsiveHeight(100)
      }}
      >
        <View style={{
          marginHorizontal: 10,
          marginTop: 20,
          marginBottom: 20,
          flex: 1,
          height: responsiveHeight(80),
          // backgroundColor: 'red'
        }}
        >
          <DropDownPicker
            placeholder="Pilih Tipe Laporan"
            items={[
              { label: "Pilih Tipe Laporan", value: "", hidden: true },
              { label: "Bulan Ini", value: "bulan_ini" },
              { label: "Bulan Lalu", value: "bulan_lalu" },
              { label: "Atur Tanggal Sendiri", value: "custom_tanggal" },
            ]}
            defaultValue={selectJenisFilter}
            containerStyle={{ height: responsiveHeight(7) }}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            onChangeItem={(item: any) => {
              // console.log(item)
              setselectJenisFilter(item.value)
              settampungJenisFilter(item.value)
            }}
          />

          <View
            style={{
              // position: 'absolute', zIndex: 0,
              // top: 70, width: '100%'
              marginTop: 20
            }}
          >
            {
              fetchAllCatatan === true ?
                <ActivityIndicator animating={true} color={Colors.blue400} style={{ marginTop: 20, }} />
                :
                <View>
                  <View style={{
                    borderLeftColor: Colors.blue300,
                    ...styles.style_total,
                    justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  >
                    <View>
                      <Text style={{}}>
                        Total Seluruh Saldo:
                      </Text>
                      <Text style={{ fontWeight: 'bold' }}>Rp.{formatRupiah(allTotal)}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderLeftColor: Colors.green300,
                      ...styles.style_total,
                      justifyContent: 'space-between', alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <View>
                      <Text style={{}}>
                        Total Pemasukan:
                      </Text>
                      <Text style={{ fontWeight: 'bold' }}>Rp.{formatRupiah(totalPemasukan)}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderLeftColor: Colors.red300,
                      ...styles.style_total,
                      justifyContent: 'space-between', alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <View>
                      <Text style={{}}>
                        Total Pengeluaran:
                      </Text>
                      <Text style={{ fontWeight: 'bold' }}>Rp.{formatRupiah(totalPengeluaran)}</Text>
                    </View>
                  </View>
                </View>
            }

            <View style={{
              justifyContent: 'center', alignItems: 'center',
              flexDirection: 'row', marginVertical: 20, marginHorizontal: 0
            }}>
              <View style={{
                marginTop: 10, borderColor: Colors.grey600, borderWidth: 2,
                borderStyle: 'dotted', borderRadius: 1, width: '33.3333333333%'
              }}
              />
              <Text style={{ width: '33.3333333333%', color: Colors.black, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>List Catatan</Text>
              <View style={{
                marginTop: 10, borderColor: Colors.grey600, borderWidth: 2,
                borderStyle: 'dotted', borderRadius: 1, width: '33.3333333333%'
              }}
              />
            </View>

          </View>

          {
            fetchAllCatatan === true ?
              <ActivityIndicator 
                animating={true} color={Colors.blue400} style={{ marginTop: 20, }} 
              />
            :
            allCatatan.length === 0 ?
              <View />
              :
              <ScrollView style={{marginHorizontal: 0}}>
                {
                  allCatatan.map((item: any, index: any) => {
                    return(
                      <View key={`item-${item.id}`}>
                          <View
                            style={{
                              backgroundColor: '#fff',
                              flexDirection: 'row', justifyContent: 'space-between',
                              height: responsiveHeight(7),
                            }}
                          >
                            <View style={{ flexDirection: 'row', }}>
                              <View style={{ justifyContent: 'space-between', }}>
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
                                        backgroundColor: item.tipe === 'pemasukan' ? Colors.green50 : Colors.red50, marginLeft: 10, fontWeight: 'bold', textTransform: 'uppercase', color: item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400, paddingHorizontal: 5
                                      }}>Tarik Tunai</Text>
                                      : <Text></Text>
                                  }
                                </View>
                              </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                              <View style={{ marginLeft: 10, height: '100%' }}>
                                <View style={{ justifyContent: 'center', height: '50%' }}>
                                  <Text style={{
                                    fontWeight: 'bold', textTransform: 'capitalize', color: item.tipe === 'pemasukan' ? Colors.green400 : Colors.red400
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
                          </View>
                          {/* <View style={{
                            marginBottom: 10, borderColor: Colors.grey600, borderWidth: 1.5,
                            borderStyle: 'dotted', borderRadius: 1,
                          }}
                          /> */}
                          <Divider 
                            style={{
                              marginBottom: 5, borderColor: Colors.grey300, borderWidth: .3,
                            }}
                          />
                        </View>
                    )
                  })
                }
              </ScrollView>
          }
        </View>
      </View>

      {/* modal custom tanggal */}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 5 }} style={{ marginHorizontal: 20 }}>
          <Text style={{ marginBottom: 5, color: '#000' }}>Dari Tanggal</Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 55,
          }}>
            <View style={{
              ...styles.border_text,
            }}
            >
              <Text style={{ color: '#000' }}>{moment(fromDate).format('YYYY-MM-DD').toString()}</Text>
            </View>
            <View style={{
              height: '100%', width: '20%',
            }}
            >
              <Button onPress={showDatepicker1}
                style={{
                  ...styles.border_calender,
                }}
              >
                <IconMCI name="calendar" size={25} color={Colors.black} />
              </Button>
            </View>
            {show1 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                maximumDate={new Date()}
                mode={mode1}
                is24Hour={true}
                display="default"
                onChange={onChange1}
              />
            )}
          </View>

          <Text style={{ marginBottom: 5, marginTop: 10, color: '#000' }}>Sampai Tanggal</Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 55,
          }}>
            <View style={{
              ...styles.border_text
            }}
            >
              <Text style={{ color: '#000' }}>{moment(toDate).format('YYYY-MM-DD').toString()}</Text>
            </View>
            <View style={{
              height: '100%', width: '20%',
            }}
            >
              <Button onPress={showDatepicker2}
                style={{
                  ...styles.border_calender,
                }}
              >
                <IconMCI name="calendar" size={25} color={Colors.black} />
              </Button>
            </View>
            {show2 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toDate}
                maximumDate={new Date()}
                mode={mode2}
                is24Hour={true}
                display="default"
                onChange={onChange2}
              />
            )}
          </View>
          <Button
            dark
            uppercase={false}
            color={Colors.blue400}
            mode="contained"
            onPress={() => {
              setloading(true)
              getCatatanByDate()
              // setTimeout(() => {
              //   setloading(false)
              // }, 2000);
            }}
            contentStyle={{ paddingVertical: 5 }}
            style={{ borderRadius: 5, marginTop: 10 }}
            disabled={loading === true ? true : false}
            theme={{ colors: { disabled: 'grey' } }}
          >
            {
              loading === true ?
                // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ fontSize: responsiveFontSize(2), color: 'grey' }}>Mengirim data ..</Text>
                :
                <Text style={{ fontSize: responsiveFontSize(2), color: '#fff' }}>
                  Kirim
                </Text>
            }
          </Button>
        </Modal>
      </Portal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  border_text: {
    backgroundColor: Colors.white,
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 10,
    borderColor: Colors.grey600,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  border_calender: {
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    height: '100%', width: '100%',
    borderColor: Colors.grey600,
    borderWidth: 1, borderLeftWidth: 0,
    borderTopRightRadius: 5, borderBottomRightRadius: 5,
    borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
  },
  style_total: {
    backgroundColor: '#fff', padding: 10,
    flexDirection: 'row', alignItems: 'flex-start',
    borderLeftWidth: 7,
    borderRightColor: Colors.grey600, borderRightWidth: 1,
    borderTopColor: Colors.grey600, borderTopWidth: 1,
    borderBottomColor: Colors.grey600, borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 5, elevation: 0
  }
})

export default LaporanScreen
