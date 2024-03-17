'use client';

import Link from 'next/link';
import AdminNavItem from './AdminNavItem';
import { MdClose, MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import Container from '../Container';
import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import AddProductForm from '@/app/admin/add-products/AddProductForm';
import Heading from '../Heading';
import { motion } from 'framer-motion';

const AdminNav = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem label="Dashboard" icon={MdDashboard} selected={pathname === '/admin'} />
          </Link>

          <AdminNavItem label="Tambah Produk" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'} onClick={handleOpenModal} />

          <Link href="/admin/manage-products">
            <AdminNavItem label="Kelola Produk" icon={MdDns} selected={pathname === '/admin/manage-products'} />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem label="Kelola Order" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'} />
          </Link>
        </div>
      </Container>
      <Dialog open={isModalOpen}>
        <DialogContent>
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} exit={{ opacity: 0, y: -50 }}>
            <div className="flex justify-end">
              <MdClose size={30} className="cursor-pointer p-1 bg-red-100 text-red-600 rounded hover:bg-red-300 " onClick={handleCloseModal} /> {/* Tambahkan ikon X */}
            </div>
            <main className="h-full pb-16 overflow-y-auto">
              <div className="container px-6 mx-auto grid">
                <div className="mt-6 mb-4">
                  <Heading title="Tambahkan Produk" center />
                </div>
                <AddProductForm />
              </div>
            </main>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNav;
