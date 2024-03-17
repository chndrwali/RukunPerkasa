import { FaArrowLeft } from 'react-icons/fa';
import Container from '../components/Container';
import Categories from './Categories';
import ProductCardList from './ProductCardList';
import { IProductParams } from '@/actions/getProducts';
import ProductWrap from './ProductWrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SimpleSlider from './Slider';

interface ProductList {
  searchParams: IProductParams;
}

export const dynamic = 'force-dynamic';

const ProductList: React.FC<ProductList> = ({ searchParams }) => {
  return (
    <div className="p-8 min-h-screen">
      <a href="/" className="hidden md:flex gap-1 text-brown-700 hover:translate-x-1 hover:text-brown-600 transition-all">
        <FaArrowLeft /> Kembali ke beranda
      </a>
      <Container>
        <SimpleSlider />
        <Categories />
        <ProductWrap>
          <ProductCardList searchParams={searchParams} />
        </ProductWrap>
      </Container>
    </div>
  );
};

export default ProductList;
