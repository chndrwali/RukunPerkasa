'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { CartProductType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <tr>
      <td className="py-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Link href={`/product/${item.id}`}>
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain" />
            </div>
          </Link>
          <div className="flex flex-col flex-grow">
            <div>{truncateText(item.name)}</div>
            <div>{item.selectedImg.color}</div>
          </div>
        </div>
      </td>
      <td className="py-4">{formatPrice(item.price)}</td>
      <td className="py-4">{item.quantity}x</td>
      <td className="py-4 font-semibold">
        <Link href={`/product/${item.id}`} className=" hover:underline">
          Review
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
