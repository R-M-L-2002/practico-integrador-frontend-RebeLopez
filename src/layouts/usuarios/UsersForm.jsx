import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useUsers } from "../../context/UserContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UsersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createUser, updateUser, getUserById } = useUsers();

  const [initialValues, setInitialValues] = useState({
    nombre: "",
    email: "",
    edad: '',
    password: '',
    rol: 'cliente'
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((foundUser) => {
          if (foundUser) {
            setInitialValues({
              nombre: foundUser.nombre || "",
              email: foundUser.email || "",
              edad: foundUser.edad !== undefined ? String(foundUser.edad) : '',
              password: "", // nunca se llena el password al editar
              rol: foundUser.rol || "cliente"
            });
          }
        })
        .catch(console.error);
    }
  }, [id, getUserById]);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre de usuario es obligatorio'),
    email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
    edad: Yup.number().typeError('Debe ser un número').positive('La edad debe ser mayor a 0').required('La edad es obligatoria'),
    password: id ? Yup.string() : Yup.string().required('La contraseña es obligatoria'),
    rol: Yup.string().oneOf(['admin','moderador','cliente'])
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const dataToSend = {
      nombre: values.nombre,
      email: values.email,
      edad: parseFloat(values.edad),
      password: values.password || "123456", // default si no se pone password al editar
      rol: values.rol
    };

    if (id) {
      updateUser(id, dataToSend)
        .then(() => {
          setSuccessMessage("Usuario actualizado exitosamente");
          setSubmitting(false);
          setTimeout(() => navigate('/usuarios'), 1500);
        })
        .catch(() => setSubmitting(false));
    } else {
      createUser(dataToSend)
        .then(() => {
          setSuccessMessage("Usuario creado exitosamente");
          setSubmitting(false);
          setTimeout(() => navigate('/usuarios'), 1500);
        })
        .catch(() => setSubmitting(false));
    }
  };

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
              <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">Nombre</label>
              <Field id="nombre" name="nombre" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nombre de usuario" />
              <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <Field id="email" name="email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="email@ejemplo.com" />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="edad" className="block text-gray-700 font-medium mb-1">Edad</label>
              <Field id="edad" name="edad" type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Edad" />
              <ErrorMessage name="edad" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Contraseña</label>
              <Field id="password" name="password" type="password" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contraseña" />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="rol" className="block text-gray-700 font-medium mb-1">Rol</label>
              <Field as="select" id="rol" name="rol" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
                <option value="moderador">Moderador</option>
              </Field>
            </div>

            <div className="flex justify-between items-center">
              <button type="submit" disabled={isSubmitting} className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                {id ? "Actualizar" : "Crear"}
              </button>

              <Link to="/usuarios" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Volver
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsersForm;
