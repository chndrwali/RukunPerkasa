import Link from 'next/link';
import Container from '../Container';
import Image from 'next/image';
import { Redressed } from 'next/font/google';
import { footer } from '@/utils/footer';
import moment from 'moment';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });
const Footer = () => {
  return (
    <footer className="bg-slate-800">
      <Container>
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <Link href="/" className={`${redressed.className} flex items-center space-x-3 font-bold text-2xl`}>
                  <Image src="/logo/rukunperkasa.png" width="32" height={32} className="h-8" alt="Rukun Perkasa Logo" />
                  <span className="self-center whitespace-nowrap text-brown-500">{footer.brand}</span>
                </Link>

                <p className="max-w-sm mt-2 text-gray-50">{footer.SEO}</p>

                <div className="flex mt-6 -mx-2">
                  <a href={footer.viewOnWhatsapp.url} target="_blank" rel="noreferrer" className="mx-2 text-gray-50 hover:text-blue-600 hover:underline" title={footer.viewOnWhatsapp.title} aria-label={footer.viewOnWhatsapp.title}>
                    <FaWhatsapp />
                  </a>

                  <a href={footer.facebook.url} target="_blank" rel="noreferrer" className="mx-2 text-gray-50 hover:text-blue-600 hover:underline" title={footer.facebook.title} aria-label={footer.facebook.title}>
                    <FaFacebook />
                  </a>
                  <a href={footer.linkedin.url} target="_blank" rel="noreferrer" className="mx-2 text-gray-50 hover:text-blue-600 hover:underline" title={footer.linkedin.title} aria-label={footer.linkedin.title}>
                    <FaLinkedin />
                  </a>
                  <a href={footer.instagram.url} target="_blank" rel="noreferrer" className="mx-2 text-gray-50 hover:text-blue-600 hover:underline" title={footer.instagram.title} aria-label={footer.instagram.title}>
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="text-gray-50 uppercase ">{footer.about.title}</h3>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.about.company}
                  </a>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400 ">
                    {footer.about.career}
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-50 uppercase ">{footer.woodtype.title}</h3>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.woodtype.wood}
                  </a>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.woodtype.wood1}
                  </a>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.woodtype.wood2}
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-50 uppercase ">{footer.product.title}</h3>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.product.kat}
                  </a>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.product.kat1}
                  </a>
                  <a href="#" className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">
                    {footer.product.kat2}
                  </a>
                </div>

                <div>
                  <h3 className="text-gray-50 uppercase ">{footer.contact.title}</h3>
                  <span className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">{footer.contact.no}</span>
                  <span className="block mt-2 text-sm text-gray-50 hover:underline hover:text-brown-400">{footer.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-gray-50">
              &copy; {moment().format('YYYY')} {footer.copy}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
