import Link from 'next/link';
import Container from '../Container';
import { Redressed } from 'next/font/google';
import Image from 'next/image';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import getCurrentUser from '@/actions/getCurrentUser';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div
      className="
  sticky
  top-0
  bg-slate-50
  z-30
  shadow-sm
  "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex
            items-center
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Link href="/" className={`${redressed.className} flex items-center space-x-3 font-bold text-2xl`}>
              <Image src="/logo/rukunperkasa.png" width="32" height={32} className="h-8" alt="Rukun Perkasa Logo" />
              <span className="self-center whitespace-nowrap text-brown-800">Rukun Perkasa</span>
            </Link>
            <div className="hidden md:block"> Cari...</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
