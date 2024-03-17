'use client';

import Button from '@/app/components/Button';
import ProductImage from '@/app/components/products/ProductImage';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCheckCircle } from 'react-icons/md';

interface ProductDetailProps {
  product: any;
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
  inStock: boolean;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
    inStock: product.inStock,
  });

  const router = useRouter();

  console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return toast.error('Barang telah mencapai maksimal');
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return toast.error('Barang tidak boleh kurang dari 1');
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  p-6">
      <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
      <div className="flex flex-col gap-1 text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <span>{product.reviews.length} review</span>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">KATEGORI: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">TIPE KAYU: </span>
          {product.brand}
        </div>
        <div className="font-bold">
          <span className="font-semibold">HARGA: </span>
          {formatPrice(product.price)}
        </div>
        <div className={product.inStock ? 'text-green-500' : 'text-rose-500'}> {product.inStock ? 'Stok tersedia' : 'Yahh stok nya habis :('}</div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-green-500" size={20} />
              <span> Produk telah di tambahkan ke keranjang.</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                outline
                label="Lihat Keranjang"
                onClick={() => {
                  router.push('/cart');
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
            <Horizontal />
            <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button label="Tambah ke Keranjang" onClick={() => handleAddProductToCart(cartProduct)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
