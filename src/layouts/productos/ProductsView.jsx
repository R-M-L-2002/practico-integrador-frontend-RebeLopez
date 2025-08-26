import { useProducts } from '../../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import exportToPDF from '../../utils/exportToPdf'
import 'primeicons/primeicons.css'; 
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const ProductsView = () => {
  const { products, loading, deleteProduct } = useProducts()
  const navigate = useNavigate() 
  const { user } = useContext(AuthContext) // <-- obtenemos el usuario logueado

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando productos...</p>

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      deleteProduct(id)
    }
  }

  const productColumns = [
    { header: "Nombre", field: "nombre", width: 70 },
    { header: "Precio", field: "precio", width: 40, format: val => `$${val.toFixed(2)}` },
  ]

  const handleExport = () => {
    exportToPDF("Productos", products, productColumns)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 px-6 py-4 text-white text-center rounded-lg shadow mb-8">
        Lista de Productos
      </h1>

      <div className="mb-6 flex justify-center">
        {user && user.rol === 'admin' && (
          <Link to="/productos/crear">
            <button className="bg-purple-400 hover:bg-pink-700 text-white font-semibold py-2 px-5 rounded shadow transition duration-300">
              + Agregar Producto
            </button>
          </Link>
        )}
        <button
          onClick={handleExport}
          className="bg-gray-700 hover:bg-gray-900 text-white py-2 px-5 rounded shadow transition duration-300 ml-4"
        >
          Exportar a PDF
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos para mostrar.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {products.map(p => (
            <li key={p.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <div>
                <p className="font-semibold text-lg text-purple-700">{p.nombre}</p>
                <p className="text-gray-600">${p.precio.toFixed(2)}</p>
              </div>
              {user && user.rol === 'admin' && (
                <div className="flex gap-3">
                  <Link to={`/productos/editar/${p.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-4 rounded shadow transition duration-300 flex items-center gap-2">
                      <i className="pi pi-pencil"></i>
                      Editar
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white py-1.5 px-4 rounded shadow transition duration-300 flex items-center gap-2"
                  >
                    <i className="pi pi-trash"></i>
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded shadow transition duration-300"
        >
          Volver
        </button>
      </div>
    </div>
  )
}

export default ProductsView
