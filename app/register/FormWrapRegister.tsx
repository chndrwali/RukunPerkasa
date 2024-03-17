'use client';

import { image } from '@/utils/footer';
import Image from 'next/image';

const FormWrapRegister = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-white rounded-lg shadow-lg mb-6 mt-6">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="hidden relative md:block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image src={image.signup} fill alt="Image signup" className="absolute inset-0 h-full w-full object-cover" />
        </aside>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">{children}</main>
      </div>
    </section>
  );
};

export default FormWrapRegister;
