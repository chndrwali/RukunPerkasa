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
        router.push('/cart');
        router.refresh();
        toast.success('Behasil masuk');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }
  return (
    <>
      <Heading center title="Masuk" />
      <hr className="bg-slate-300 w-full h-[px]" />

      <Input id="email" label="Masukan Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <a href="#" className="justify-self-end text-xs text-gray-500 hover:underline">
        Lupa Password?
      </a>
      <Button label={isLoading ? 'Mengirim data...' : 'Masuk'} onClick={handleSubmit(onSubmit)} />
      <p className="text-center text-slate-500">atau</p>
      <Button
        outline
        label="Masuk dengan Google"
        onClick={() => {
          signIn('google');
        }}
        icon={AiOutlineGoogle}
      />
      <p className="text-sm text-slate-500 text-center">
        Belum punya akun?{' '}
        <Link href="/register" className="text-blue-500 font-semibold  hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
