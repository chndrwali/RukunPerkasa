'use client';

import { useEffect, useState } from 'react';
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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CircularProgress, Skeleton } from '@mui/material';

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      toast.error('Alamat email tidak valid');
      return;
    }
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
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <CircularProgress color="primary" />
        <p className="text-center">Sudah login. tunggu sebentar...</p>;
      </div>
    );
  }
  return (
    <div className="max-w-xl lg:max-w-3xl">
      {isLoading ? (
        <>
          <Skeleton variant="text" animation="wave" width={350} height={80} className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl" />
        </>
      ) : (
        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">Daftar Akun Rukun Perkasa</h1>
      )}

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" width={350} height={50} />
              <Skeleton variant="text" animation="wave" width={250} height={20} className="block text-xs font-medium text-gray-400" />
            </>
          ) : (
            <>
              <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
              <label htmlFor="name" className="block text-xs font-medium text-slate-400">
                Masukan nama asli Anda, nama akan di gunakan untuk pengiriman
              </label>
            </>
          )}
        </div>

        <div className="col-span-6">
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" width={350} height={50} />
              <Skeleton variant="text" animation="wave" width={150} height={20} className="block text-xs font-medium text-slate-400" />
            </>
          ) : (
            <>
              <Input id="email" label="Alamat Email" disabled={isLoading} register={register} errors={errors} required />
              <label htmlFor="email" className="block text-xs font-medium text-slate-400">
                Gunakan alamat email aktif Anda
              </label>
            </>
          )}
        </div>

        <div className="col-span-6">
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" width={350} height={50} />
              <Skeleton variant="text" animation="wave" width={200} height={20} className="block text-xs font-medium text-slate-400" />
            </>
          ) : (
            <>
              <div className="relative">
                <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type={showPassword ? 'text' : 'password'} />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-6 mr-4 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)} // Toggle state showPassword saat tombol ditekan
                >
                  {showPassword ? <FaEyeSlash className="text-slate-400" /> : <FaEye className="text-slate-400" />}
                </button>
              </div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-400">
                Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
              </label>
            </>
          )}
        </div>

        <div className="col-span-6">
          <div className="mb-4">
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" animation="wave" width={350} height={50} />
              </>
            ) : (
              <>
                <Button label={isLoading ? 'Mengirim data...' : 'Daftar'} onClick={handleSubmit(onSubmit)} />
              </>
            )}
          </div>
          <p className="text-center relative text-slate-500">
            {isLoading ? (
              <>
                <Skeleton variant="text" animation="wave" width={350} height={10} />
              </>
            ) : (
              <>
                <span className="relative z-10 bg-white px-4">atau</span>
                <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-300 z-0"></span>
                <span className="absolute left-0 right-0 bottom-1/2 h-[1px] bg-slate-300 z-0"></span>
              </>
            )}
          </p>
          <div className="mt-4">
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" animation="wave" width={350} height={50} />
              </>
            ) : (
              <>
                <Button
                  outline
                  label="Daftar dengan Google"
                  onClick={() => {
                    signIn('google');
                  }}
                  icon={AiOutlineGoogle}
                />
              </>
            )}
          </div>
          <p className="text-sm text-center mt-2">
            {isLoading ? (
              <>
                <Skeleton variant="text" animation="wave" width={250} height={20} />
              </>
            ) : (
              <>
                Sudah mempunyai akun?{' '}
                <Link href="/login" className="font-semibold underline hover:underline hover:text-blue-500">
                  Masuk sekarang
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
