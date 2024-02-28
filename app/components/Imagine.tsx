import Image from 'next/image';
import { magic } from '@/utils/footer';
const Imagine = () => {
  return (
    <section className="bg-white">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg ">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900">{magic.title}</h2>
          <p className="mb-4">{magic.desc}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Image className="w-full rounded-lg" width={400} height={400} quality={75} src={magic.image} alt="" />
          <Image className="mt-4 w-full rounded-lg lg:mt-10" width={400} height={400} quality={75} src={magic.img} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Imagine;
