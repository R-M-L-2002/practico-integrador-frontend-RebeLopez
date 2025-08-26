import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext"; 
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProductsRoutes from "./layouts/productos";
import UsersRoutes from "./layouts/usuarios";
import Home from "./layouts/home/home";
import LoginForm from "./layouts/auth/LoginForm";
import RegisterForm from "./layouts/auth/RegisterForm";
import 'primeicons/primeicons.css'; 
import './App.css';
import { useContext } from "react";

// Navbar dinamico 
function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-purple-900 text-white p-4 flex justify-center space-x-8">
      <Link to="/" className="hover:underline flex items-center gap-2">
        <i className="pi pi-home"></i> Inicio
      </Link>
      {user ? (
        <>
          <Link to="/productos" className="hover:underline flex items-center gap-2">
            <i className="pi pi-box"></i> Productos
          </Link>
          <Link to="/usuarios" className="hover:underline flex items-center gap-2">
            <i className="pi pi-users"></i> Usuarios
          </Link>
          <button onClick={logout} className="ml-4 bg-red-600 px-3 py-1 rounded">Salir</button>
        </>
      ) : (
        <>
          <Link to="/inicio-sesion" className="hover:underline flex items-center gap-2">Iniciar sesión</Link>
          <Link to="/registro" className="hover:underline flex items-center gap-2">Registrarse</Link>
        </>
      )}
    </nav>
  )
}

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/inicio-sesion" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <UserProvider>
            <div className="min-h-screen w-full bg-gray-200 pt-16">
              <Navbar />
              <Routes>
                {/* Rutas públicas */}
                <Route path="/inicio-sesion" element={<LoginForm />} />
                <Route path="/registro" element={<RegisterForm />} />

                {/* Rutas privadas */}
                <Route path="/" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="/productos/*" element={
                  <PrivateRoute>
                    <ProductsRoutes />
                  </PrivateRoute>
                } />
                <Route path="/usuarios/*" element={
                  <PrivateRoute>
                    <UsersRoutes />
                  </PrivateRoute>
                } />

                {/* Redirect por defecto */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </UserProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;
