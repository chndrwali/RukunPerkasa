'use client';

import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { Rating, Skeleton } from '@mui/material';
import Image from 'next/image';
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
    inStock: data.inStock,
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
        <div className="relative block overflow-hidden bg-white border border-brown-500 rounded-md shadow-md">
          <button onClick={() => handleAddProductToCart(cartProduct)} className="absolute top-4 right-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
            <span className="sr-only">Keranjang</span>
            <AiOutlineShoppingCart size={20} />
          </button>

          <Image width={500} height={500} priority={false} src={data.images[0].image} alt={data.name} className="w-full h-72 object-cover transition duration-500 hover:scale-105" />

          <div className="p-6">
            <span className="absolute top-2 left-2 bg-brown-500 px-3 py-1.5 text-xs text-slate-100 font-medium rounded">{data.category}</span>
            <h3 className="mt-4 text-lg font-medium text-slate-900 line-clamp-1">{truncateText(data.name)}</h3>
            <div className="mt-2">
              <Rating value={productRating} readOnly size="small" />
            </div>
            <div>{data.reviews.length} Reviews</div>
            <p className="mt-1 text-sm text-slate-700">{formatPrice(data.price)}</p>
            <div className="mt-4">
              <button onClick={() => router.push(`/product/${data.id}`)} className="block w-full rounded bg-brown-500 text-slate-100 p-3 text-sm font-medium transition hover:scale-105">
                Detail Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
