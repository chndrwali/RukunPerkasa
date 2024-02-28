'use client';

import { categories } from '@/utils/Categories';
import Category from './Category';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/productlist';

  if (!isMainPage) return null;
  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24 sm:pb-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="max-w-sm text-2xl md:text-4xl text-start text-brown-600 font-bold">Kategori</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((item) => (
          <Category key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === 'All')} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
