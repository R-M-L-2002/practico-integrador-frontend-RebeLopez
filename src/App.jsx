import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import ProductsRoutes from "./components/productos";
import './App.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
          <Route path="/productos/*" element={<ProductsRoutes />} />
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
