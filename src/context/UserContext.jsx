import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const BASE_URL = "http://localhost:3000/usuarios";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res.data.data || []);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener un usuario por ID
  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.data || null;
    } catch (error) {
      console.error('Error al obtener usuario por ID', error);
      return null;
    }
  };

  // Crear un nuevo usuario
  const createUser = async (user) => {
    try {
      const res = await axios.post(BASE_URL, user);
      setUsers([...users, res.data.data]);
    } catch (error) {
      console.error('Error al crear el usuario', error);
    }
  };

  // Actualizar un usuario existente
  const updateUser = async (id, updatedData) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, updatedData);
      await fetchUsers(); // refrescar lista
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  // Eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, getUserById, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
