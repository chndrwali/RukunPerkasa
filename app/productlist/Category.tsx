'use client';

import { Skeleton } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  const handleClick = useCallback(() => {
    if (label === 'Semua') {
      router.push('/productlist');
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: '/productlist',
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton variant="rounded" animation="wave" width={150} height={100} className={`flex flex-col items-center justify-center p-4  rounded-lg shadow-md gap-4 `} />
        </>
      ) : (
        <div
          onClick={handleClick}
          className={`flex flex-col border items-center justify-center p-4  rounded-lg shadow-xl cursor-pointer hover:bg-brown-500 hover:text-slate-50   hover:shadow-2xl  transition duration-300 ease-out ${
            selected ? 'bg-brown-500 text-white' : ' text-slate-800'
          }`}
        >
          <Icon size={32} className="mb-2" />
          <div className="font-medium text-lg">{label}</div>
        </div>
      )}
    </>
  );
};

export default Category;
