import { Key } from 'react';
import Container from '../components/Container';
import NullData from '../components/NullData';
import ProductCard from '../components/products/ProductCard';
import getProducts, { IProductParams } from '@/actions/getProducts';
import Categories from '../components/nav/Categories';

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
      <Container>
        <Categories />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {shuffledProducts.map((product: any, index: Key | null | undefined) => {
            return <ProductCard key={index} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}
