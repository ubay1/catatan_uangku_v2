/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import moment from 'moment';
import Realm from 'realm';

// Declare Schema

export const SALDO_SCHEMA = 'saldo';
export const SaldoSchema = {
  name: SALDO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int?',
    tipe: 'string',
    tanggal: 'date',
    akun: 'string',
    tujuan: 'string',
    nominal: 'int',
    keterangan: 'string',
    kategori: 'string',
  },
};

export const KATEGORI_SCHEMA = 'kategori';
export const KategoriSchema = {
  name: KATEGORI_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int?',
    nama_kategori: 'string',
    tipe_kategori: 'string',
  },
};

// Create realm
let realm = new Realm({
  schema: [SaldoSchema, KategoriSchema],
  schemaVersion: 1,
});

const dbOptions = {
  schema : [SaldoSchema, KategoriSchema],
  schemaVersion : 1,
};

/* -------------------------------------------------------------------------- */
/*                                crud catatan                                */
/* -------------------------------------------------------------------------- */
// export const createCatatan =  (data: any) => {
//     realm.write(() => {
//       const saldo = realm.create(SALDO_SCHEMA, {
//         id: data.id,
//         tipe: data.tipe,
//         tanggal: data.tanggal,
//         akun: data.akun,
//         tujuan: data.tujuan,
//         nominal: data.nominal,
//         keterangan: data.keterangan,
//         kategori: data.kategori,
//       });
//     });

//     return 'sukses menambah data'
// };

export const createCatatan =  (data: any) => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
    realm.write(() => {
      realm.create(SALDO_SCHEMA, {
        id: data.id,
        tipe: data.tipe,
        tanggal: data.tanggal,
        akun: data.akun,
        tujuan: data.tujuan,
        nominal: data.nominal,
        keterangan: data.keterangan,
        kategori: data.kategori,
      });
      resolve();
    });
  }).catch((error) => reject(error));
});

// export const getAllCatatan = () => {
//   let allSaldo = realm.objects(SALDO_SCHEMA).sorted("id", true);
//   return allSaldo;
// };

export const getAllCatatan = () => new Promise((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      let allCatatan = realm.objects(SALDO_SCHEMA).sorted('id', true);
      resolve(allCatatan);
  }).catch((error) => {
      reject(error);
  });
});

export const getFilterCatatanByMonth = (value?: any) => new Promise((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      let data: any = realm.objects(SALDO_SCHEMA);
      const filtered: any[] = [];
      data.map((item: any) => {
        if (moment(item.tanggal).format('M') === value) {
          filtered.push(item);
        }
      });
      resolve(filtered);
  }).catch((error) => {
      reject(error);
  });
});

const formatDate = (date: any) => {
  let new_date = new Date(date);
  new_date.setDate(new_date.getDate() + 1);
  new_date.setHours(0);
  new_date.setMinutes(0);
  new_date.setSeconds(0);
  new_date.setMilliseconds(0);
  new_date.setUTCHours(0);

  return new_date;
};

export const getFilterCatatanByDate = (start_date?: any, end_date?: any) =>
new Promise((resolve, reject) => {

  const toIsoFromDate = formatDate(start_date);
  const toIsoToDate = formatDate(end_date);

  console.log(toIsoFromDate, '-', toIsoToDate);

  Realm.open(dbOptions).then(realm => {
      let data: any = realm.objects(SALDO_SCHEMA).filtered('tanggal >= $0 && tanggal <= $1', toIsoFromDate, toIsoToDate);

      resolve(data);
  }).catch((error) => {
      reject(error);
  });
});


// export const updateCatatan =  (data: any) => {
//   realm.write(() => {
//     const kategori: any = realm.create(SALDO_SCHEMA, {
//         id: data.id,
//         tipe: data.tipe,
//         tanggal: data.tanggal,
//         akun: data.akun,
//         tujuan: data.tujuan,
//         nominal: data.nominal,
//         keterangan: data.keterangan,
//         kategori: data.kategori,
//       }, true);
//   });

//   return 'data catatan telah diperbarui';
// };

export const updateCatatan = (data: any) => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      realm.write(() => {
          let catatan: any = realm.objectForPrimaryKey(SALDO_SCHEMA, data.id);
          catatan.tipe = data.tipe;
          catatan.tanggal = data.tanggal;
          catatan.akun = data.akun;
          catatan.tujuan = data.tujuan;
          catatan.nominal = data.nominal;
          catatan.keterangan = data.keterangan;
          catatan.kategori = data.kategori;
          resolve();
      });
  }).catch((error) => reject(error));
});

export const deleteCatatan = (id: any) => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      realm.write(() => {
        let deletingTodoList = realm.objectForPrimaryKey(SALDO_SCHEMA, id);
        realm.delete(deletingTodoList);
        resolve();
      });
  }).catch((error) => reject(error));
});

// export const deleteAllCatatan =  () => {
//   realm.write(()=>{
//     let all = realm.delete(realm.objects(SALDO_SCHEMA));
//     return all;
//   })
// };

export const deleteAllCatatan = () => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      realm.write(() => {
          let allTodoLists = realm.objects(SALDO_SCHEMA);
          realm.delete(allTodoLists);
          resolve();
      });
  }).catch((error) => reject(error));
});

export const createDefaultKategori =  () => new Promise((resolve, reject) => {
  const length = realm.objects(KATEGORI_SCHEMA).length;
  const ID = realm.objects(KATEGORI_SCHEMA).length + 1;
  Realm.open(dbOptions).then(realm => {
      if (length < 1) {
        realm.write(() => {
          realm.create(KATEGORI_SCHEMA, {
            id: ID,
            nama_kategori: 'gajian',
            tipe_kategori: 'pemasukan',
          });

          resolve('data default kategori dibuat');
        });
      } else {
        resolve('data default sudah ada');
      }
  }).catch((error) => reject(error));
});

export const createKategori =  (data: any) => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
    realm.write(() => {
      realm.create(KATEGORI_SCHEMA, {
        id: data.id,
        nama_kategori: data.nama_kategori,
        tipe_kategori: data.tipe_kategori,
      });

      resolve();
    });
  }).catch((error) => reject(error));
});

export const getAllKategori = () => new Promise((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
      let allKategori = realm.objects(KATEGORI_SCHEMA).sorted('id', true);
      resolve(allKategori);
  }).catch((error) => {
      reject(error);
  });
});

export const updateKategori =  (data: any) => new Promise<void>((resolve, reject) => {
  Realm.open(dbOptions).then(realm => {
    realm.write(() => {
      let kategori: any = realm.objectForPrimaryKey(KATEGORI_SCHEMA, data.id);
      kategori.nama_kategori = data.nama_kategori;
      resolve();
    });
  }).catch((error) => reject(error));
});

export const deleteKategori =  (id: any) => new Promise<void>((resolve, reject) => {
  let kategori = realm.objects(KATEGORI_SCHEMA);
  Realm.open(dbOptions).then(realm => {
    realm.write(() => {
      let deleteKategori = realm.objectForPrimaryKey(KATEGORI_SCHEMA, id);
      realm.delete(deleteKategori);
      resolve();
    });
  }).catch((error) => reject(error));
});

// Export the realm
export default new Realm(dbOptions);