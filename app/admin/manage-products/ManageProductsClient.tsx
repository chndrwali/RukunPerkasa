'use client';

import { useState } from 'react';
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md';
import { formatPrice } from '@/utils/formatPrice';
import Status from '@/app/components/Status';
import ActionBtn from '@/app/components/ActionBtn';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';
import axios from 'axios';
import { Product } from '@prisma/client';
import { Modal } from '@mui/material';
import { motion } from 'framer-motion';

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  const [openModal, setOpenModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [rows, setRows] = useState<any[]>(products || []);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  useState(() => {
    if (products) {
      const updatedRows = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      }));
      setRows(updatedRows);
    }
  });

  const handleToggleStock = (id: string, inStock: boolean) => {
    axios
      .put('/api/product', {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        const updatedRows = rows.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              inStock: !inStock,
            };
          }
          return product;
        });
        setRows(updatedRows);
        toast.success('Status produk diubah');
      })
      .catch((err: any) => {
        toast.error('Ups! Ada yang salah');
        console.log(err);
      });
  };

  const handleDelete = async (id: string, images: any[]) => {
    toast('Sedang menghapus produk, mohon tunggu...');

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log('Menghapus gambar', item.image);
          }
        }
      } catch (error) {
        return console.log('Menghapus gambar error', error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        const updatedRows = rows.filter((product) => product.id !== id);
        setRows(updatedRows);
        toast.success('Produk dihapus');
      })
      .catch((err) => {
        toast.error('Gagal menghapus produk');
        console.log(err);
      });
  };

  const handleOpenModal = (id: string) => {
    setProductIdToDelete(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setProductIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      const productToDelete = rows.find((product) => product.id === productIdToDelete);
      if (productToDelete) {
        handleDelete(productToDelete.id, productToDelete.images);
      }
    }
    handleCloseModal();
  };

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto" style={{ minHeight: '580px' }}>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nama Produk</th>
                <th className="px-4 py-3">Harga Produk</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Tipe Kayu</th>
                <th className="px-4 py-3">Ketersediaan</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {currentItems.map((row) => (
                <tr key={row.id} className="text-gray-700 ">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.price}</td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">{row.brand}</td>
                  <td className="px-4 py-3">{row.inStock === true ? <Status text="Stok ada" icon={MdDone} bg="bg-teal-200" color="text-teal-700" /> : <Status text="Stok habis" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <ActionBtn
                        icon={MdCached}
                        onClick={() => {
                          handleToggleStock(row.id, row.inStock);
                        }}
                      />
                      <ActionBtn
                        icon={MdDelete}
                        onClick={() => {
                          handleOpenModal(row.id);
                        }}
                      />
                      <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => {
                          router.push(`/product/${row.id}`);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} exit={{ opacity: 0, y: -50 }} className="bg-white p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Konfirmasi Penghapusan</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus produk ini?</p>
          <div className="flex justify-end gap-4">
            <motion.button
              onClick={handleCloseModal}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Batal
            </motion.button>

            <motion.button
              onClick={handleConfirmDelete}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:red-blue-300 focus:ring-opacity-40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdDelete className="inline-block mr-2" />
              Hapus
            </motion.button>
          </div>
        </motion.div>
      </Modal>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9 ">
        <span className="flex items-center col-span-3">
          {' '}
          Menunjukan {indexOfFirstItem + 1} - {indexOfLastItem} dari {totalItems}{' '}
        </span>
        <span className="col-span-2"></span>
        {/* Pagination */}
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => changePage(index + 1)}
                    className={`${
                      pagination.currentPage === index + 1
                        ? 'px-3 py-1 text-white transition-colors duration-150 bg-brown-500 border border-r-0 border-brown-500 rounded-md focus:outline-none focus:shadow-outline-purple'
                        : 'px-3 py-1 transition-colors duration-150 hover:bg-brown-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index + 1}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </span>
      </div>
    </>
  );
};

export default ManageProductsClient;
