import { Link } from 'react-router-dom';

const Home = () => {
  return (
     <div className="h-screen flex flex-col items-center justify-center p-6"> 
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          Bienvenido al CRUD de productos y usuarios
        </h1>
        <h4 className="text-gray-600 mb-8 text-lg">
       Aplicación <strong>fullstack</strong> desarrollada en <strong>JavaScript</strong> , con un <em>frontend</em> en <strong>React</strong> 
          que interactúa con un <em>backend</em> en <strong>Express</strong>, 
       ofreciendo funcionalidades completas para crear, 
       leer, actualizar y eliminar datos de usuarios y productos.
       <p><br/><strong>¿Por donde gustas comenzar?</strong></p>
       </h4>
        <div className="flex gap-4 justify-center">
          <Link to="/usuarios">
            <button className="bg-purple-400 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center gap-2">
              <i className="pi pi-users"></i>
              Usuarios
            </button>
          </Link>
          <Link to="/productos">
            <button className="bg-purple-700 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center gap-2">
              <i className="pi pi-box"></i> 
              Productos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
