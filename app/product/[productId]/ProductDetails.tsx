'use client';

import SetColor from '@/app/components/products/SetColor';
import { Rating } from '@mui/material';
import { useCallback, useState } from 'react';

interface ProductDetailProps {
  data: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailProps> = ({ data }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.id,
    description: data.id,
    category: data.id,
    brand: data.id,
    selectedImg: { ...data.images[0] },
    quantity: 1,
    price: data.price,
  });

  console.log(cartProduct);
  const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>Images</div>
      <div className="flex flex-col gap-1 text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{data.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <span>{data.reviews.length} review</span>
        </div>
        <Horizontal />
        <div className="text-justify">{data.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {data.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {data.brand}
        </div>
        <div className={data.inStock ? 'text-teal-400' : 'text-rose-400'}> {data.inStock ? 'in stock' : 'out of stock'}</div>
        <Horizontal />
        <SetColor cartProduct={cartProduct} images={data.images} handleColorSelect={handleColorSelect} />
        <Horizontal />
        <div>quantity:</div>
        <Horizontal />
        <div>add to cart</div>
      </div>
    </div>
  );
};

export default ProductDetails;
