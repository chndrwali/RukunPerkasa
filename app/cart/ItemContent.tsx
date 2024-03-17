'use client';

import { formatPrice } from '@/utils/formatPrice';
import { CartProductType } from '../product/[productId]/ProductDetails';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';
import Image from 'next/image';
import SetQuantity from '../components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Link href={`/product/${item.id}`}>
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain" />
            </div>
          </Link>
          <div className="flex flex-col">
            <Link href={`/product/${item.id}`} className=" hover:underline">
              {truncateText(item.name)}
            </Link>
            <div>{item.selectedImg.color}</div>
            <button className="text-left text-slate-500 hover:underline mt-2 md:mt-0" onClick={() => handleRemoveProductFromCart(item)}>
              Hapus
            </button>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">{formatPrice(item.price)}</td>
      <td className="whitespace-nowrap px-4 py-2">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 font-semibold">{formatPrice(item.price * item.quantity)}</td>
    </tr>
  );
};

export default ItemContent;
