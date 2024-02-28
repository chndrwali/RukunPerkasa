'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();

  return (
    <div className="relative cursor-pointer inline-block" onClick={() => router.push('/cart')}>
      <div className="text-3xl text-gray-600 hover:text-gray-900 transition-colors duration-300">
        <CiShoppingCart />
      </div>
      <span
        className="
          absolute 
          top-[-8px] 
          right-[8px] 
          bg-slate-700 
          text-white 
          h-6 
          w-6 
          rounded-full
          flex
          items-center
          justify-center
          text-sm"
      >
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
