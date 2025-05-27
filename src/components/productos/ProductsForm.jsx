import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useProducts } from "../../context/ProductContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, createProduct, updateProduct } = useProducts();

  const [initialValues, setInitialValues] = useState({
    name: "",
    price: ''
  });

  // Estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((foundProduct) => {
          if (foundProduct) {
            setInitialValues({
              name: foundProduct.name,
              price: foundProduct.price
            });
          }
        })
        .catch((error) => {
          console.error("Error al obtener producto", error);
        });
    }
  }, [id, getProductById]);

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre del producto es obligatorio'),
    price: Yup.number()
      .typeError('Debe ser un número')
      .positive('El precio debe ser mayor a 0')
      .required('El precio es obligatorio')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const dataToSend = {
      ...values,
      price: parseFloat(values.price)
    };

    if (id) {
      updateProduct(id, dataToSend)
        .then(() => {
          setSuccessMessage("Producto actualizado con éxito");
          setSubmitting(false);
          // Opcional: navegar después de un tiempo
          setTimeout(() => navigate('/productos'), 1500);
        })
        .catch(() => {
          setSubmitting(false);
          // Aquí podés manejar errores si querés
        });
    } else {
      createProduct(dataToSend)
        .then(() => {
          setSuccessMessage("Producto creado con éxito");
          setSubmitting(false);
          setTimeout(() => navigate('/productos'), 1500);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <div> 
      <h2>{id ? "Editar Producto" : "Crear Nuevo Producto"}</h2>

      {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}

      <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Nombre</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="price">Precio</label>
              <Field name="price" />
              <ErrorMessage name="price" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {id ? "Actualizar" : "Crear"}
            </button>
            <Link to="/productos">Volver</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
