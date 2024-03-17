import ManageProductsClient from './ManageProductsClient';
import getProducts from '@/actions/getProducts';
import getCurrentUser from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Akses di tolak" href="/" subtitle="Kembali ke Halaman Utama" />;
  }
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <h2 className="my-6 text-2xl font-semibold text-center text-gray-700">Kelola Produk</h2>
        <ManageProductsClient products={products} />
      </div>
    </main>
  );
};

export default ManageProducts;
