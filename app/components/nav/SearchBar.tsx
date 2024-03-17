'use client';

import { usePathname, useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push('/productlist');

    const url = queryString.stringifyUrl(
      {
        url: '/productlist',
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };

  const isMainPage = pathname === '/productlist';

  if (!isMainPage) return null;
  return (
    <div className="flex items-center">
      <div className="relative flex items-stretch w-full">
        <input
          {...register('searchTerm')}
          autoComplete="off"
          type="text"
          placeholder="Cari di Rukun Perkasa..."
          className="p-2 pl-8 border border-gray-100 rounded-l-xl focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-full"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
      </div>
      <button onClick={handleSubmit(onSubmit)} className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-lg">
        Cari
      </button>
    </div>
  );
};

export default SearchBar;
