import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ productId }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen_url: '',
    descripcion: '',
    categoria_id: '',
  });
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/categorias')
      .then((response) => {
        console.log('Categorías recibidas:', response.data);
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar categorías:', error);
      });
  }, []);

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:3000/productos/${productId}`)
        .then((response) => {
          const { categoria, ...rest } = response.data;
          setFormData({
            ...rest,
            imagen_url: response.data.imagen_url || '',
            categoria_id: categoria ? categoria.id : '',
          });
        })
        .catch((error) => {
          console.error('Error al cargar el producto:', error);
        });
    }
  }, [productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const categoriaSeleccionada = categorias.find(cat => cat.nombre === formData.categoria_id);
    const datosParaEnviar = {
      ...formData,
      categoria_id: categoriaSeleccionada ? parseInt(categoriaSeleccionada.id) : null,
    };

    try {
      if (productId) {
        await axios.put(`http://localhost:3000/productos/${productId}`, datosParaEnviar);
        alert('Producto actualizado');
      } else {
        await axios.post('http://localhost:3000/productos', datosParaEnviar);
        alert('Producto creado');
      }
      // Limpiar el formulario
      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        imagen_url: '',
        descripcion: '',
        categoria_id: '',
      });
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>{productId ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen (URL)</label>
          <input
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : productId ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;