'use client';

import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import { formatPrice } from '@/utils/formatPrice';
import { Order } from '@prisma/client';
import moment from 'moment';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import OrderItem from './OrderItem';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="m-4">
      <main className="p-4 border rounded-lg">
        <div className="mt-4 ">
          <Heading title="Detail Order" />
        </div>
        <h2>
          <span className="font-semibold">Order ID:</span> {order.id}{' '}
        </h2>
        <h2>
          {' '}
          <span className="font-semibold">Tanggal :</span> {moment(order.createDate).format('DD/MM/YYYY')}
        </h2>

        <div className="flex gap-2 items-center">
          <h2>
            <span className="font-semibold">Status Pembayaran:</span>{' '}
          </h2>
          <div>
            {order.status === 'pending' ? (
              <Status text="Belum di bayar" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
            ) : order.status === 'complete' ? (
              <Status text="Sukses" icon={MdDone} bg="bg-green-200" color="text-green-700" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <h2>
            <span className="font-semibold">Status Pengiriman:</span>{' '}
          </h2>
          <div>
            {order.deliveryStatus === 'pending' ? (
              <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
            ) : order.deliveryStatus === 'dispatched' ? (
              <Status text="Sedang di kirim" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
            ) : order.deliveryStatus === 'delivered' ? (
              <Status text="Barang sampai di tujuan" icon={MdDone} bg="bg-green-200" color="text-green-700" />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="my-8">
          <h2 className="font-semibold text-xl mb-4 sm:mb-8">Produk yang dipesan</h2>
          <div className="overflow-x-auto mb-6">
            <table className="sm:text-left text-center text-xs sm:text-base w-full">
              <thead>
                <tr>
                  <th className="py-2">Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Beri Ulasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.products &&
                  order.products.map((item) => {
                    return <OrderItem key={item.id} item={item} />;
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between text-orange-500">
            <p className="font-bold sm:text-xl mr-2">Total :</p>
            <p className="text-right font-bold">{formatPrice(order.amount / 100)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;
