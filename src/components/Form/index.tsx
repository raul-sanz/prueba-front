import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Product, productDefault } from "src/interfaces/Product";
import Notiflix from "notiflix";

const index = ({
  productEdit,
  updateCallback,
  createCallback,
  setOpenDrawer
}: {
  productEdit?: Product;
  updateCallback: (value) => void;
  createCallback: (value) => void;
  setOpenDrawer: (value)=>void
}) => {
  const [product, setProduct] = useState(productEdit || productDefault);

  const handledChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    let value;
    event.target.value || event.target.checked;
    switch (event.target.name) {
      case "Status":
        value = event.target.checked;
        break;
      case "ProductQuantity":
        value = Number(event.target.value);
        break;

      default:
        value = event.target.value;
        break;
    }
    setProduct({ ...product, [event.target.name]: value });
  };

  const handledSendData = async () => {
    Notiflix.Loading.Standard("Procesando...", {
      backgroundColor: "rgba(152,149,149,0.5)",
      svgColor: "#327fc6",
      messageColor: "#ffffff",
    });
    if (product._id != "") {
      
      try {
        const resp = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/update/${product._id}`,
          product
        );
        Notiflix.Notify.Success("Producto actualizado con exito");
        updateCallback(resp.data.product)
        Notiflix.Loading.Remove();
        setOpenDrawer(false)
      } catch (error) {
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure('Lo sentimos, ha sucedido un error al procesar tu solicitud');
        setOpenDrawer(false)
      }
    } else {
      const productToSend = product;
      delete productToSend._id;
      console.log(productToSend);
      try {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/create`,
          productToSend
        );
        console.log(resp);
        Notiflix.Notify.Success("Producto creado con exito");
        createCallback(resp.data.product);
        Notiflix.Loading.Remove();
        setOpenDrawer(false)
      } catch (error) {
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure('Lo sentimos, ha sucedido un error al procesar tu solicitud');
        setOpenDrawer(false)
      }
    }
  };
  return (
    <div className="flex flex-wrap">
      <div className="w-full justify-center flex py-4">
        <TextField
          name="NameProduct"
          onChange={handledChangeSelect}
          value={product.NameProduct}
          label="Nombre del producto"
          variant="outlined"
        />
      </div>
      <div className="w-full justify-center flex py-4">
        <FormControl variant="outlined" className="lg:w-1/6 w-1/2">
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category-label"
            id="select-outlined"
            value={product.Category}
            name="Category"
            onChange={handledChangeSelect}
            label="Categoria"
          >
            <MenuItem value="">
              <em>Selecciona una opcion</em>
            </MenuItem>
            <MenuItem value="Bebidas">Bebidas</MenuItem>
            <MenuItem value="Limpieza">Limpieza</MenuItem>
            <MenuItem value="Botanas">Botanas</MenuItem>
            <MenuItem value="Cremeria">Cremeria</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-full justify-center flex py-4">
        <TextField
          name="Description"
          onChange={handledChangeSelect}
          value={product.Description}
          label="Descripcion del producto"
          variant="outlined"
        />
      </div>
      <div className="w-full justify-center flex py-4">
        <TextField
          name="ProductQuantity"
          onChange={handledChangeSelect}
          value={product.ProductQuantity}
          label="Productos en almacen"
          variant="outlined"
        />
      </div>

      <div className="w-full justify-center flex py-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={product.Status}
              onChange={handledChangeSelect}
              name="Status"
            />
          }
          label="Status (Activo o Inactivo)"
        />
      </div>

      <div className="w-full justify-center flex py-4">
        <Button variant="outlined" color="inherit" onClick={handledSendData}>
          Guardar
        </Button>
      </div>
    </div>
  );
};

/* {
  "NameProduct": "galleta marias 12",
  "Category": "Bebidas",
  "Description": "true",
  "ProductQuantity": 10,
  "Status": true,
  "nombre":"asdds"
} */

export default index;
