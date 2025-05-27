import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const ProductContext = createContext()

const BASE_URL = "http://localhost:3000/productos"

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await axios.get(BASE_URL)
      setProducts(res.data.data)
    } catch (error) {
      console.error('Error al obtener productos', error)
    } finally {
      setLoading(false)
    }
  }

    const getProductById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`)
      return res.data.data
    } catch (error) {
      console.error('Error al obtener producto por ID', error)
      return null
    }
  }

  const createProduct = async (product) => {
    try {
      const res = await axios.post(BASE_URL, product)
      setProducts([...products, res.data.data])
    } catch (error) {
      console.error('Error al crear producto', error)
    }
  }

    const updateProduct = async (id, updatedData) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, updatedData)
      setProducts(products.map(p => (p.id === id ? { ...p, ...updatedData } : p)))
    } catch (error) {
      console.error('Error al actualizar producto', error)
    }
  }

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
         }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext);