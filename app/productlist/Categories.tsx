'use client';

import { categories } from '@/utils/Categories';
import Category from './Category';
import { useSearchParams } from 'next/navigation';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10  ">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6 ">
        {categories.map((item) => (
          <Category key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === 'Semua')} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
