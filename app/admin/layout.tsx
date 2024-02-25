import AdminNav from '../components/admin/AdminNav';

export const metadata = {
  title: 'Rukun Perkasa Admin Dashboard',
  description: 'Admin Dashboard',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
