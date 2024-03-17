import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import LoginForm from './LoginForm';
import FormWrapLogin from './FormWrapLogin';

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrapLogin>
        <LoginForm currentUser={currentUser} />
      </FormWrapLogin>
    </Container>
  );
};

export default Login;
