'use client';

import { Order, Product, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { formatNumber } from '@/utils/formatNumber';
import { CiDollar } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { FaBox } from 'react-icons/fa';
import { BiShoppingBag } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import SummaryCardItem from '../components/admin/SummaryCardItem';
import { MdClose } from 'react-icons/md';

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
    icon: IconType;
    color: string;
    textcolor: string;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: 'Total Pendapatan',
      digit: 0,
      icon: CiDollar,
      color: 'bg-green-100',
      textcolor: 'text-green-500',
    },
    products: {
      label: 'Total Produk',
      digit: 0,
      icon: FaBox,
      color: 'bg-blue-100',
      textcolor: 'text-blue-500',
    },
    orders: {
      label: 'Total Order',
      digit: 0,
      icon: BiShoppingBag,
      color: 'bg-orange-100',
      textcolor: 'text-orange-500',
    },
    paidOrders: {
      label: 'Sudah bayar',
      digit: 0,
      icon: BsCheckCircle,
      color: 'bg-teal-100',
      textcolor: 'text-teal-500',
    },
    unpaidOrders: {
      label: 'Belum bayar',
      digit: 0,
      icon: MdClose,
      color: 'bg-rose-100',
      textcolor: 'text-rose-500',
    },
    users: {
      label: 'Total pengguna',
      digit: 0,
      icon: AiOutlineUser,
      color: 'bg-blue-100',
      textcolor: 'text-blue-500',
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === 'complete') {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === 'complete';
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === 'pending';
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="grid gap-6 mt-4 mb-8 md:grid-cols-2 xl:grid-cols-3">
      {summaryKeys &&
        summaryKeys.map((key) => {
          const { label, digit, icon, color, textcolor } = summaryData[key];
          return <SummaryCardItem key={key} color={color} textcolor={textcolor} icon={icon} desc={label} number={label === 'Total Pendapatan' ? formatPrice(digit / 100) : formatNumber(digit)} />;
        })}
    </div>
  );
};

export default Summary;
