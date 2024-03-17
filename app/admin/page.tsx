import getProducts from '@/actions/getProducts';
import Summary from './Summary';
import getOrders from '@/actions/getOrders';
import getUsers from '@/actions/getUsers';
import NullData from '../components/NullData';
import getCurrentUser from '@/actions/getCurrentUser';
import BarGraph from './BarGraph';
import getGraphData from '@/actions/getGraphData';
import UserClient from './UserClient';

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Akses di tolak" href="/" subtitle="Kembali ke Halaman Utama" />;
  }
  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 text-center">Dashboard</h2>
        <Summary products={products} orders={orders} users={users} />
        <UserClient users={users} />
        <BarGraph data={graphData} />
      </div>
    </main>
  );
};

export default Admin;
