import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const ProductContext = createContext()

const BASE_URL = "http://localhost:3000/productos"

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Obtener todos los productos
  const fetchProducts = async () => {
    try {
      const res = await axios.get(BASE_URL)
      setProducts(res.data.data || []) // por si viene undefined
    } catch (error) {
      console.error('Error al obtener productos', error)
    } finally {
      setLoading(false)
    }
  }

  // Obtener producto por ID
  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`)
      return res.data.data
    } catch (error) {
      console.error('Error al obtener producto por ID', error)
      return null
    }
  }

  // Crear producto
  const createProduct = async (product) => {
    try {
      // Validar campos antes de enviar
      if (!product.nombre || product.precio === undefined || product.precio === null) {
        console.error('Faltan datos obligatorios para crear producto')
        return
      }

      // Asegurarse que precio sea numero
      const payload = {
        nombre: product.nombre,
        precio: parseFloat(product.precio)
      }

      const res = await axios.post(BASE_URL, payload, {
        headers: { 'Content-Type': 'application/json' }
      })

      setProducts([...products, res.data.data])
    } catch (error) {
      console.error('Error al crear producto', error.response?.data || error.message)
    }
  }

  // Actualizar producto
  const updateProduct = async (id, updatedData) => {
    try {
      const payload = {
        nombre: updatedData.nombre,
        precio: parseFloat(updatedData.precio)
      }

      await axios.put(`${BASE_URL}/${id}`, payload, {
        headers: { 'Content-Type': 'application/json' }
      })

      await fetchProducts() // refrescar lista
    } catch (error) {
      console.error('Error al actualizar producto', error.response?.data || error.message)
    }
  }

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error al eliminar producto', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading, 
        getProductById,
        createProduct, 
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
