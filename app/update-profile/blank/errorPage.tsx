'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';

const ErrorPage = () => {
  const [isLoading, setIsLoading] = useState(true); // State untuk mengontrol apakah data sedang dimuat atau tidak

  useEffect(() => {
    // Simulasi permintaan data atau tugas yang membutuhkan waktu
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false); // Setelah data selesai dimuat, ubah isLoading menjadi false
      }, 2000); // Contoh: Waktu simulasi loading 2 detik
    };

    fetchData(); // Panggil fungsi fetchData saat komponen pertama kali dimuat
  }, []);

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        {isLoading ? (
          <>
            <Skeleton variant="text" animation="wave" width={200} height={50} />
            <Skeleton variant="text" animation="wave" width={300} height={40} />
            <Skeleton variant="text" animation="wave" width={400} height={30} />
            <Skeleton variant="text" animation="wave" width={250} height={40} />
          </>
        ) : (
          <>
            <h1 className="text-9xl font-black text-gray-200">404</h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ups!</p>
            <p className="mt-4 text-gray-500">Halaman yang Anda cari tidak ditemukan. Mohon maaf atas ketidaknyamanan ini, halaman tersebut sedang dalam pengembangan.</p>
            <a href="/" className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
              Kembali ke Halaman Utama
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
