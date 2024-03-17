'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

const ProductWrap = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);
  return (
    <>
      <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10  sm:pb-28">
        <div className="flex items-end justify-between">
          <div className="flex flex-col space-y-4">
            {isLoading ? (
              <>
                <Skeleton variant="text" animation="wave" width={150} height={40} />
                <Skeleton variant="rounded" animation="wave" width={144} height={8} />
              </>
            ) : (
              <>
                <h2 className="max-w-sm text-2xl md:text-4xl text-start text-brown-600 font-bold">Produk</h2>
                <div className="w-32 h-2 bg-brown-600 rounded-full" />
              </>
            )}
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default ProductWrap;
