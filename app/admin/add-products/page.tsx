import AddProductForm from './AddProductForm';
import getCurrentUser from '@/actions/getCurrentUser';
import Heading from '@/app/components/Heading';
import NullData from '@/app/components/NullData';

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Ups! akses di tolak" href="/" subtitle="Kembali ke Halaman Utama" />;
  }
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <div className="mt-6 mb-4">
          <Heading title="Tambahkan Produk" center />
        </div>
        <AddProductForm />
      </div>
    </main>
  );
};

export default AddProducts;
