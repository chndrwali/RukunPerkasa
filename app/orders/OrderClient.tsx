'use client';

import { Order, User } from '@prisma/client';
import { formatPrice } from '@/utils/formatPrice';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { FaHistory } from 'react-icons/fa';

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="text-center">
        <Heading title="Orderan Anda" center />
        <p className="text-gray-500 ">Lihat riwayat transaksi anda</p>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-3 sm:py-4 sm:px-6 shadow-md border hover:shadow-lg duration-300 transition-all rounded-xl space-y-4 h-full">
          <div className="flex items-center mt-2 gap-2">
            <span className="text-gray-600 font-semibold">ID Pesanan:</span> {order.id}
          </div>
          <div className="flex items-center mt-2 gap-2">
            <span className="text-gray-600 font-semibold">Tanggal:</span> {moment(order.createDate).format('DD/MM/YYYY')}
          </div>
          <div className="flex items-center mt-2 gap-2">
            <span className="text-gray-700 font-semibold">Nama Customer:</span> {order.user.name}
          </div>
          <div className="flex items-center mt-2 gap-2">
            <span className="text-gray-700 font-semibold">Harga Produk:</span> {formatPrice(order.amount / 100)}
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 font-semibold ">Status Pembayaran:</span>
            <Status
              text={order.status === 'pending' ? 'Belum Bayar' : 'Sudah Bayar'}
              icon={order.status === 'pending' ? MdAccessTimeFilled : MdDone}
              bg={order.status === 'pending' ? 'bg-slate-200' : 'bg-green-200'}
              color={order.status === 'pending' ? 'text-slate-700' : 'text-green-700'}
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 font-semibold">Status Pengiriman:</span>
            <Status
              text={order.deliveryStatus === 'pending' ? 'Pending' : order.deliveryStatus === 'dispatched' ? 'Sedang Dikirim' : 'Terkirim'}
              icon={order.deliveryStatus === 'pending' ? MdAccessTimeFilled : order.deliveryStatus === 'dispatched' ? MdDeliveryDining : MdDone}
              bg={order.deliveryStatus === 'pending' ? 'bg-slate-200' : order.deliveryStatus === 'dispatched' ? 'bg-purple-200' : 'bg-green-200'}
              color={order.deliveryStatus === 'pending' ? 'text-slate-700' : order.deliveryStatus === 'dispatched' ? 'text-purple-700' : 'text-green-700'}
            />
          </div>
          <hr className="my-4 " />
          <button className=" sm:text-xl text-orange-500 hover:text-orange-700 hover:underline" onClick={() => router.push(`/order/${order.id}`)}>
            Lihat Detail Pesanan
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersClient;
