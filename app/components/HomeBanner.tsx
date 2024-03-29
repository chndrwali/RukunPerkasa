import getCurrentUser from '@/actions/getCurrentUser';
import Image from 'next/image';
import Link from 'next/link';

const HomeBanner = async () => {
  const currentUser = await getCurrentUser();
  return (
    <section className="pt-10 pb-20">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-4 lg:pl-4 lg:pr-8 lg:w-1/2">
            <h1 className="font-extrabold text-4xl mb-4 lg:text-5xl">
              <span className="text-brown-500">Jaminan Ketahanan Luar Biasa dengan Kusen Kayu Kami</span>
            </h1>
            <h2 className="font-semibold text-black text-xl mb-1 lg:text-3xl">Temukan Kusen Berkualitas Tinggi</h2>
            <p className="font-medium text-black text-base mb-8 leading-relaxed lg:text-lg">Dapatkan Penawaran Spesial untuk Pembelian Pertama</p>
            <Link
              href={currentUser ? '/productlist' : '/register'}
              className="text-white after:content-['_↗'] text-xl font-medium border border-black bg-brown-500 rounded px-7 py-3 hover:bg-white hover:text-brown-500 hover:border  hover:shadow-xl hover:border-brown-500 transition duration-300 ease-out"
              title="Tombol"
              aria-label="Tombol"
            >
              {currentUser ? 'Jelajahi Produk' : 'Dapatkan Sekarang'}
            </Link>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative w-full mt-10 lg:mt-0 lg:right-0">
              <Image src="/banner/hero.webp" width="200" height="200" className="absolute scale-[45%] top-1/3 right-[12%] translate-x-1/2 md:top-[40%] md:scale-50 lg:scale-[65%]" alt="Robot" />
              <video autoPlay loop muted playsInline className="w-[85%] h-auto rounded-xl shadow-xl">
                <source src="/banner/hero.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
