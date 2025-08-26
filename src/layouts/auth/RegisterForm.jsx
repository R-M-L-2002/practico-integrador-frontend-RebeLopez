import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);

  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    edad: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo requerido"),
    edad: Yup.number()
      .typeError("Debe ser un número")
      .min(1, "Edad mínima 1")
      .max(120, "Edad máxima 120")
      .required("Campo requerido"),
  });

  const onSubmit = async (values) => {
    await register(values);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre completo"
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="email@ejemplo.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Contraseña"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Edad</label>
              <input
                type="number"
                name="edad"
                value={values.edad}
                onChange={(e) => setFieldValue("edad", e.target.value)}
                min={1}
                max={120}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Edad"
              />
              <ErrorMessage
                name="edad"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
