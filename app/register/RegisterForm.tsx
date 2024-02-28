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
    <>
      <Heading center title="Daftar akun Rukun Perkasa" />

      <hr className="bg-slate-300 w-full h-[px]" />
      <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Masukan Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <Button label={isLoading ? 'Mengirim data...' : 'Daftar sekarang'} onClick={handleSubmit(onSubmit)} />
      <p className="text-center text-slate-500">atau</p>
      <Button
        outline
        label="Daftar dengan Google"
        onClick={() => {
          signIn('google');
        }}
        icon={AiOutlineGoogle}
      />
      <p className="text-sm text-center">
        Sudah mempunyai akun?{' '}
        <Link href="/login" className="font-semibold underline hover:underline hover:text-blue-500">
          Masuk sekarang
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
