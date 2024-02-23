'use client';

import { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
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
  return (
    <>
      <Heading center title="Masuk" />
      <Button outline label="Masuk dengan Google" onClick={() => {}} icon={AiOutlineGoogle} />
      <hr className="bg-slate-300 w-full h-[px]" />
      <Input id="email" label="Masukan Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <Button label={isLoading ? 'Mengirim data...' : 'Masuk'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm text-center">
        Tidak mempunyai akun?{' '}
        <Link href="/register" className="underline">
          Daftar sekarang
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
