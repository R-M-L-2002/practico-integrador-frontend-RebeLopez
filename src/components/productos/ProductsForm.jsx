import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useProducts } from "../../context/ProductContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { create } from "flowbite-react/cli/commands/create";

const ProductForm = () => {
    const [ id ] = useParams();
    const navigate = usenavigate();
    const { getProductById, createProduct, UpdateProduct } = useProducts
}

  const [product, setProduct] = useState({
    name: "",
    price: ""
  })

  useEffect(() => {
    if (id) {
        const foundProduct = getProductById(id);
        if (foundProduct) {
            setProduct(foundProduct)
        }
    }
  }, [id, getProductById])

  const validationSchema = Yup.object({
    name: Yup.string(required('El nombre del producto es obligatorio')),
    price: Yup.number()
      .positive('El precio debe ser mayor a 0')
      .required('El precio es obligatorio')
  }) 

  const handleSubmit = (values) => {
    if (id) {
        UpdateProduct(id, values);
    } else {
        createProduct(values);
    }
    navigate('/productos')
  }
  