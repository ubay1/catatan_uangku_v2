/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {StackCategory} from '../../../interfaceRoutes';
import {AppDispatch} from '../../store';
import {setPage} from '../../store/whatsPage';
import {RootState} from '../../store/rootReducer';
import {deleteKategori, getAllKategori} from '../../../db/database';
import ListCategory from '../../components/molecules/category/ListCategory';
import ModalAtom from '../../components/atoms/alert/ModalAtom';
import DeleteContent from '../../components/atoms/DeleteContent';
import AddCategory from '../../components/molecules/category/AddCategory';
import InputAddCategory from '../../components/molecules/category/InputAddCategory';
import InputEditCategory from '../../components/molecules/category/InputEditCategory';
import { setHideTab, setShowTab } from '../../store/navigationRedux';

const CategoryOrganisms = ({route, navigation}: StackCategory) => {
  /* -------------------------------------------------------------------------- */
  /*                                    hooks                                   */
  /* -------------------------------------------------------------------------- */
  const dispatch: AppDispatch = useDispatch();
  const whatspage = useSelector((state: RootState) => state.whatsPage);

  const [fetchListKategori, setfetchListKategori] = useState<any>(false);
  const [listKategori, setlistKategori] = useState<any>([]);

  const [tipeKategori, setTipeKategori] = useState('');
  const [namaKategori, setNamaKategori] = useState('');

  const [loadingDelete, setloadingDelete] = React.useState(false);
  const [visibleModalDelete, setvisibleModalDelete] = React.useState(false);

  // const [selectTipeKategori, setselectTipeKategori] = useState('');
  const [stateOpenFabGroup, setStateOpenFabGroup] = React.useState({
    open: false,
  });

  const onStateChangeFabGroup = ({open}: any) => {
    setStateOpenFabGroup({open});
  };

  const [isEdit, setisEdit] = useState(false);
  const [idListKategori, setidListKategori] = useState(0);
  const [visibleModalInputKategori, setvisibleModalInputKategori] = React.useState(false);

  const openModalInputKategori = (isedit?: any, id?: any, tipeKategori?: any, namaKategori?: any) => {
      // console.log('teeee ', id);
      if (id !== null) {
        setidListKategori(id);
        setTipeKategori(tipeKategori);
        setNamaKategori(namaKategori);
      }

      setisEdit(isedit);
      setvisibleModalInputKategori(true);
    };

  const closeModalInputKategori = React.useCallback(() => {
    setvisibleModalInputKategori(false);
    setTipeKategori('');
    setNamaKategori('');
  }, [visibleModalInputKategori]);

  const openModalDelete = React.useCallback((id) => {
    setidListKategori(id);
    setvisibleModalDelete(true);
  }, [visibleModalDelete]);

  const closeModalDelete = React.useCallback(() => {
    setvisibleModalDelete(false);
  }, [visibleModalInputKategori]);

  useEffect(() => {
    if (whatspage.page === 'Category') {
      getListKategori();
      closeModalInputKategori();
    }
  }, [whatspage]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    dispatch(setShowTab());
    navigation.addListener('beforeRemove', () => {
      console.log('back to admin');
      dispatch(setShowTab());
    });
  }, [navigation]);

  // useEffect(() => {
  //   navigation.addListener('focus', e => {
  //     dispatch(setPage({page: 'Category'}));
  //   });
  // }, [navigation]);
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const ModalInputKategori = () => {
    return (
      <ModalAtom
        closeModal={closeModalInputKategori}
        visible={visibleModalInputKategori}
        setPageActive="Category"
      >
        {
          isEdit ?
          <InputEditCategory idInputKategori={idListKategori} defaultValueTipeCategory={tipeKategori} defaultValueNameCategory={namaKategori} closeModalInputKategori={closeModalInputKategori}/>
          :
          <InputAddCategory closeModalInputKategori={closeModalInputKategori}/>
        }
      </ModalAtom>
    );
  };

  const ModalOpenDelete = () => {
    return (
      <ModalAtom
        closeModal={closeModalDelete}
        visible={visibleModalDelete}
        setPageActive="Category"
      >
        <DeleteContent
          cancelDelete={() => {
            setvisibleModalDelete(false);
          }}
          submitDelete={()=> {
            setvisibleModalDelete(false);
            setloadingDelete(true);
            delKategori(idListKategori);
            getListKategori();
          }}
        />
      </ModalAtom>
    );
  };

  const getListKategori = () => {
    getAllKategori()
      .then(respListKategori => {
        setlistKategori(respListKategori);
        setfetchListKategori(true);
      })
      .catch(err => {
        console.log('error = ', err);
      });
  };

  const delKategori = (id: any) => {
    deleteKategori(id)
      .then(respListKategori => {
        setloadingDelete(false);
      })
      .catch(err => {
        console.log('error = ', err);
        setloadingDelete(false);
      })
      .finally(() => {
        dispatch(setPage({page: 'updateCategory'}));
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <ListCategory
        fetchListKategori={fetchListKategori}
        listKategori={listKategori}
        openModalInputKategori={openModalInputKategori}
        openModalDelete={openModalDelete}
      />

      <AddCategory
        isPageCategory={whatspage.page === 'Category' || whatspage.page === 'updateCategory' ? true : false}
        openModalInputKategori={openModalInputKategori}
      />

      <ModalOpenDelete />
      <ModalInputKategori />
    </>
  );
};

export default CategoryOrganisms;
