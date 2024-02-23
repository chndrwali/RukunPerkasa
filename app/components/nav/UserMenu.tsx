'use client';

import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';

const UserMenu = () => {
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
        flex-grow
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700
        "
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute
            rounded-md
            shadow-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer"
          >
            <div>
              <Link href="orders"></Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
