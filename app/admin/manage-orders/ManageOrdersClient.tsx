'use client';

import { Order, User } from '@prisma/client';
import { formatPrice } from '@/utils/formatPrice';
import Status from '@/app/components/Status';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { motion } from 'framer-motion';

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>(orders || []);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  useEffect(() => {
    if (orders) {
      const updatedRows = orders.map((order) => ({
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).format('DD/MM/YYYY'),
        deliveryStatus: order.deliveryStatus,
      }));
      setRows(updatedRows);
    }
  }, [orders]);

  const handleDispatch = (id: string) => {
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'dispatched',
      })
      .then((res) => {
        const updatedRows = rows.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              deliveryStatus: 'dispatched',
            };
          }
          return order;
        });
        setRows(updatedRows);
        toast.success('Status pengiriman sedang dikirim');
      })
      .catch((err: any) => {
        toast.error('Ups! Ada yang salah');
        console.log(err);
      });
  };

  const handleDeliver = (id: string) => {
    axios
      .put('/api/order', {
        id,
        deliveryStatus: 'delivered',
      })
      .then((res) => {
        const updatedRows = rows.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              deliveryStatus: 'delivered',
            };
          }
          return order;
        });
        setRows(updatedRows);
        toast.success('Status pengiriman sedang dikirim');
      })
      .catch((err: any) => {
        toast.error('Ups! Ada yang salah');
        console.log(err);
      });
  };

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto" style={{ minHeight: '580px' }}>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nama Customer</th>
                <th className="px-4 py-3">Harga Bayar</th>
                <th className="px-4 py-3">Status Pembayaran</th>
                <th className="px-4 py-3">Status Pengiriman</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {currentItems.map((row) => (
                <tr key={row.id} className="text-gray-700 ">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3">
                    {row.paymentStatus === 'pending' ? (
                      <Status text="Belum Bayar" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
                    ) : row.paymentStatus === 'complete' ? (
                      <Status text="Sudah Bayar" icon={MdDone} bg="bg-green-200" color="text-green-700" />
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {row.deliveryStatus === 'pending' ? (
                      <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
                    ) : row.deliveryStatus === 'dispatched' ? (
                      <Status text="Sedang dikirim" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
                    ) : row.deliveryStatus === 'delivered' ? (
                      <Status text="Terkirim" icon={MdDone} bg="bg-green-200" color="text-green-700" />
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <ActionBtn
                        icon={MdDeliveryDining}
                        onClick={() => {
                          handleDispatch(row.id);
                        }}
                      />
                      <ActionBtn
                        icon={MdDone}
                        onClick={() => {
                          handleDeliver(row.id);
                        }}
                      />
                      <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => {
                          router.push(`/order/${row.id}`);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9 ">
        <span className="flex items-center col-span-3">
          {' '}
          Menunjukan {indexOfFirstItem + 1} - {indexOfLastItem} dari {totalItems}{' '}
        </span>
        <span className="col-span-2"></span>
        {/* Pagination */}
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => changePage(index + 1)}
                    className={`${
                      pagination.currentPage === index + 1
                        ? 'px-3 py-1 text-white transition-colors duration-150 bg-brown-500 border border-r-0 border-brown-500 rounded-md focus:outline-none focus:shadow-outline-purple'
                        : 'px-3 py-1 transition-colors duration-150 hover:bg-brown-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index + 1}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </span>
      </div>
    </>
  );
};

export default ManageOrdersClient;
