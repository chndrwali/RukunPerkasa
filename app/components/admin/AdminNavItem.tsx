import { IconType } from 'react-icons';

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ selected, icon: Icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 p-2 border-b-2 cursor-pointer 
      ${selected ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'} 
      hover:border-blue-500 hover:text-blue-500 hover:bg-gray-100 transition-all rounded-md`}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default AdminNavItem;
