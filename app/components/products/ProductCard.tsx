'use client';

import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="
        col-span-1 
        cursor-pointer 
        border-[1.2px] border-slate-200
        bg-slate-50
        rounded-sm
        p-2
        transition
        hover:scale-105
        text-sm
        relative
      "
    >
      <div
        className="
        flex
        flex-col
        w-full
        gap-1
      "
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image fill src={data.images[0].image} alt={data.name} className="w-full h-full object-contain" />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} Reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
        <button
          className="
            absolute
            bottom-2
            right-2
            bg-gray-800
            text-white
            rounded-full
            p-2
            hover:bg-gray-700
            focus:outline-none
          "
        >
          <AiOutlineShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
