import { Key } from 'react';
import Container from '../components/Container';
import NullData from '../components/NullData';
import ProductCard from '../components/products/ProductCard';
import getProducts, { IProductParams } from '@/actions/getProducts';
import Categories from '../components/nav/Categories';
import { FaArrowLeft } from 'react-icons/fa';

interface ProductListProps {
  searchParams: IProductParams;
}

export default async function ProductList({ searchParams }: ProductListProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title='Ups! Tidak dapat menemukan produk. Click "Semua" untuk menghapus filter' />;
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8 min-h-screen">
      <a href="/" className="hidden md:flex gap-1 text-brown-700 hover:translate-x-1 hover:text-brown-600 transition-all">
        <FaArrowLeft /> Kembali ke beranda
      </a>
      <Container>
        <Categories />
        <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10  sm:pb-28">
          <div className="flex items-end justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="max-w-sm text-2xl md:text-4xl text-start text-brown-600 font-bold">Produk</h2>
              <div className="w-32 h-2 bg-brown-600 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {shuffledProducts.map((product: any, index: Key | null | undefined) => {
              return <ProductCard key={index} data={product} />;
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
