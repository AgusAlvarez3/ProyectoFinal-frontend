function ProductCard({ product, onDelete, onEdit }) {
  const imagenUrl = product.imagen_url || 'https://via.placeholder.com/150';
  const categoriaNombre = product.categoria ? product.categoria.nombre : 'Sin categoría';

  return (
    <div className="card">
      <img src={imagenUrl} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>${product.precio}</p>
      <p>Stock: {product.stock}</p>
      <p>Categoría: {categoriaNombre}</p>
      <div>
        <button onClick={() => onDelete(product.id)}>Eliminar</button>
        <button
          onClick={() => {
            onEdit(product.id);
            document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;