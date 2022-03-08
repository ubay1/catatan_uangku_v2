/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput as TextInputRN, Alert, Dimensions } from 'react-native';
import { Button, Colors, Divider, FAB, Menu, Provider, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/id';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setPage } from '../../../store/whatsPage';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from 'react-native-paper-dropdown';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { StackInputPemasukan } from '../../../../interfaceRoutes';
import realm, { createCatatan, getAllKategori, SALDO_SCHEMA } from '../../../../db/database';
import { setHideTab, setShowTab } from '../../../store/navigationRedux';
import styles from '../../../assets/styles/global';


// const inputPemasukanScreen = (props: {data: any}) => {
const inputPemasukanScreen = ({route, navigation}: StackInputPemasukan) => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setHideTab());
    navigation.addListener('beforeRemove', (param: any) => {
      console.log('back to admin');
      dispatch(setShowTab());
    });
  }, [navigation]);

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
  };

  const [showDropDownSaldo, setShowDropDownSaldo] = useState(false);
  const [selectAkun, setselectAkun] = useState('');
  const akunList = [
    { label:'ATM', value:'atm' },
    { label:'Dompet', value:'dompet' },
  ];

  const [date, setDate] = useState<any>(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const [showDropDownKategori, setShowDropDownKategori] = useState(false);
  const [selectKategori, setselectKategori] = useState('');
  const [kategoriList, setkategoriList] = useState<any[]>([]);

  const [nominal, setnominal] = useState<any>('');
  const handleInputnominal = (text: any) => {
    if (/^\d+$/.test(text) || text === '') {
      setnominal(text);
    }
  };

  const [keterangan, setketerangan] = useState('');

  const [name, setName] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [fetchListKategori, setfetchListKategori] = useState<any>(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const addCatatan = () => {
    const ID = realm.objects(SALDO_SCHEMA).length + 1;
    const data: any = {
      id: ID,
      tipe: 'pemasukan',
      tanggal: moment(date).format('YYYY-MM-DD').toString(),
      akun: selectAkun,
      kategori: selectKategori,
      tujuan: '',
      nominal: parseInt(nominal),
      keterangan: keterangan,
    };

    createCatatan(data)
    .then(()=>{
      setloading(false);
      dispatch(setPage({page: 'updateHome'}));
      navigation.navigate('Beranda');
    })
    .catch((err) => {
      console.log('error = ',err);
    });

    // try {
    //   setTimeout(async () => {
    //     const saldo = await createCatatan(data)
    //     setloading(false)
    //     dispatch(setPage({page: 'updateHome'}))
    //     navigation.navigate('Beranda')
    //   }, 300);
    // } catch (error) {
    //   console.log(error);
    // }
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

  useEffect(() => {
    console.log(props);
    setkategoriList(props.data);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:  '#fff'}}>
      <ScrollView style={{marginHorizontal: 10, marginBottom: 0}}>
        <View style={{justifyContent: 'center', marginTop: 40, alignItems: 'center', flexDirection: 'row'}}>
          <FAB
            style={{...styles.btnFab, position: 'absolute', top: -12, left: 0, backgroundColor: Colors.pink400}}
            icon={() => {
              return <IconMCI name="arrow-left" color={Colors.white} size={23} />;
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
          <View>
            <Text style={{fontSize: 20}}>Input Pemasukan</Text>
          </View>
        </View>

        <View style={{
          marginTop: 40,
        }}>

          <Text style={{marginBottom: 5, color: '#000' }}>Tanggal</Text>
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
              <Text style={{ color: '#000' }}>{moment(date).format('YYYY-MM-DD').toString()}</Text>
            </View>
            <View style={{ height: '100%', width: '20%'}}
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
                maximumDate={new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View style={{
              flexDirection:'row', justifyContent:'space-between',
            }}>
              <Text
                style={{ marginBottom: 5, color: '#000'}}
              >
                Saldo
              </Text>
              <Text style={{
                fontWeight: 'bold', color: Colors.blue400 }}>
                {selectAkun === 'atm' ? `Rp.${formatRupiah(props.saldoAtm)}` : selectAkun === 'dompet' ? `Rp.${formatRupiah(props.saldoDompet)}` : false}
              </Text>
            </View>
          <DropDownPicker
            placeholder="Pilih Saldo"
            items={[
              { label: 'Pilih Saldo', value: '', hidden: true },
              { label: 'ATM', value: 'atm' },
              { label: 'Dompet', value: 'dompet' },
            ]}
            defaultValue={selectAkun}
            containerStyle={{ height: responsiveHeight(7)}}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{}}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            onChangeItem={(item: any)=> {
              setselectAkun(item.value);
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 5, color: '#000'  }}>Kategori</Text>
          <DropDownPicker
            placeholder="Pilih Kategori"
            items={kategoriList}
            defaultValue={selectKategori}
            containerStyle={{ height: responsiveHeight(7)}}
            style={{ backgroundColor: '#fff', borderColor: Colors.grey600 }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{textTransform: 'capitalize' }}
            dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600 }}
            onChangeItem={(item: any) => {
              setselectKategori(item.value);
            }}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{ marginBottom: 5, color: '#000' }}>Nominal</Text>
          <TextInputRN
            style={{ height: responsiveHeight(7), borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000', paddingVertical: 10 }}
            onChangeText={handleInputnominal}
            value={nominal}
            placeholder="Masukan Nominal"
            keyboardType="numeric"
            placeholderTextColor={'#000'}
          />
        </View>
        <Text style={{  color: '#000', fontWeight:'bold'}}>Rp. {new Intl.NumberFormat('id').format(nominal)}</Text>

        <View style={{marginTop: 20}}>
          <Text style={{ marginBottom: 5, color: '#000' }}>Keterangan</Text>
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
            color={Colors.blue400}
            mode="contained"
            onPress={() => {
              setloading(true);
              addCatatan();
            }}
            contentStyle={{paddingVertical: 5}}
            style={{borderRadius: 10}}
            disabled={loading === true ? true : false}
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
  );
};

export default inputPemasukanScreen;
