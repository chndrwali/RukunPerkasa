import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import RegisterForm from './RegisterForm';
import { image } from '@/utils/footer';
import Image from 'next/image';

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <section className="bg-white rounded-lg border border-brown-500 mb-6 mt-6">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="hidden relative md:block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image src={image.signup} fill alt="Image signup" className="absolute inset-0 h-full w-full object-cover" />
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <RegisterForm currentUser={currentUser} />
          </main>
        </div>
      </section>
    </Container>
  );
};

export default Register;
