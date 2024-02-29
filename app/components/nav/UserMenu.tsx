'use client';

import React, { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown, AiFillSetting } from 'react-icons/ai';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';
import { FaShoppingBag, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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
          <AiFillCaretDown />
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
              <Link href="/update-profile">
                <MenuItem onClick={toggleOpen}>{currentUser?.email}</MenuItem>
              </Link>
              <Link href="/orders">
                <MenuItem onClick={toggleOpen}>
                  <FaShoppingBag className="inline-block mr-2" />
                  Orderan anda
                </MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onClick={toggleOpen}>
                  <AiFillSetting className="inline-block mr-2" />
                  Admin Dashboard
                </MenuItem>
              </Link>
              <hr className="my-1 border-gray-200" />
              <MenuItem
                onClick={() => {
                  toggleOpen();
                  signOut({ callbackUrl: '/', redirect: true });
                }}
              >
                <FaSignOutAlt className="inline-block mr-2 text-red-500" />
                <span className="text-red-500">Keluar</span>
              </MenuItem>
            </div>
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
