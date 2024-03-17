import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
    flex
    items-center
    justify-center
    rounded
    cursor-pointer
    w-[40px]
    h-[30px]
    border
    text-slate-700
    border-slate-400
    ${disabled && 'opacity-50 cursor-not-allowed'}
    
    `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon size={18} />
    </motion.button>
  );
};

export default ActionBtn;
