import getCurrentUser from '@/actions/getCurrentUser';
import Container from '../components/Container';
import CartClient from './CartClient';
import NullData from '../components/NullData';

const Cart = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Harap masuk terlebih dahulu!" href="/login" subtitle="Redirect ke login page" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Cart;
