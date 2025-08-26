import { Routes, Route } from "react-router-dom";
import ProductsView from "./ProductsView"; 
import ProductsForm from "./ProductsForm";

const ProductsRoutes = () => {
  return (
    <Routes>
      {/* Todos los unicornios */}
      <Route path="/" element={<ProductsView />} />
      
      {/* Ruta para crear */}
      <Route path="/crear" element={<ProductsForm />} />
      
      {/* Ruta para editar */}
      <Route path="/editar/:id" element={<ProductsForm />} />
    </Routes>
  );
}

export default ProductsRoutes;