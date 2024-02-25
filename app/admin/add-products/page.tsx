import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';
import AddProductForm from './AddProductForm';

const AddProducts = () => {
  return (
    <div className="p-8 ">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
