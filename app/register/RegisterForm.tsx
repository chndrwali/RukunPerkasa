'use client';

import { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

const RegisterForm = () => {
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };
  return (
    <>
      <Heading center title="Daftar" />
      <Button outline label="Daftar dengan Google" onClick={() => {}} icon={AiOutlineGoogle} />
      <hr className="bg-slate-300 w-full h-[px]" />
      <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Masukan Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Masukan Password" disabled={isLoading} register={register} errors={errors} required type="password" />
      <Button label={isLoading ? 'Mengirim data...' : 'Daftar sekarang'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm text-center">
        Sudah mempunyai akun?{' '}
        <Link href="/login" className="underline">
          Masuk
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
