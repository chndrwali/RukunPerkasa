import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import LoginForm from './LoginForm';
import { image } from '@/utils/footer';

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mb-4 border border-brown-500 mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image.login})` }}></div>
        <div className="w-full lg:w-1/2 px-6 py-8 md:px-8">
          <LoginForm currentUser={currentUser} />
        </div>
      </div>
    </Container>
  );
};

export default Login;
