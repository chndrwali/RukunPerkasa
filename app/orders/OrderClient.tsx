'use client';

import { Order, User } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatPrice';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import { useRouter } from 'next/navigation';
import moment from 'moment';

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).format('DD/MM/YYYY'),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Nama Customer', width: 130 },
    {
      field: 'amount',
      headerName: 'Harga Produk',
      width: 220,
      renderCell: (params) => {
        return <div className="font-bold text-slate">{params.row.amount}</div>;
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Status Pembayaran',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === 'pending' ? (
              <Status text="Belum Bayar" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
            ) : params.row.paymentStatus === 'complete' ? (
              <Status text="Sudah Bayar" icon={MdDone} bg="bg-green-200" color="text-green-700" />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'deliveryStatus',
      headerName: 'Status Pengiriman',
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === 'pending' ? (
              <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
            ) : params.row.deliveryStatus === 'dispatched' ? (
              <Status text="Sedang dikirim" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
            ) : params.row.deliveryStatus === 'delivered' ? (
              <Status text="Terkirim" icon={MdDone} bg="bg-green-200" color="text-green-700" />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Tanggal',
      width: 130,
    },

    {
      field: 'action',
      headerName: 'Aksi',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Riwayat Pesanan" center />
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;