import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import RegisterForm from './RegisterForm';
import FormWrapRegister from './FormWrapRegister';

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrapRegister>
        <RegisterForm currentUser={currentUser} />
      </FormWrapRegister>
    </Container>
  );
};

export default Register;
