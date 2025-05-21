import ProductForm from '../components/ProductForm.jsx';

function Admin({ onEdit }) {
  return (
    <div className="container">
      <ProductForm productId={onEdit} />
    </div>
  );
}

export default Admin;