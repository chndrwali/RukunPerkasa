export const metadata = {
  title: 'Rukun Perkasa Admin Dashboard',
  description: 'Admin Dashboard',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>Nav</div>
      {children}
    </div>
  );
};

export default AdminLayout;
