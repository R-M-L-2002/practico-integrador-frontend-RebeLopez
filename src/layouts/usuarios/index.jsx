import { Routes, Route } from "react-router-dom";
import UsersView from "./UsersView"; 
import UsersForm from "./UsersForm";

const UsersRoutes = () => {
  return (
    <Routes>
      {/* Todos los unicornios */}
      <Route path="/" element={<UsersView />} />
      
      {/* Ruta para crear */}
      <Route path="/crear" element={<UsersForm />} />
      
      {/* Ruta para editar */}
      <Route path="/editar/:id" element={<UsersForm />} />
    </Routes>
  );
}

export default UsersRoutes;