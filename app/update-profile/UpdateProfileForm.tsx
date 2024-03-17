'use client';

import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import firebaseApp from '@/libs/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

interface UpdateProfileFormProps {
  currentUser: SafeUser | null;
}

type ImageType = {
  image: File | null;
};

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const router = useRouter();

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
    setValue('images', images);
  }, [images, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: string[] = [];

    const handleImageUploads = async () => {
      toast('Sedang menyimpan data, mohon tunggu...');
      try {
        for (const item of data.images) {
          if (item) {
            const fileName = new Date().getTime() + '-' + item.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `users/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                () => {},
                (error) => {
                  console.log('error saat upload gambar', error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push(downloadURL);
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
    const profileData = { ...data, image: uploadedImages };

    axios
      .put(`/api/users/${currentUser?.id}`, profileData)
      .then(() => {
        toast.success('Berhasil update profile');
        router.refresh();
      })
      .catch((error) => {
        toast.error('Ada yang salah saat menyimpan profil ke database');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!currentUser) {
    return <p className="text-center">Mohon tunggu...</p>;
  }

  return (
    <>
      <Heading center title="Perbarui Profil" />

      <hr className="bg-slate-300 w-full h-[2px]" />
      <div className="flex items-center">{currentUser.image ? <Image src={currentUser?.image} alt="Profile Image" style={{ width: '100px', height: '100px' }} /> : <FaUserCircle className="w-8 h-8 rounded-full mr-2" />}</div>
      <Input id="name" label="Nama Lengkap" disabled={isLoading} register={register} errors={errors} required />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImages([{ image: selectedFile }]);
          }
        }}
        accept="image/*"
        disabled={isLoading}
      />

      <Button label={isLoading ? 'Menyimpan...' : 'Simpan Perubahan'} onClick={handleSubmit(onSubmit)} />
    </>
  );
};

export default UpdateProfileForm;
