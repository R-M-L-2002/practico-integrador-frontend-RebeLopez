import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext"; 
import ProductsRoutes from "./components/productos";
import UsersRoutes from "./components/usuarios";
import Home from "./home";
import 'primeicons/primeicons.css'; 
import './App.css';

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-purple-900 text-white p-4 flex justify-center space-x-8">
      <Link to="/" className="hover:underline flex items-center gap-2">
        <i className="pi pi-home"></i> Inicio
      </Link>
      <Link to="/productos" className="hover:underline flex items-center gap-2">
        <i className="pi pi-box"></i> Productos
      </Link>
      <Link to="/usuarios" className="hover:underline flex items-center gap-2">
        <i className="pi pi-users"></i> Usuarios
      </Link>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <ProductProvider>
        <UserProvider>
          <div className="min-h-screen w-full bg-gray-200 pt-16">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos/*" element={<ProductsRoutes />} />
              <Route path="/usuarios/*" element={<UsersRoutes />} />
            </Routes>
          </div>
        </UserProvider>
      </ProductProvider>
    </Router>
  )
}

export default App

