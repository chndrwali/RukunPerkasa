interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
      z-20 bg-black opacity-50 fixed top-0 left-0 w-screen h-screen transition-opacity duration-300 ease-in-out"
    ></div>
  );
};

export default BackDrop;
