import { useEffect } from 'react';

function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) { // Cambia a 'scrolled' después de 50px de scroll
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4A017"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '0.3rem' }}
        >
          <path d="M3 6h18" />
          <path d="M12 6l-6 6h12l-6-6z" />
        </svg>
        <span>S/C</span>
      </div>
      <ul>
        <li>
          <a href="#inicio">Inicio</a>
        </li>
        <li>
          <a href="#productos">Productos</a>
        </li>
        <li>
          <a href="#admin">Admin</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;