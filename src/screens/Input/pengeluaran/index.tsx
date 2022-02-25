import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, TextInput as TextInputRN, Alert, Dimensions } from 'react-native'
import { Button, Colors, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'
import 'moment/locale/id'
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { setPage } from '../../../store/whatsPage';

import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackInputPengeluaran } from '../../../../interfaceRoutes';
import DropDown from 'react-native-paper-dropdown';
import realm, { createCatatan, getAllKategori, SALDO_SCHEMA } from '../../../../db/database';

const inputPengeluaranScreen = ({route, navigation}: StackInputPengeluaran) => {
  const dispatch: AppDispatch = useDispatch()
  const props = route.params;

  const backgroundScreen =  '#fff';
  const textInputColor = '#000';

  const [orientationScreen, setorientationScreen] = useState('');

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }

  const [date, setDate] = useState<any>(new Date())
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const [showDropDownSaldo, setShowDropDownSaldo] = useState(false);
  const [selectAkun, setselectAkun] = useState('');
  const akunList = [
    { label:"ATM", value:"atm" },
    { label:"Dompet", value:"dompet" },
  ];

  const [selectKategori, setselectKategori] = useState('');
  const [selectTujuan, setselectTujuan] = useState('');
  const [nominal, setnominal] = useState<any>('');


  const [nominalToHigh, setnominalToHigh] = useState<any>(false);
  const handleInputnominal = (text: any) => {
    if (/^\d+$/.test(text) || text === '') {
      setnominal(text)
    }
  }

  const [keterangan, setketerangan] = useState('');
  
  const [name, setName] = React.useState('');
  const [loading, setloading] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    // console.log(currentDate)
    // setShow(Platform.OS === 'android');
    setDate(currentDate);
    setShow(false)
  };

  const addCatatan = () => {
    const ID = realm.objects(SALDO_SCHEMA).length + 1;
    const data: any = {
      id: ID,
      tipe: 'pengeluaran',
      tanggal: moment(date).format('YYYY-MM-DD').toString(),
      akun: selectAkun,
      kategori: selectKategori,
      tujuan: selectTujuan,
      nominal: parseInt(nominal),
      keterangan: keterangan,
    }

    createCatatan(data)
    .then(()=>{
      setloading(false)
      dispatch(setPage({page: 'UpdateBeranda'}))
      navigation.navigate('Beranda')
    })
    .catch((err) => {
      console.log('error = ',err)
    })

    // try { 
    //   setTimeout(async () => {
    //     const saldo = await createCatatan(data)
    //     setloading(false)
    //     dispatch(setPage({page: 'UpdateBeranda'}))
    //     navigation.navigate('Beranda')
    //   }, 300);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function formatRupiah(value: any) {
    return new Intl.NumberFormat('id').format(value)
  }

  useEffect(() => {
    console.log('saldo atm : ',props.saldoAtm)
    getOrientation()
    Dimensions.addEventListener('change', () => {
      getOrientation()
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:  '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 0}}>
        <View style={{
          marginTop: 20,
        }}>
          <Text style={{ marginBottom: 5, color: '#000',}}>Tanggal</Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', 
            height: responsiveHeight(7),
          }}>
            <View style={{
              backgroundColor: 'transparent', height: '100%', width: '80%', justifyContent:'center', paddingLeft: 10, borderColor: Colors.grey600, borderWidth: 1, borderRightWidth: 0,
              borderTopLeftRadius: 5, borderBottomLeftRadius: 5
              }}
            >
              <Text style={{ color: '#000',}}>{moment(date).format('YYYY-MM-DD').toString()}</Text>
            </View>
            <View style={{ height: '100%', width: '20%',
              }}
            >
              <Button onPress={showDatepicker} style={{backgroundColor: 'transparent', borderColor: Colors.grey600, borderWidth: 1, borderLeftWidth: 0, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%',
              borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5
              }}
              >
                <IconMCI name="calendar" size={orientationScreen === 'portrait' ? responsiveFontSize(3) : responsiveFontSize(3)} color={'grey'} />
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
              flexDirection:'row', justifyContent:'space-between'
            }}>
              <Text 
                style={{ marginBottom: 5, color: '#000',}}
              >
                Saldo
              </Text>
              <Text style={{ 
                fontWeight: 'bold', color: Colors.blue400, }}>
                {selectAkun === 'atm' ? `Rp.${formatRupiah(props.saldoAtm)}` : selectAkun === 'dompet' ? `Rp.${formatRupiah(props.saldoDompet)}` : false}
              </Text>
            </View>
          <DropDownPicker
            placeholder="Pilih Saldo"
            items={[
              { label: 'Pilih Saldo', value: '', hidden: true },
              { label: "ATM", value: "atm" },
              { label: "Dompet", value: "dompet" },
            ]}
            defaultValue={selectAkun}
            containerStyle={{ height: responsiveHeight(7) }}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600}}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            labelStyle={{}}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            onChangeItem={(item: any) => {
              console.log(item)
              if (item.value === 'dompet') {
                setselectAkun(item.value)
                setselectTujuan('')
              } else {
                setselectAkun(item.value)
              }
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 5, color: '#000', }}>Kategori</Text>
          <DropDownPicker
            placeholder="Pilih Kategori"
            items={props.data}
            defaultValue={selectKategori}
            containerStyle={{ height: responsiveHeight(7), }}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            labelStyle={{textTransform: 'capitalize' }}
            onChangeItem={(item: any) => {
              console.log(item)
              setselectKategori(item.value)
            }}
          />
        </View>

        {
          selectAkun === 'atm' ?
          <View style={{marginTop: 20}}>
              <Text style={{ marginBottom: 5, color: '#000',}}>Tujuan</Text>
            <DropDownPicker
              placeholder="Pilih Tujuan"
              items={[
                { label: "Tarik Tunai", value: "tarik tunai" },
                { label: "Transfer", value: "transfer" },
              ]}
              defaultValue={selectTujuan}
              containerStyle={{ height: responsiveHeight(7) }}
              style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
              labelStyle={{}}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
              onChangeItem={(item: any) => {
                console.log(item)
                setselectTujuan(item.value)
              }}
            />
          </View>
          : 
            <View>
            </View>
        }

        <View style={{marginTop: 20}}>
          <Text 
            style={{ marginBottom: 5, color: '#000',}}
          >
            Nominal
          </Text>
          <TextInputRN
            style={{ height: responsiveHeight(7), borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000',}}
            onChangeText={handleInputnominal}
            value={nominal}
            placeholder="Masukan Nominal"
            keyboardType="numeric"
            placeholderTextColor={'#000'}
          />
          <View style={{
            flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <Text style={{ color: '#000', fontWeight: 'bold'}}>
              Rp. {new Intl.NumberFormat('id').format(nominal)}
            </Text>

            {
              selectAkun === 'atm' ?
                parseInt(nominal) > parseInt(props.saldoAtm)
                ? 
                  <Text 
                    style={{
                      color: 'red', fontWeight: 'bold',  marginTop: 2
                    }}
                  >tidak bisa melebihi dari saldo akhir</Text>
                : <Text></Text>
              : parseInt(nominal) > parseInt(props.saldoDompet)
                  ?
                  <Text
                    style={{
                      color: 'red', fontWeight: 'bold',  marginTop: 2
                    }}
                  >tidak bisa melebihi dari saldo akhir</Text>
                  : <Text></Text>
            }
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{ marginBottom: 5, color: '#000',}}>Keterangan</Text>
          <TextInputRN
            style={{ height: orientationScreen === 'portrait' ? responsiveHeight(10) : responsiveHeight(20), borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000',}}
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
            color={Colors.blue400} 
            mode="contained" 
            onPress={() => {
              setloading(true);
              addCatatan();
            }}
            contentStyle={{paddingVertical: 5}} 
            style={{borderRadius: 5}}
            disabled={
              loading === true ? true : 
              selectAkun === 'atm' ?
                parseInt(nominal) > parseInt(props.saldoAtm)
                ? true : false
              : parseInt(nominal) > parseInt(props.saldoDompet)
                ? true : false
            }
            theme={{ colors: { disabled: 'grey' } }}
          >
            {
              loading === true ? 
              // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
              <Text style={{color: 'grey'}}>Menyimpan data ..</Text>
              :
              <Text style={{color: '#fff'}}>
                Simpan
              </Text>
            }
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default inputPengeluaranScreen