import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import FormWrap from '../components/FormWrap';
import UpdateProfileForm from './UpdateProfileForm';

const UpdateProfile = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <UpdateProfileForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default UpdateProfile;
