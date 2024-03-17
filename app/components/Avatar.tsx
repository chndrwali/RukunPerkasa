import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
interface AvatarProps {
  src?: string | null | undefined;
  dropdown?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, dropdown }) => {
  if (src) {
    return <Image src={src} alt="Profile" className={`rounded-full ${dropdown ? 'inline-block mr-2' : ''}`} height={30} width={30} />;
  }
  return <FaUserCircle className={`${dropdown ? 'inline-block mr-2' : ''}`} size={24} />;
};

export default Avatar;
