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
    if (label === 'All') {
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
      className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-md cursor-pointer hover:bg-brown-500 hover:text-slate-50 ${selected ? 'border-brown-600 text-slate-800' : 'border-transparent text-slate-500'}`}
    >
      <Icon size={32} className={`${selected ? 'text-slate-800' : 'text-slate-500'} mb-2 hover:text-slate-50`} />
      <div className="font-medium text-lg">{label}</div>
    </div>
  );
};

export default Category;
