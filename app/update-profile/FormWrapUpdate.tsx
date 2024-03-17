const FormWrapUpdate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:w-1/2 mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="max-w-md mx-auto">{children}</div>
    </div>
  );
};

export default FormWrapUpdate;
