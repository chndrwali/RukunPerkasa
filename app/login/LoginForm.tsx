'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/types';

interface LoginFormProps {
  currentUser: SafeUser | null;
}
const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/productlist');
      router.refresh();
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push('/productlist');
        router.refresh();
        toast.success('Behasil masuk');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Sudah login. tunggu sebentar...</p>;
  }
  return (
    <div className="max-w-xl lg:max-w-3xl">
      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Masuk</h1>

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {' '}
            Email{' '}
          </label>

          <Input id="email" label="Alamat Email" disabled={isLoading} register={register} errors={errors} required />
          <label htmlFor="email" className="block text-xs font-medium text-gray-400">
            Gunakan alamat email aktif Anda
          </label>
        </div>

        <div className="col-span-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {' '}
            Password{' '}
          </label>

          <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type="password" />
          <label htmlFor="password" className="block text-xs font-medium text-gray-400">
            Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
          </label>
        </div>

        <div className="col-span-6">
          <div className="mb-4">
            {' '}
            <Button label={isLoading ? 'Mengirim data...' : 'Masuk'} onClick={handleSubmit(onSubmit)} />
          </div>
          <p className="text-center relative text-slate-500">
            <span className="relative z-10 bg-white px-4">atau</span>
            <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-300 z-0"></span> {/* Garis atas */}
            <span className="absolute left-0 right-0 bottom-1/2 h-[1px] bg-slate-300 z-0"></span> {/* Garis bawah */}
          </p>
          <div className="mt-4">
            {' '}
            <Button
              outline
              label="Masuk dengan Google"
              onClick={() => {
                signIn('google');
              }}
              icon={AiOutlineGoogle}
            />
          </div>
          <p className="text-sm text-center mt-2">
            Belum punya akun?{' '}
            <Link href="/register" className="text-blue-500 font-semibold hover:underline hover:text-blue-500">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
