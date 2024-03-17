import Link from 'next/link';
import Container from '../Container';
import { Redressed } from 'next/font/google';
import Image from 'next/image';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import getCurrentUser from '@/actions/getCurrentUser';
import SearchBar from './SearchBar';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 bg-slate-50 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className={`${redressed.className} flex items-center space-x-3 font-bold text-2xl`}>
              <Image src="/logo/rukunperkasa.png" width={44} height={44} priority={true} className="h-11 w-11" alt="Rukun Perkasa Logo" />
              <span className="self-center whitespace-nowrap text-brown-800">Rukun Perkasa</span>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-6 md:gap-8">
              <CartCount />
              {/* Menggunakan conditional rendering untuk menampilkan UserMenu jika login ada, dan tombol Masuk dan Daftar jika tidak */}
              {currentUser ? (
                <UserMenu currentUser={currentUser} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="relative flex items-center font-semibold border rounded-full px-4 border-brown-500 text-base text-brown-500  bg-white min-h-[44px] min-w-[44px] hover:text-gray-100 hover:bg-brown-500 hover:brightness-110 hover:translate-y-[1px] lg:mx-4 hover:shadow-xl hover:opacity-80 transition duration-300 ease-out"
                    title="Tombol menu masuk"
                    aria-label="Tombol menu masuk"
                  >
                    Masuk
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
