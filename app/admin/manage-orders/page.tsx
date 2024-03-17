import ManageOrdersClient from './ManageOrdersClient';
import getCurrentUser from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import getOrders from '@/actions/getOrders';

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Akses di tolak" href="/" subtitle="Kembali ke Halaman Utama" />;
  }
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <h2 className="my-6 text-2xl font-semibold text-center text-gray-700">Kelola Order</h2>
        <ManageOrdersClient orders={orders} />
      </div>
    </main>
  );
};

export default ManageOrders;
