import { useState } from 'react';
import { type Product } from '../types';

interface ProductFormProps {
  // If editing, pass the existing product. If adding, pass null.
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  // TODO: Add a useState for each of your product fields.
  // If editing (product is not null), initialize with the existing values.
  // If adding (product is null), initialize with empty/default values.
  //
  // Example:
  // const [name, setName] = useState(product?.name ?? '');
  // const [price, setPrice] = useState(product?.price ?? 0);

  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // TODO: Validate your fields here.
    // Example:
    // if (!name.trim()) {
    //   setError('Name is required');
    //   return;
    // }

    // TODO: Call onSave with your field values.
    // Example:
    // onSave({ name, price, category, ... });

    onSave({});
  }

  return (
    <div className="form-container">
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* TODO: Add form fields for each of your product fields.
            Example:

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
        */}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {product ? 'Save Changes' : 'Add Product'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
