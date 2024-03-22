'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { Rating, Skeleton } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddProductToCart } = useCart();

  const [cartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    brand: data.brand,
    selectedImg: { ...data.images[0] },
    quantity: 1,
    price: data.price,
  });

  const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rounded" animation="wave" width={200} height={400} className="relative block overflow-hidden rounded-md shadow-md" />
        </>
      ) : (
        <div className="relative block cursor-pointer overflow-hidden bg-white border  rounded-2xl shadow-lg hover:shadow-2xl space-y-4 h-full">
          <button
            onClick={() => {
              handleAddProductToCart(cartProduct);
            }}
            className="absolute top-4 right-4 z-10 rounded-full bg-white p-1.5 text-gray-900  hover:text-white hover:bg-brown-500  transition duration-300 ease-out"
          >
            <span className="sr-only">Keranjang</span>
            <AiOutlineShoppingCart size={20} />
          </button>
          <Link href={`/product/${data.id}`}>
            <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative">
              <Image width={500} height={500} priority={false} src={data.images[0].image} alt={data.name} className="aspect-square rounded-2xl object-cover transition duration-500 hover:scale-105" />
            </div>
            <div className="p-4">
              <span className="absolute top-2 left-2 bg-brown-500 px-3 py-1.5 text-xs text-slate-100 font-medium rounded">{data.category}</span>
              <h3 className="mt-1 text-lg font-medium text-slate-900 hover:underline hover:text-slate-900/60 line-clamp-1">{truncateText(data.name)}</h3>
              <div className="flex items-center mt-2">
                <Rating value={productRating} readOnly size="medium" />
              </div>
              <span className="mt-1 text-sm text-gray-600">{data.reviews.length} Reviews</span>
              <p className="mt-1 text-sm text-slate-700 font-semibold">{formatPrice(data.price)}</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
