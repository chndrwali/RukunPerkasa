'use client';

import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from '@/utils/formatPrice';
import Heading from '@/app/components/Heading';

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.category,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Nama Produk', width: 220 },
    {
      field: 'price',
      headerName: 'Harga Produk',
      width: 220,
      renderCell: (params) => {
        return <div className="font-bold text-slate">{params.row.price}</div>;
      },
    },
    { field: 'category', headerName: 'Kategori', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'Ketersediaan',
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.inStock === true ? 'Stok Ada' : 'Stok Habis'}</div>;
      },
    },
    {
      field: 'action',
      headerName: 'Aksi',
      width: 200,
      renderCell: (params) => {
        return <div>Action</div>;
      },
    },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Kelola Produk" center />
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
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
