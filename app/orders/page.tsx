import Container from '@/app/components/Container';
import OrdersClient from './OrderClient';
import getCurrentUser from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import getOrdersByUserId from '@/actions/getOrdersByUserId';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import { FaArrowLeft } from 'react-icons/fa';

const ManageOrders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Anda Belum Login" href="/login" subtitle="Redirect ke Login Page" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8">
        <Heading title="Riwayat Pesanan" center />
        <div className="text-2xl text-rose-400 mt-4">Tidak ada Riwayat Pesanan</div>
        <div>
          <Link href={'/productlist'} className="text-slate-500 flex items-center gap-1 mt-2 hover:translate-x-1 hover:text-brown-600 transition-all ">
            <MdArrowBack />
            <span>Belanja sekarang, yuk!</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-8">
      <Link href="/productlist" className="hidden md:flex gap-1 text-brown-700 hover:translate-x-1 hover:text-brown-600 transition-all">
        <FaArrowLeft /> Kembali belanja
      </Link>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
