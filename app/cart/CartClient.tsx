'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Keranjang kamu kosong</div>
        <div>
          <Link href={'/'} className="text-slate-500 flex items-center gap-1 mt-2 ">
            <MdArrowBack />
            <span>Belanja sekarang</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Keranjang Belanja" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUK</div>
        <div className="justify-self-center">HARGA</div>
        <div className="justify-self-center">JUMLAH</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <div key={item.id}>{item.name}</div>;
          })}
      </div>
      <div className="border-t[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[150px]">
          <Button label="Bersihkan Keranjang" small outline onClick={() => {}} />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Total Harga</span>
            <span>Rp.10000.0000</span>
          </div>
          <p className="text-slate-500">Pajak dan pengiriman dihitung saat checkout</p>
          <Button label="Checkout" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CartClient;
