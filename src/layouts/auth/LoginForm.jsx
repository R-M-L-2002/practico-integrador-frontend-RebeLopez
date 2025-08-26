import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const initialValuesUser = {
    email: "",
    password: "",
  };

  const validationSchemaUser = Yup.object({
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });

  const onSubmitLogin = async (values) => {
    await login(values);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

      <Formik
        initialValues={initialValuesUser}
        validationSchema={validationSchemaUser}
        onSubmit={onSubmitLogin}
      >
        {({ handleChange, values, isSubmitting }) => (
          <Form className="space-y-4">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Iniciar sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
