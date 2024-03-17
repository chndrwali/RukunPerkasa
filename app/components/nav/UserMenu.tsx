'use client';

import React, { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown, AiFillSetting } from 'react-icons/ai';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';
import { FaProductHunt, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import { Modal } from '@mui/material';
import { Role } from '@prisma/client';
import { motion } from 'framer-motion';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleSignOutModal = useCallback(() => {
    setIsSignOutModalOpen((prev) => !prev);
  }, []);

  const handleSignOut = useCallback(async () => {
    toggleSignOutModal();
    await signOut({ callbackUrl: '/', redirect: true });
  }, [toggleSignOutModal]);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
          p-2
          border-[1px]
        border-slate-400
          flex
          items-center
          rounded-full
          cursor-pointer
        hover:bg-slate-200
          transition-colors
        "
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown className={`${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div
            className="
            absolute
              rounded-md
              shadow-md
              w-[170px]
              bg-white
              right-0
              top-12
              text-sm
              cursor-pointer
              overflow-hidden
              transition-all
              duration-300
              transform
              scale-y-100
              origin-top-right
              z-20"
          >
            <div className="flex flex-col">
              <MenuItem onClick={toggleOpen}>
                <p className="text-sm text-gray-500 ">Masuk sebagai</p>
                <p className="text-sm font-bold text-gray-800 truncate">{currentUser?.email}</p>
              </MenuItem>

              <Link href="/update-profile">
                <MenuItem onClick={toggleOpen}>
                  <Avatar src={currentUser?.image} dropdown />
                  Perbarui Profil
                </MenuItem>
              </Link>
              <hr className="my-1 border-gray-200" />
              <Link href="/orders">
                <MenuItem onClick={toggleOpen}>
                  <FaShoppingBag className="inline-block mr-2" />
                  Orderan anda
                </MenuItem>
              </Link>
              <Link href="/productlist">
                <MenuItem onClick={toggleOpen}>
                  <FaProductHunt className="inline-block mr-2" />
                  Produk
                </MenuItem>
              </Link>
              {currentUser?.role === Role.ADMIN && ( // Tampilkan Admin Dashboard hanya jika role adalah ADMIN
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>
                    <AiFillSetting className="inline-block mr-2" />
                    Admin Dashboard
                  </MenuItem>
                </Link>
              )}
              <hr className="my-1 border-gray-200" />
              <MenuItem onClick={toggleSignOutModal}>
                <FaSignOutAlt className="inline-block mr-2 text-red-500" />
                <span className="text-red-500">Keluar</span>
              </MenuItem>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
      <Modal
        open={isSignOutModalOpen}
        onClose={toggleSignOutModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} exit={{ opacity: 0, y: -50 }} className="bg-white p-6 rounded-md" style={{ width: '300px' }}>
          <h2 className="text-lg font-semibold mb-2">Konfirmasi Keluar</h2>
          <p className="mb-4">Apakah Anda yakin ingin keluar?</p>
          <div className="flex justify-end gap-4">
            <motion.button
              onClick={toggleSignOutModal}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleSignOut}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:red-blue-300 focus:ring-opacity-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt className="inline-block mr-2 " />
              Keluar
            </motion.button>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default UserMenu;
