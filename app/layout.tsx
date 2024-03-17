import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Rukun Perkasa | Belanja Kusen Aman dan Nyaman',
  description: 'An open source e-commerce project built by chndrwali',
  category: 'ecommerce',
  authors: { name: 'chndrwali' },
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Wood Frame', 'Furniture', 'Kusen'],
  creator: 'Candra Wali Sanjaya',
  publisher: 'Candra Wali Sanjaya',
  openGraph: {
    title: 'Rukun Perkasa',
    description: 'An open source e-commerce project built by chndrwali',
    url: 'https://rukun-perkasa.vercel.app/',
    siteName: 'Rukun Perkasa',
    images: 'https://rukun-perkasa.vercel.app/images/rukunperkasa.PNG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rukun Perkasa',
    description: 'An open source e-commerce project built by chndrwali',
    images: ['https://rukun-perkasa.vercel.app/images/rukunperkasa.PNG'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: '#add8e6',
              color: '#000000',
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
