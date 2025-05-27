import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useUsers } from "../../context/UserContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UsersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, createUser, updateUser } = useUsers()

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    age: ''
  })

  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((foundUser) => {
          if (foundUser) {
            setInitialValues({
              name: foundUser.name,
              email: foundUser.email,
              age: foundUser.age
            });
          }
        })
        .catch((error) => {
          console.error("Error al obtener el usuario", error)
        });
    }
  }, [id, getUserById])

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre de usuario es obligatorio'),
    email: Yup.string()
      .email('El email no es valido')
      .required('El email es obligatorio'),
    age: Yup.number()
      .typeError('Debe ser un numero')
      .positive('La edad debe ser mayor a 0')
      .required('La edad es obligatoria')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const dataToSend = {
      ...values,
      age: parseFloat(values.age)
    };

    if (id) {
      updateUser(id, dataToSend)
        .then(() => {
          setSuccessMessage("Usuario actualizado exitosamente")
          setSubmitting(false)
          setTimeout(() => navigate('/usuarios'), 1500)
        })
        .catch(() => {
          setSubmitting(false)
        });
    } else {
      createUser(dataToSend)
        .then(() => {
          setSuccessMessage("Usuario creado exitosamente")
          setSubmitting(false)
          setTimeout(() => navigate('/usuarios'), 1500)
        })
        .catch(() => {
          setSubmitting(false)
        })
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">{id ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>

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
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre de usuario"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@ejemplo.com"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700 font-medium mb-1">Edad</label>
              <Field
                id="age"
                name="age"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Edad"
              />
              <ErrorMessage name="age" component="div" className="text-red-600 text-sm mt-1" />
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
                to="/usuarios"
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

export default UsersForm
