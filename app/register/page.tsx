import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import RegisterForm from './RegisterForm';
import { image } from '@/utils/footer';

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <div className="flex flex-col lg:flex-row w-full min-h-fit h-full  mb-4 border border-brown-500 mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image.signup})` }}></div>
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-8">
          <RegisterForm currentUser={currentUser} />
        </div>
      </div>
    </Container>
  );
};

export default Register;
