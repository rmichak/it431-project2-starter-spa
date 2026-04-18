import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* TODO: Customize your home page.
          Tell visitors what your app is about and
          what kind of products they can browse. */}
      <h1>Welcome to My App</h1>
      <p>
        Browse our collection of products. Sign in to add, edit, and delete items.
      </p>
      <Link to="/products" className="btn btn-primary">
        Browse Products
      </Link>
    </div>
  );
}

export default Home;
