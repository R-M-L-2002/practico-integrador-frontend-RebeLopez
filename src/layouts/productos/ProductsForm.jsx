import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useProducts } from "../../context/ProductContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, createProduct, updateProduct } = useProducts();

  const [initialValues, setInitialValues] = useState({
    nombre: "",
    precio: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((foundProduct) => {
          if (foundProduct) {
            setInitialValues({
              nombre: foundProduct.nombre,
              precio: foundProduct.precio
            });
          }
        })
        .catch((error) => {
          console.error("Error al obtener producto", error);
        });
    }
  }, [id, getProductById]);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre del producto es obligatorio'),
    precio: Yup.number()
      .typeError('Debe ser un número')
      .positive('El precio debe ser mayor a 0')
      .required('El precio es obligatorio')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const dataToSend = {
      ...values,
      precio: parseFloat(values.precio)
    };

    if (id) {
      updateProduct(id, dataToSend)
        .then(() => {
          setSuccessMessage("Producto actualizado exitosamente");
          setSubmitting(false);
          setTimeout(() => navigate('/productos'), 1500);
        })
        .catch(() => {
          setSubmitting(false);
        });
    } else {
      createProduct(dataToSend)
        .then(() => {
          setSuccessMessage("Producto creado exitosamente");
          setSubmitting(false);
          setTimeout(() => navigate('/productos'), 1500);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">{id ? "Editar Producto" : "Crear Nuevo Producto"}</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
          {successMessage}
        </div>
      )}

      <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">Nombre</label>
              <Field
                id="nombre"
                name="nombre"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Producto"
              />
              <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="precio" className="block text-gray-700 font-medium mb-1">Precio</label>
              <Field
                id="precio"
                name="precio"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="$"
              />
              <ErrorMessage name="precio" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow transition duration-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {id ? "Actualizar" : "Crear"}
              </button>

              <Link
                to="/productos"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Volver
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
