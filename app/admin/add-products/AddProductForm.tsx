'use client';

import Button from '@/app/components/Button';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox';
import Input from '@/app/components/inputs/Input';
import SelectColor from '@/app/components/inputs/SelectColor';
import TextArea from '@/app/components/inputs/TextArea';
import firebaseApp from '@/libs/firebase';
import { categories } from '@/utils/Categories';
import { colors } from '@/utils/Colors';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

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

  useEffect(() => {
    setCustomValue('images', images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data produk', data);

    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error('Kategory tidak di pilih');
    }

    if (!data.images) {
      setIsLoading(false);
      return toast.error('Gambar tidak di pilih');
    }

    const handleImageUploads = async () => {
      toast('Sedang membuat produk, mohon tunggu...');
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  console.log('error saat upload gambar', error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log('File available at', downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log('Error getting download URL', error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error handling image uploads', error);
        return toast.error('Error handling image uploads');
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post('/api/product', productData)
      .then(() => {
        toast.success('Produk telah dibuat');
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error('Ada yang salah saat menyimpan produk ke database');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch('category');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      } else {
        return [...prev, value];
      }
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (Array.isArray(prev)) {
        const filteredImages = prev.filter((item) => item.color !== value.color);
        return filteredImages;
      } else {
        return prev; // Or handle differently as needed
      }
    });
  }, []);

  return (
    <>
      <div className="px-4 py-3 mb-8 bg-slate-50 rounded-lg shadow-xl">
        <label htmlFor="name" className="block text-sm mb-4">
          <span className="text-gray-700">Nama Produk</span>
          <Input id="name" label="Nama Produk" disabled={isLoading} register={register} errors={errors} required />
        </label>
        <label htmlFor="price" className="block text-sm mb-4">
          <span className="text-gray-700">Harga Produk</span>
          <Input id="price" label="Harga Produk" disabled={isLoading} register={register} errors={errors} type="number" required />
        </label>
        <label htmlFor="brand" className="block text-sm mb-4">
          <span className="text-gray-700">Tipe Kayu</span>
          <Input id="brand" label="Tipe Kayu" disabled={isLoading} register={register} errors={errors} required />
        </label>
        <label htmlFor="description" className="block text-sm mb-4">
          <span className="text-gray-700">Deskripsi Produk</span>
          <TextArea id="description" label="Deskripsi Produk" disabled={isLoading} register={register} errors={errors} required />
        </label>
        <CustomCheckBox id="inStock" register={register} label="Produk tersedia" />
      </div>
      <div className="px-4 py-3 mb-8 bg-slate-50 rounded-lg shadow-xl">
        <div className="w-full font-medium">
          <div className="mb-2 font-semibold">Pilih kategori</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => {
              if (item.label === 'Semua') {
                return null;
              }
              return (
                <div key={item.label} className="col-span">
                  <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
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
              return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />;
            })}
          </div>
        </div>

        <Button label={isLoading ? 'Mengirim produk..' : 'Tambah Produk'} onClick={handleSubmit(onSubmit)} />
      </div>
    </>
  );
};

export default AddProductForm;
