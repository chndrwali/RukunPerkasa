import Container from '@/app/components/Container';
import { product } from '@/utils/product';
import ProductDetails from './ProductDetails';

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  console.log('params', params);
  return (
    <div className="p-8">
      <Container>
        {product.map((product: any) => {
          return <ProductDetails key={product.id} data={product} />;
        })}
      </Container>
    </div>
  );
};

export default Product;
