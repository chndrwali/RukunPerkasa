'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push('/productlist');
      router.refresh();
    }
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Akun berhasil di buat :)');

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          console.log(callback);
          if (callback?.ok) {
            router.push('/productlist');
            router.refresh();
            toast.success('Behasil masuk');
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error('Ada yang salah'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p className="text-center">Sudah login. mohon tunggu...</p>;
  }
  return (
    <div className="max-w-xl lg:max-w-3xl">
      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Daftar Akun Rukun Perkasa</h1>

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>

          <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
          <label htmlFor="name" className="block text-xs font-medium text-gray-400">
            Masukan nama asli Anda, nama akan di gunakan untuk pengiriman
          </label>
        </div>

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
            <Button label={isLoading ? 'Mengirim data...' : 'Daftar'} onClick={handleSubmit(onSubmit)} />
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
              label="Daftar dengan Google"
              onClick={() => {
                signIn('google');
              }}
              icon={AiOutlineGoogle}
            />
          </div>
          <p className="text-sm text-center mt-2">
            Sudah mempunyai akun?{' '}
            <Link href="/login" className="font-semibold underline hover:underline hover:text-blue-500">
              Masuk sekarang
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
