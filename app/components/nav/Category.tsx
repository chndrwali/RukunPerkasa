'use client';

import { useSearchParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams;
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
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center p-4 border border-black rounded-lg shadow-md cursor-pointer hover:bg-brown-500 hover:text-slate-50 ${selected ? 'bg-brown-500 text-white' : ' text-slate-800'}`}
    >
      <Icon size={32} className="mb-2" />
      <div className="font-medium text-lg">{label}</div>
    </div>
  );
};

export default Category;
