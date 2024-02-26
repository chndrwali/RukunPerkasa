'use client';

import Heading from '@/app/components/Heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CustomCheckBox from '@/app/components/inputs/CustomCheckbox';
import Input from '@/app/components/inputs/Input';
import SelectColor from '@/app/components/inputs/SelectColor';
import TextArea from '@/app/components/inputs/TextArea';
import { categories } from '@/utils/Categories';
import { colors } from '@/utils/Colors';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
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

  const category = watch('category');

  const setCustomtValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  return (
    <>
      <Heading title="Tambahkan Produk" center />
      <Input id="name" label="Nama Produk" disabled={isLoading} register={register} errors={errors} required />
      <Input id="price" label="Harga Produk" disabled={isLoading} register={register} errors={errors} type="number" required />
      <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
      <TextArea id="description" label="Deskripsi Produk" disabled={isLoading} register={register} errors={errors} required />
      <CustomCheckBox id="inStock" register={register} label="Produk tersedia" />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Pilih kategori</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === 'All') {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput onClick={(category) => setCustomtValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">Pilih warna produk yang tersedia dan unggah gambarnya</div>
          <div className="text-sm">Anda paling banyak mengunggah gambar untuk setiap warna yang dipilih jika tidak, pemilihan warna Anda akan diabaikan</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return <SelectColor key={index} item={item} addImageToState={() => {}} removeImageFromState={() => {}} isProductCreated={false} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
