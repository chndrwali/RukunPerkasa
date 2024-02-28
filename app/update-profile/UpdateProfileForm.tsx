'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface UpdateProfileFormProps {
  currentUser: SafeUser | null;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
    },
  });

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser]);

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.put(`/api/users/${currentUser?.id}`, data);

      toast.success('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
      toast.error('Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return <p className="text-center">Mohon tunggu...</p>;
  }

  return (
    <>
      <Heading center title="Update Profil" />

      <hr className="bg-slate-300 w-full h-[px]" />
      <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Button label={isLoading ? 'Menyimpan...' : 'Simpan Perubahan'} onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default UpdateProfileForm;
