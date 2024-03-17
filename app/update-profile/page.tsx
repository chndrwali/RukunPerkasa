import getCurrentUser from '@/actions/getCurrentUser';
import UpdateProfileForm from './UpdateProfileForm';
import SideMenuProfile from './SideMenuProfile';
import FormWrapUpdate from './FormWrapUpdate';

const UpdateProfile = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex">
      <SideMenuProfile />
      <FormWrapUpdate>
        <UpdateProfileForm currentUser={currentUser} />
      </FormWrapUpdate>
    </div>
  );
};

export default UpdateProfile;
