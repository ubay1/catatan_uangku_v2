import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Dimensions, Alert, SafeAreaView, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Button, Colors } from 'react-native-paper'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { useDispatch } from 'react-redux'
import Database, { createKategori, updateKategori } from '../../../../db/database'
import { AppDispatch } from '../../../store'
import loading from '../../../store/loading'
import { setPage } from '../../../store/whatsPage'
import realm, { createCatatan, getAllKategori } from '../../../../db/database';

interface IDataKategori {
  id: any,
  nama_kategori: any,
  tipe_kategori: any,
}

const InputKategori = (props: {edit: boolean, dataProps?: IDataKategori}) => {
  
  const dispatch: AppDispatch = useDispatch()
  const [orientationScreen, setorientationScreen] = useState('');

  const [tipeKategori, settipeKategori] = useState('');
  const [namaKategori, setnamaKategori] = useState('');
  const [loading, setloading] = React.useState(false);

  const getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setorientationScreen('portrait');
    }
    else {
      setorientationScreen('landscape');
    }
  }

  const addKategori = () => {
    if (namaKategori === '' || tipeKategori === '') {
      Alert.alert('harap isi semua form yang disediakan')
      setloading(false);
    } else {
      const ID = realm.objects('kategori').length + 1;
      const data: any = {
        id: ID,
        nama_kategori: namaKategori,
        tipe_kategori: tipeKategori,
      }

      createKategori(data)
      .then(()=>{
        setnamaKategori('');
        settipeKategori('')
        setloading(false);
        dispatch(setPage({ page: 'Setelan' }))
      })
      .catch((err) => {
        console.log('error = ',err)
      })

      // try {
      //   setTimeout(async () => {
      //     const respCreateKategori = await createKategori(data)
      //     setnamaKategori('');
      //     settipeKategori('')
      //     setloading(false);
      //     dispatch(setPage({ page: 'Setelan' }))
      //   }, 300);
      // } catch (error) {
      //   console.log(error);
      //   setloading(false);
      // }
    }
  }
  
  const editKategori = () => {
    if (namaKategori === '') {
      Alert.alert('harap isi semua form yang disediakan')
      setloading(false);
    } else {
      const data: any = {
        id: parseInt(props.dataProps?.id),
        nama_kategori: namaKategori,
      }
      updateKategori(data)
      .then(()=>{
        setnamaKategori('');
        settipeKategori('')
        setloading(false);
        dispatch(setPage({ page: 'Setelan' }))
      })
      .catch((err) => {
        console.log('error = ',err)
      })

      // try {
      //   const respUpdateKategori = updateKategori(data)
      //   console.log('aa = ',respUpdateKategori)
      //   setnamaKategori('');
      //   settipeKategori('')
      //   setloading(false);
      //   dispatch(setPage({ page: 'Setelan' }))
      // } catch (error) {
      //   console.log(error);
      //   setloading(false);
      // }
    }
  }

  useEffect(() => {
    console.log('data props : ',props)
    if (props.edit === true) {
      settipeKategori(props.dataProps?.tipe_kategori)
      setnamaKategori(props.dataProps?.nama_kategori)
    } 
  }, [props])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20, backgroundColor:  '#fff' }}>
      <ScrollView
        style={{
          marginHorizontal: 10,
          marginBottom: 30
          // marginTop: orientationScreen === 'landscape' ? 20 : 20,
          // marginBottom: orientationScreen === 'landscape' ? 20 : 20,
        }}
      >
        {
          props.edit === false ?
          <View style={{ marginTop: 20 }}>
            <Text style={{ marginBottom: 5, color: '#000',  }}>Tipe Kategori</Text>
            <DropDownPicker
              placeholder="Pilih Tipe Kategori"
              items={[
                { label: 'Pilih Tipe Kategori', value: '', hidden: true },
                { label: "Pemasukan", value: "pemasukan" },
                { label: "Pengeluaran", value: "pengeluaran" },
              ]}
              defaultValue={tipeKategori}
              containerStyle={{ height: responsiveHeight(7)}}
              style={{ backgroundColor: '#fff', borderColor: Colors.grey600, borderRadius: 5}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#fafafa', borderColor: Colors.grey600, }}
              labelStyle={{  }}
              onChangeItem={(item: any) => {
                console.log(item)
                settipeKategori(item.value)
              }}
            />
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 5, color: '#000',  }}>Nama Kategori</Text>
              <TextInput
                style={{ 
                  // height: orientationScreen === 'portrait' ? responsiveHeight(0) : responsiveHeight(14), 
                  borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000',  }}
                // multiline={true}
                // numberOfLines={5}
                onChangeText={setnamaKategori}
                value={namaKategori}
                placeholder="Masukan Nama Kategori"
                keyboardType="default"
                placeholderTextColor={'#000'}
              />
            </View>
          </View>
          :
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 5, color: '#000',  }}>Nama Kategori</Text>
              <TextInput
                style={{ 
                  // height: orientationScreen === 'portrait' ? responsiveHeight(0) : responsiveHeight(14), 
                  borderColor: Colors.grey600, paddingLeft: 10, borderWidth: 1, borderRadius: 5, color: '#000',  }}
                // multiline={true}
                // numberOfLines={5}
                onChangeText={setnamaKategori}
                value={namaKategori}
                placeholder="Masukan Nama Kategori"
                keyboardType="default"
                placeholderTextColor={'#000'}
              />
          </View>
        }

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button
            dark
            uppercase={false}
            color={Colors.blue400}
            mode="contained"
            onPress={() => {
              setloading(true)
              props.edit === false ?
              addKategori()
              : editKategori()
            }}
            contentStyle={{ paddingVertical: 5 }}
            style={{ borderRadius: 5 }}
            disabled={loading === true ? true : false}
            theme={{ colors: { disabled: 'grey' } }}
          >
            {
              loading === true ?
                // <ActivityIndicator size="large" color="#fff" style={{position: 'absolute', zIndex: 100}}/>
                <Text style={{ color: 'grey' }}>Menyimpan data ..</Text>
                :
                <Text style={{ color: '#fff' }}>
                  {
                    props.edit === false ? 'Simpan' : 'Perbarui'
                  } 
                </Text>
            }
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default InputKategori
