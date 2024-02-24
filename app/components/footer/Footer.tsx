import Link from 'next/link';
import Container from '../Container';
import FooterList from './FooterList';
import { MdFacebook } from 'react-icons/md';
import { AiFillTwitterCircle, AiFillInstagram, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer
      className="
  bg-brown-500
  text-slate-200
  text-sm 
  mt-16
  "
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2"> Kategori Toko</h3>
            <Link href="#">Kusen</Link>
            <Link href="#">Pintu</Link>
            <Link href="#">Jendela</Link>
            <Link href="#">Furniture</Link>
            <Link href="#">Meja</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shoping Policy</Link>
            <Link href="#">Return & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">Tentang Kami</h3>
            <p className="mb-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo aperiam veritatis eum, doloribus vel placeat quia ad aspernatur impedit excepturi.</p>
            <p>&copy; {new Date().getFullYear()} Rukun Perkasa | All Right Reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillGithub size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
