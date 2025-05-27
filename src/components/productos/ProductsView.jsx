import React from 'react'
import { useProducts } from '../../context/ProductContext'
import { Link } from 'react-router-dom'

const ProductsView = () => {
  const { products, loading, deleteProduct } = useProducts()

  if (loading) return <p>Cargando productos...</p>

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      deleteProduct(id)
    }
  }

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} {" "}
            <Link to={`/productos/editar/${p.id}`}>
              <button>Editar</button>
            </Link>
            {" "}
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <Link to="/productos/crear">
        <button>Agregar Producto</button>
      </Link>
    </div>
  )
}

export default ProductsView
