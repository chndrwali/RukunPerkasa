import { IconType } from 'react-icons';

interface SummaryCardItemProps {
  color: string;
  textcolor: string;
  icon: IconType;
  desc: string;
  number: string;
}

const SummaryCardItem: React.FC<SummaryCardItemProps> = ({ color, textcolor, icon: Icon, desc, number }) => {
  return (
    <div className="flex items-center p-4 bg-brown-50 rounded-lg shadow-xs">
      <div className={`p-3 mr-4 ${textcolor} ${color} rounded-full`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="mr-2">
        <p className="mb-2 text-sm font-medium">{desc}</p>
        <p className="text-lg font-semibold w-28">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCardItem;
