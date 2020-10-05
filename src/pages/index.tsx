import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import axios from "axios";
import { Product } from "src/interfaces/Product";
import Table from "src/components/Table";
import Notiflix from "notiflix";
import Form from "src/components/Form";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const Container = styled.div.attrs(() => ({
  className: "lg:my-16 my-6",
}))``;
const FilterContainer = styled.div.attrs(() => ({
  className: "flex justify-center w-full pb-6",
}))``;

const Home = ({ data }) => {
  const [, updated] = useReducer((x) => x + 1, 0);
  const [products, setProducts] = useState<Product[]>(data);
  const [product, setProduct] = useState<Product>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [filterNameProducts, setFilterNameProducts] = useState<Product[]>(data);
  const [filterCategoryProducts, setFilterCategoryProducts] = useState<
    Product[]
  >(data);
  const [filter, setFilter] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handledInputChanage = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    const allProducts = products;
    const productFilters =
      event.target.value !== ""
        ? products.filter((el) => el.NameProduct.toLowerCase().includes(name))
        : allProducts;
    setFilterNameProducts(productFilters);
  };

  const handledChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    console.log(event.target.value);
    const allProducts = products;
    const productFilters =
      event.target.value !== ""
        ? products.filter((el) => el.Category.toString() == event.target.value)
        : allProducts;
    setFilterCategoryProducts(productFilters);
  };

  const handledCancelFilter = () => {
    setFilter("");
  };

  const handledRemoveItem = async (id: string) => {
    Notiflix.Loading.Standard("Procesando...", {
      backgroundColor: "rgba(152,149,149,0.5)",
      svgColor: "#327fc6",
      messageColor: "#ffffff",
    });

    const resp = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`
    );
    if (resp.status == 200) {
      Notiflix.Loading.Remove();
      const array = products;
      var removeIndex = array.map((item) => item._id).indexOf(id);

      array.splice(removeIndex, 1);

      setProducts(array);
      setFilterCategoryProducts(array);
      setFilterNameProducts(array);
      updated();
      Notiflix.Notify.Success("Producto eliminado con exito");
    } else {
      Notiflix.Notify.Failure(
        "Lo sentimos, ha sucedido un error al procesar tu solicitud"
      );
    }
  };

  const handledUpdateFunction = (item) => {
    const array = products;
    var removeIndex = array.map((item) => item._id).indexOf(item._id);

      array.splice(removeIndex, 1);

      array.push(item)

      setProducts(array);
      setFilterCategoryProducts(array);
      setFilterNameProducts(array);
      updated();
  };


  const handledCreateFunction = (item) => {
    const array = products;
    array.push(item);
    setProducts(array);
    setFilterCategoryProducts(array);
    setFilterNameProducts(array);
    updated();
  };

  return (
    <Container>
      <Drawer
        anchor="left"
        open={openDrawer}
        className="lg:w-1/2 w-10/12"
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Form
          productEdit={product}
          updateCallback={handledUpdateFunction}
          createCallback={handledCreateFunction}
          setOpenDrawer={setOpenDrawer}
        />
      </Drawer>
      <FilterContainer>
        <div>
          <Button
            variant="contained"
            color={filter == "Name" ? "primary" : "default"}
            disableElevation
            onClick={() => setFilter("Name")}
          >
            Filtar por nombre
          </Button>
          <Button
            variant="contained"
            color={filter == "Category" ? "primary" : "default"}
            disableElevation
            style={{ marginLeft: "2rem" }}
            onClick={() => setFilter("Category")}
          >
            Filtrar por categoria
          </Button>
        </div>
      </FilterContainer>
      <FilterContainer>
        {filter !== "" && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handledCancelFilter}
          >
            Cancelar
          </Button>
        )}
      </FilterContainer>
      <FilterContainer>
        {filter == "Name" && (
          <TextField
            value={name}
            id="Name"
            label="Product Name"
            variant="outlined"
            onChange={handledInputChanage}
          />
        )}
        {filter == "Category" && (
          <FormControl variant="outlined" className="lg:w-1/6 w-1/2">
            <InputLabel id="category-label">Categoria</InputLabel>
            <Select
              labelId="category-label"
              id="select-outlined"
              value={category}
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
        )}
      </FilterContainer>
      <div className="flex justify-end px-12">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenDrawer(true);
            setProduct(null);
          }}
        >
          <AddCircleOutlineIcon /> Crear nuevo producto
        </Button>
      </div>
      <Table
        products={
          filter == "Name"
            ? filterNameProducts
            : filter == "Category"
            ? filterCategoryProducts
            : products
        }
        callbackRemove={handledRemoveItem}
        setOpenDrawer={setOpenDrawer}
        setProduct={setProduct}
      />
    </Container>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
  return {
    props: {
      data,
    },
  };
}

export default Home;
{
  /* <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head> */
}
