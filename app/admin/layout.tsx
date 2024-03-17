import getCurrentUser from '@/actions/getCurrentUser';
import AdminNav from '../components/admin/AdminNav';

export const metadata = {
  title: 'Rukun Perkasa Admin Dashboard',
  description: 'Admin Dashboard',
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <div>{children}</div>;
  }
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
