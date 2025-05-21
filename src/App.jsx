import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  const [editProductId, setEditProductId] = useState(null);

  const handleEdit = (id) => {
    setEditProductId(id);
  };

  return (
    <div className="app-container">
      <Navbar />
      <section id="inicio">
        <Home />
      </section>
      <section id="productos">
        <Products onEdit={handleEdit} />
      </section>
      <section id="admin">
        <Admin onEdit={editProductId} />
      </section>
    </div>
  );
}

export default App;