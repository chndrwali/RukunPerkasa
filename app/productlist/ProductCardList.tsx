import getProducts, { IProductParams } from '@/actions/getProducts';
import NullData from '../components/NullData';
import ProductCard from '../components/products/ProductCard';

interface ProductCardListProps {
  searchParams: IProductParams;
}

const ProductCardList: React.FC<ProductCardListProps> = async ({ searchParams }) => {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title='Tidak dapat menemukan produk. Click "Semua" untuk menghapus filter' href="/" subtitle="Kembali ke Halaman Utama" />;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {shuffledProducts.map((product: any, index: any) => {
        return <ProductCard key={index} data={product} />;
      })}
    </div>
  );
};

export default ProductCardList;
