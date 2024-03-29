'use client';

import { categories } from '@/utils/Categories';
import Category from '../productlist/Category';
import { FaArrowRight } from 'react-icons/fa';

const CategoriesHome = () => {
  return (
    <section className="space-y-8 px-4  py-8 lg:pt-20 sm:pb-10">
      <div className="flex items-end justify-between">
        <div className="flex flex-col space-y-4">
          <h2 className="max-w-sm text-3xl md:text-5xl text-start text-brown-600 font-bold leading-[1.1]">Kategori Unggulan</h2>
          <h3 className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">Temukan kusen dan furniture terbaik dari toko Rukun Perkasa</h3>
        </div>
        <a href="/productlist" className="hidden md:flex gap-1 text-brown-700 hover:translate-x-1 hover:text-brown-600 transition-all">
          Belanja koleksinya <FaArrowRight />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3  ">
        {categories.map((item) => (
          <Category key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesHome;
