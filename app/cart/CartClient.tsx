'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utils/formatPrice';
import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8 min-h-screen">
        <div className="text-2xl text-rose-400 mt-4">Keranjang kamu kosong</div>
        <div>
          <Link href="/productlist" className="text-slate-500 flex items-center gap-1 mt-2 hover:translate-x-1 hover:text-brown-600 transition-all ">
            <MdArrowBack />
            <span>Belanja sekarang, yuk!</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Heading title="Keranjang Belanja" center />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
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
                    handleClearCart();
                  }}
                />
              </div>
            </div>
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
                />
                <Link href={'/productlist'} className="text-slate-500 flex items-center gap-1 mt-2 hover:text-slate-800 hover:underline">
                  <MdArrowBack />
                  <span>Lanjut belanja</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
