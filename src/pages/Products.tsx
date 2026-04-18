import { useState, useEffect } from 'react';
import { type User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { type Product } from '../types';
import ProductForm from '../components/ProductForm';

interface ProductsProps {
  user: User | null;
}

function Products({ user }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError('');

    // TODO: Fetch products from your Supabase table.
    // Replace 'your_table_name' with your actual table name.
    //
    // const { data, error } = await supabase
    //   .from('your_table_name')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    //
    // if (error) {
    //   setError('Failed to load products: ' + error.message);
    // } else {
    //   setProducts(data ?? []);
    // }

    setLoading(false);
  }

  async function handleAdd(data: Partial<Product>) {
    // TODO: Insert a new product into your Supabase table.
    //
    // const { error } = await supabase
    //   .from('your_table_name')
    //   .insert([{ ...data, user_id: user?.id }]);
    //
    // if (error) {
    //   alert('Failed to add product: ' + error.message);
    //   return;
    // }
    //
    // setShowForm(false);
    // fetchProducts(); // Refresh the list

    console.log('Add product:', data);
  }

  async function handleEdit(data: Partial<Product>) {
    if (!editingProduct) return;

    // TODO: Update an existing product in your Supabase table.
    //
    // const { error } = await supabase
    //   .from('your_table_name')
    //   .update(data)
    //   .eq('id', editingProduct.id);
    //
    // if (error) {
    //   alert('Failed to update product: ' + error.message);
    //   return;
    // }
    //
    // setEditingProduct(null);
    // fetchProducts(); // Refresh the list

    console.log('Edit product:', editingProduct.id, data);
  }

  async function handleDelete(id: number) {
    // TODO: Delete a product from your Supabase table.
    // IMPORTANT: Show a confirmation dialog first!
    //
    // if (!window.confirm('Are you sure you want to delete this item?')) {
    //   return;
    // }
    //
    // const { error } = await supabase
    //   .from('your_table_name')
    //   .delete()
    //   .eq('id', id);
    //
    // if (error) {
    //   alert('Failed to delete product: ' + error.message);
    //   return;
    // }
    //
    // fetchProducts(); // Refresh the list

    console.log('Delete product:', id);
  }

  if (loading) {
    return <p className="loading">Loading products...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // Show the form if adding or editing
  if (showForm || editingProduct) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleEdit : handleAdd}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        {/* Only show Add button if user is signed in */}
        {user && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            + Add New
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="empty-state">No products yet. Be the first to add one!</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* TODO: Display all your product fields here.
                  Example:

                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-rating">Rating: {product.rating}/5</p>
              */}
              <p>Product #{product.id}</p>

              {/* Only show Edit/Delete if user is signed in */}
              {user && (
                <div className="product-actions">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="btn btn-small"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-small btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
