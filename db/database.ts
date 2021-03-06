/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import moment from 'moment';
import Realm from 'realm';
import {v4 as uuidv4} from 'uuid';

/* -------------------------------------------------------------------------- */
/*                               Declare Schema                               */
/* -------------------------------------------------------------------------- */
export const SALDO_SCHEMA = 'saldo';
export const SaldoSchema = {
  name: SALDO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int?',
    tipe: 'string',
    nama_atm: 'string?',
    nama_emoney: 'string?',
    tanggal: 'date',
    tanggal_int: 'int',
    bulan: 'int',
    tahun: 'int',
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

export const ATM_SCHEMA = 'list_atm';
export const AtmSchema = {
  name: ATM_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int?',
    nama_atm: 'string',
  },
};

export const EMONEY_SCHEMA = 'list_emoney';
export const EmoneySchema = {
  name: EMONEY_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int?',
    nama_emoney: 'string',
  },
};

// Create realm
let realm = new Realm({
  schema: [SaldoSchema, KategoriSchema, AtmSchema, EmoneySchema],
  schemaVersion: 2,
});

const dbOptions = {
  schema: [SaldoSchema, KategoriSchema, AtmSchema, EmoneySchema],
  schemaVersion: 2,
  // https://www.mongodb.com/docs/realm/sdk/react-native/examples/modify-an-object-schema/
  // migration: (oldRealm: any, newRealm: any) => {
  //   // only apply this change if upgrading to schemaVersion 1
  //   if (oldRealm.schemaVersion < 1) {
  //     const oldObjects = oldRealm.objects('SaldoSchema');
  //     const newObjects = newRealm.objects('SaldoSchema');

  //     // loop through all objects and set the name property in the new schema
  //     for (let i = 0; i < oldObjects.length; i++) {
  //         newObjects[i].tanggal_int = 'tanggal_int';
  //         newObjects[i].bulan = 'bulan';
  //         newObjects[i].tahun = 'tahun';
  //     }
  //   }
  // },
};

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
const dataDefaultkategori = [
  {
    id: 1,
    nama_kategori: 'Saldo Awal',
    tipe_kategori: 'pemasukan',
  },
  {
    id: 2,
    nama_kategori: 'Listrik',
    tipe_kategori: 'pengeluaran',
  },
  {
    id: 3,
    nama_kategori: 'PDAM/Air',
    tipe_kategori: 'pengeluaran',
  },
  {
    id: 4,
    nama_kategori: 'Transportasi',
    tipe_kategori: 'pengeluaran',
  },
  // {
  //   id: 5,
  //   nama_kategori: 'Transportasi',
  //   tipe_kategori: 'pengeluaran',
  // },
];

const dataDefaultEmoney = [
  {
    id: 1,
    nama_emoney: 'Gopay',
  },
  {
    id: 2,
    nama_emoney: 'OVO',
  },
  {
    id: 3,
    nama_emoney: 'Dana',
  },
  {
    id: 4,
    nama_emoney: 'Shopee Pay',
  },
];

/* -------------------------------------------------------------------------- */
/*                                crud catatan                                */
/* -------------------------------------------------------------------------- */
export const getPrimaryKeyId = (model: string) => {
  if (realm.objects(model).max('id')) {
    return Number(realm.objects(model).max('id')) + 1;
  }
  return 1;
};

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

export const createCatatan = (data: any) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const createCatatan: any = realm.write(() => {
          realm.create(SALDO_SCHEMA, {
            id: getPrimaryKeyId(SALDO_SCHEMA),
            tipe: data.tipe,
            nama_atm: ['', null, undefined].includes(data.nama_atm)
              ? ''
              : data.nama_atm,
            nama_emoney: ['', null, undefined].includes(data.nama_emoney)
              ? ''
              : data.nama_emoney,
            tanggal: data.tanggal,
            tanggal_int: data.tanggal_int,
            bulan: data.bulan,
            tahun: data.tahun,
            akun: data.akun,
            tujuan: data.tujuan,
            nominal: data.nominal,
            keterangan: data.keterangan,
            kategori: data.kategori,
          });
        });
        resolve(createCatatan);
      })
      .catch(error => reject(error));
  });

export const getAllCatatan = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const allCatatan = realm.objects(SALDO_SCHEMA).sorted('id', true);
        resolve(allCatatan);
      })
      .catch(error => {
        reject(error);
      });
  });

export const getSepuluhCatatanTerakhir = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const allCatatan = realm.objects(SALDO_SCHEMA).sorted('id', true);
        const sliceCatatan = allCatatan.slice(0, 10);
        resolve(sliceCatatan);
      })
      .catch(error => {
        reject(error);
      });
  });

