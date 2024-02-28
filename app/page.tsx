import CategoriesHome from './components/CategoriesHome';
import Container from './components/Container';
import HomeBanner from './components/HomeBanner';
import Imagine from './components/Imagine';

export default async function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <CategoriesHome />
        <Imagine />
      </Container>
    </div>
  );
}
