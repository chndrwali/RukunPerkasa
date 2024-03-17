import Link from 'next/link';
import { FaFrown } from 'react-icons/fa';

interface NullDataProps {
  title: string;
  subtitle?: string;
  href: string;
}

const NullData: React.FC<NullDataProps> = ({ title, subtitle, href }) => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="flex flex-col items-center text-center">
        <FaFrown className="text-9xl font-black text-gray-200" />

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ups!</p>

        <p className="mt-4 text-gray-500">{title}</p>

        <Link href={href} className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
          {subtitle}
        </Link>
      </div>
    </div>
  );
};

export default NullData;