export const getFilterCatatanByMonth = (value?: any) =>
  new Promise((resolve, reject) => {
    // const isoDate = formatDate(value);
    console.log(value);
    Realm.open(dbOptions)
      .then(realm => {
        let data: any = realm
          .objects(SALDO_SCHEMA)
          .filtered(`bulan == ${value}`);

        data = JSON.parse(JSON.stringify(data));

        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const getFilterCatatanByDate = (start_date?: any, end_date?: any) =>
  new Promise((resolve, reject) => {
    const toIsoFromDate = formatDate(start_date);
    const toIsoToDate = formatDate(end_date);

    Realm.open(dbOptions)
      .then(realm => {
        let data: any = realm
          .objects(SALDO_SCHEMA)
          .filtered(
            'tanggal >= $0 && tanggal <= $1',
            toIsoFromDate,
            toIsoToDate,
          );

        data = JSON.parse(JSON.stringify(data));

        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const updateCatatan = (data: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let catatan: any = realm.objectForPrimaryKey(SALDO_SCHEMA, data.id);
          catatan.tipe = data.tipe;
          catatan.nama_atm = ['', null, undefined].includes(data.nama_atm)
            ? ''
            : data.nama_atm;
          catatan.nama_emoney = ['', null, undefined].includes(data.nama_emoney)
            ? ''
            : data.nama_emoney;
          catatan.tanggal = data.tanggal;
          catatan.tanggal_int = data.tanggal_int;
          catatan.bulan = data.bulan;
          catatan.tahun = data.tahun;
          catatan.akun = data.akun;
          catatan.tujuan = data.tujuan;
          catatan.nominal = data.nominal;
          catatan.keterangan = data.keterangan;
          catatan.kategori = data.kategori;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteCatatan = (id: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deletingCatatan = realm.objectForPrimaryKey(SALDO_SCHEMA, id);
          realm.delete(deletingCatatan);
          // const allCatatan = realm.objects(SALDO_SCHEMA).sorted('id', true);
          // const sliceCatatan = allCatatan.slice(0, 10);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllCatatan = () =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let allTodoLists = realm.objects(SALDO_SCHEMA);
          realm.delete(allTodoLists);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

/* -------------------------------------------------------------------------- */
/*                                crud kategori                               */
/* -------------------------------------------------------------------------- */
export const createDefaultKategori = () =>
  new Promise((resolve, reject) => {
    const length = realm.objects(KATEGORI_SCHEMA).length;
    Realm.open(dbOptions)
      .then(realm => {
        if (length < 1) {
          realm.write(() => {
            dataDefaultkategori.forEach(obj =>
              realm.create(KATEGORI_SCHEMA, obj),
            );
          });
          resolve('data default kategori dibuat');
        } else {
          resolve('data default sudah ada');
        }
      })
      .catch(error => reject(error));
  });

export const createKategori = (data: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(KATEGORI_SCHEMA, {
            id: getPrimaryKeyId(KATEGORI_SCHEMA),
            nama_kategori: data.nama_kategori,
            tipe_kategori: data.tipe_kategori,
          });

          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getAllKategori = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allKategori = realm.objects(KATEGORI_SCHEMA).sorted('id', true);
        resolve(allKategori);
      })
      .catch(error => {
        reject(error);
      });
  });

export const updateKategori = (data: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let kategori: any = realm.objectForPrimaryKey(
            KATEGORI_SCHEMA,
            data.id,
          );
          kategori.nama_kategori = data.nama_kategori;
          resolve(kategori);
        });
      })
      .catch(error => reject(error));
  });

export const deleteKategori = (id: any) =>
  new Promise<void>((resolve, reject) => {
    let kategori = realm.objects(KATEGORI_SCHEMA);
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deleteKategori = realm.objectForPrimaryKey(KATEGORI_SCHEMA, id);
          realm.delete(deleteKategori);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

/* -------------------------------------------------------------------------- */
/*                                  crud ATM                                  */
/* -------------------------------------------------------------------------- */
export const createAtm = (data: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(ATM_SCHEMA, {
            id: getPrimaryKeyId(ATM_SCHEMA),
            nama_atm: data.nama_atm,
          });

          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getSaldoByAtmName = (AtmName: string) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let result = realm
          .objects(SALDO_SCHEMA)
          .filtered('nama_atm == $0', AtmName);
        resolve(result);
      })
      .catch(error => reject(error));
  });

export const getAllAtm = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allAtm = realm.objects(ATM_SCHEMA).sorted('id', true);
        resolve(allAtm);
      })
      .catch(error => reject(error));
  });

/* -------------------------------------------------------------------------- */
/*                                  crud Emoney                                  */
/* -------------------------------------------------------------------------- */
export const createDefaultEmoney = () =>
  new Promise((resolve, reject) => {
    const length = realm.objects(EMONEY_SCHEMA).length;
    Realm.open(dbOptions)
      .then(realm => {
        if (length < 1) {
          realm.write(() => {
            dataDefaultEmoney.forEach(obj => realm.create(EMONEY_SCHEMA, obj));
          });
          resolve('data default emoney dibuat');
        } else {
          resolve('data default sudah ada');
        }
      })
      .catch(error => reject(error));
  });

export const createEmoney = (data: any) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(EMONEY_SCHEMA, {
            id: getPrimaryKeyId(EMONEY_SCHEMA),
            nama_emoney: data.nama_emoney,
          });

          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getSaldoByEmoneyName = (EmoneyName: string) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let result = realm
          .objects(SALDO_SCHEMA)
          .filtered('nama_emoney == $0', EmoneyName);
        resolve(result);
      })
      .catch(error => reject(error));
  });

export const getAllEmoney = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allEmoney = realm.objects(EMONEY_SCHEMA).sorted('id', true);
        resolve(allEmoney);
      })
      .catch(error => reject(error));
  });

// Export the realm
export default new Realm(dbOptions);
