import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Colors, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux'
import { StackListLaporan } from '../../../interfaceRoutes'
import { AppDispatch } from '../../store'
import { setPage } from '../../store/whatsPage'
import { IListKategori } from '../Home'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const ListLaporanScreen = ({ route, navigation }: StackListLaporan) => {
  const dispatch: AppDispatch = useDispatch()
  
  const params_tipe = route.params.tipe
  const params_tipe2 = route.params.tipe2
  const params_fromDate = route.params.fromDate
  const params_toDate = route.params.toDate

  const [orientationScreen, setorientationScreen] = useState('');

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }

  const [pemasukan, setpemasukan] = useState(0)
  const [pemasukanATM, setpemasukanATM] = useState(0)
  const [pemasukanDompet, setpemasukanDompet] = useState(0)
  const [pengeluaranATM, setpengeluaranATM] = useState(0)
  const [pengeluaranDompet, setpengeluaranDompet] = useState(0)
  const [totalsaldo, settotalsaldo] = useState(0)
  const [saldoatm, setsaldoatm] = useState(0)
  const [saldodompet, setsaldodompet] = useState(0)
  const [fetchSaldo, setfetchSaldo] = useState<any>(false)

  const [loading, setloading] = React.useState(false);
  const [fetch5Catatan, setfetch5Catatan] = useState<any>(false)
  const [limaCatatan, setlimaCatatan] = useState<any[]>([])
  const [listKategori, setlistKategori] = useState<any>([]);
  const [fetchAllCatatan, setfetchAllCatatan] = useState<any>(false)
  const [allCatatan, setallCatatan] = useState<any[]>([])

  function formatRupiah(value: any) {
    return new Intl.NumberFormat('id').format(value)
  }

  useEffect(() => {
    console.log('testest', params_fromDate, params_toDate)
  }, [navigation,])

  useEffect(() => {
    let pemasukan_atm: any[] = []
    let pemasukan_dompet: any[] = []
    let pengeluaran_atm: any[] = []
    let pengeluaran_dompet: any[] = []

    if (allCatatan.length !== 0) {
      allCatatan.map((item: any) => {
        if (item.akun === 'atm') {
          if (item.tipe === 'pemasukan') {
            pemasukan_atm.push(parseInt(item.nominal))
          } else {
            if (item.tujuan === 'tarik tunai') {
              pemasukan_dompet.push(parseInt(item.nominal))
              pengeluaran_atm.push(parseInt(item.nominal))
            } else {
              pengeluaran_atm.push(parseInt(item.nominal))
            }
          }
        } else {
          if (item.tipe === 'pemasukan') {
            pemasukan_dompet.push(parseInt(item.nominal))
          } else {
            pengeluaran_dompet.push(parseInt(item.nominal))
          }
        }
      })

      const totalPemasukanAtm = pemasukan_atm.reduce((a, b) => a + b, 0)
      const totalPemasukanDompet = pemasukan_dompet.reduce((a, b) => a + b, 0)
      const totalPengeluaranAtm = pengeluaran_atm.reduce((a, b) => a + b, 0)
      const totalPengeluaranDompet = pengeluaran_dompet.reduce((a, b) => a + b, 0)
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet

      // console.log('pemasukan', totalPemasukan)
      // console.log('pengeluaranATM', totalPengeluaranATM)
      // console.log('atm', totalAtm)
      // console.log('dompet', totalDompet)

      // setpemasukan(totalPemasukan)
      setpemasukanATM(totalPemasukanAtm)
      setpengeluaranATM(totalPengeluaranAtm)
      setpemasukanDompet(totalPemasukanDompet)
      setpengeluaranDompet(totalPengeluaranDompet)
      settotalsaldo(totalSaldo)
      setsaldoatm(totalSaldoAtm)
      setsaldodompet(totalSaldoDompet)
      setfetchSaldo(true)
    }
    else {
      const totalPemasukanAtm = 0
      const totalPemasukanDompet = 0
      const totalPengeluaranAtm = 0
      const totalPengeluaranDompet = 0
      const totalSaldo = (totalPemasukanAtm + totalPemasukanDompet) - (totalPengeluaranAtm + totalPengeluaranDompet);
      const totalSaldoAtm = totalPemasukanAtm - totalPengeluaranAtm
      const totalSaldoDompet = totalPemasukanDompet - totalPengeluaranDompet

      // console.log('pemasukan', totalPemasukan)
      // console.log('pengeluaranATM', totalPengeluaranATM)
      // console.log('atm', totalAtm)
      // console.log('dompet', totalDompet)

      // setpemasukan(totalPemasukan)
      setpemasukanATM(totalPemasukanAtm)
      setpengeluaranATM(totalPengeluaranAtm)
      setpemasukanDompet(totalPemasukanDompet)
      setpengeluaranDompet(totalPengeluaranDompet)
      settotalsaldo(totalSaldo)
      setsaldoatm(totalSaldoAtm)
      setsaldodompet(totalSaldoDompet)
      setfetchSaldo(true)
    }
  }, [allCatatan])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{
        // backgroundColor: 'red', 
        height: responsiveHeight(100)
      }}
      >
        <View style={{ flex: 1, marginHorizontal: 10, }}>
          <View style={{
            // height: responsiveHeight(100), 
            marginTop: 20,
            marginBottom: 20,
          }}
          >
            {
              fetchAllCatatan === false ?
                <ActivityIndicator animating={true} color={Colors.blue400} style={{ marginTop: 20, }} />
                :
                allCatatan.length === 0 ?
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    // height: orientationScreen === 'portrait' ? responsiveHeight(24) : responsiveHeight(45) ,
                    // width: '100%', 
                    // backgroundColor: 'red'
                  }}>
                    <Text style={{ marginTop: 10, color: '#000', fontSize: responsiveFontSize(1.7) }}>Data tidak ditemukan</Text>
                  </View>
                  :
                  allCatatan.map((item: any) => {
                    return (
                      <View key={`item-${item.id}`} style={{}}>
                        <View
                          style={{
                            backgroundColor: '#fff',
                            flexDirection: 'row', justifyContent: 'space-between',
                            height: orientationScreen === 'landscape' ? responsiveHeight(14) : responsiveHeight(7),
                          }}
                        >
                          <View style={{
                            flexDirection: 'row',
                          }}>
                            {/* <View style={{backgroundColor: '#D0D9F9', justifyContent: 'center',padding: 5, borderRadius: 10,}}>
                        <IconMCI name={item.akun === 'atm' ? "credit-card": "bag-personal"} size={30} color="#5157CB"/>
                      </View> */}

                            <View style={{
                              // marginLeft: 10,
                              justifyContent: 'space-between',
                            }}
                            >
                              <View style={{ justifyContent: 'center', height: '50%' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }}
                                >
                                  {item.keterangan}
                                </Text>
                              </View>
                              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: '50%' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.5), textTransform: 'uppercase', color: '#c2c2c2' }}
                                >
                                  {item.akun}
                                </Text>
                                {
                                  item.tujuan === 'tarik tunai' ?
                                    <Text style={{ backgroundColor: '#D0D9F9', marginLeft: 10, fontWeight: 'bold', fontSize: responsiveFontSize(1.5), textTransform: 'uppercase', color: Colors.blue400, padding: 2 }}>Tarik Tunai</Text>
                                    : <Text></Text>
                                }
                              </View>
                            </View>
                          </View>

                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                              <IconMCI name={item.tipe === 'pemasukan' ? 'arrow-down' : 'arrow-up'}
                                color={item.tipe === 'pemasukan' ? '#60F1AC' : '#FF8888'}
                                size={responsiveFontSize(2)}
                              />
                            </View>
                            <View style={{ marginLeft: 10, height: '100%' }}>
                              <View style={{ justifyContent: 'center', height: '50%' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: 'bold', textTransform: 'capitalize', color: '#000' }}>
                                  Rp. {formatRupiah(item.nominal)}
                                </Text>
                              </View>
                              <View style={{ justifyContent: 'center', height: '50%' }}>
                                <Text style={{ fontSize: responsiveFontSize(1.5), textTransform: 'uppercase', color: '#c2c2c2', textAlign: 'right' }}
                                >{moment(item.tanggal).format('YYYY/MM/DD')}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <Divider style={{
                          marginBottom: 5, borderColor: '#E3E3E3', borderWidth: .3,
                        }}
                        />
                      </View>
                    )
                  })
            }

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListLaporanScreen
