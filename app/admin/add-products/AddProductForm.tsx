'use client';

import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import TextArea from '@/app/components/inputs/TextArea';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
      price: '',
    },
  });
  return (
    <>
      <Heading title="Tambahkan Produk" center />
      <Input id="name" label="Nama Produk" disabled={isLoading} register={register} errors={errors} required />
      <Input id="price" label="Harga Produk" disabled={isLoading} register={register} errors={errors} type="number" required />
      <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
      <TextArea id="description" label="Deskripsi Produk" disabled={isLoading} register={register} errors={errors} required />
    </>
  );
};

export default AddProductForm;
