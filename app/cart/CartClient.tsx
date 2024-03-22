'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utils/formatPrice';
import { SafeUser } from '@/types';
import { useCart } from '@/hooks/useCart';
import { Modal } from '@mui/material';

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const toggleClearModal = () => {
    setIsClearModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClearModalOpen(false);
  };

  const handleDeleteUser = () => {
    handleClearCart();
    setIsClearModalOpen(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Heading title="Keranjang Kamu" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            {!cartProducts || cartProducts.length === 0 ? (
              <div className="flex flex-col items-center mt-6">
                <div className="text-2xl text-rose-400 mt-4">Tidak ada produk yang di tambahkan ke keranjang</div>
                <div>
                  <Link href="/productlist" className="text-slate-500 flex items-center gap-1 mt-2 hover:translate-x-1 hover:text-brown-600 transition-all ">
                    <MdArrowBack />
                    <span>Belanja sekarang, yuk!</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
                <table className="w-full divide-y-2 divide-gray-200  text-sm">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Produk</th>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Harga</th>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Jumlah</th>
                      <th className="text-left whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartProducts &&
                      cartProducts.map((item) => {
                        return <ItemContent key={item.id} item={item} />;
                      })}
                  </tbody>
                </table>
                <div className="w-[150px]">
                  <Button
                    label="Bersihkan Keranjang"
                    small
                    outline
                    onClick={() => {
                      toggleClearModal();
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm flex flex-col gap-1 items-start">
                <div className="flex justify-between w-full text-base font-semibold">
                  <span>Total Harga</span>
                  <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className="text-slate-500 mb-2">Pajak dan pengiriman dihitung saat checkout</p>
                <Button
                  label={currentUser ? 'Checkout' : 'Masuk untuk Checkout'}
                  outline={currentUser ? false : true}
                  onClick={() => {
                    currentUser ? router.push('/checkout') : router.push('/login');
                  }}
                  disabled={!cartProducts || cartProducts.length === 0}
                />
                {cartProducts && cartProducts.length > 0 && (
                  <Link href={'/productlist'} className="text-slate-500 flex items-center gap-1 mt-2 hover:text-slate-800 hover:underline">
                    <MdArrowBack />
                    <span>Lanjut belanja, yuk!</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isClearModalOpen} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            Konfirmasi Bersihkan Keranjang
          </h2>
          <p id="modal-description" className="text-sm text-gray-600 mb-4">
            Apakah kamu yakin ingin menghapus semua item dari keranjang?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Batal
            </button>

            <button
              onClick={handleDeleteUser}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:red-blue-300 focus:ring-opacity-40"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartClient;
