import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { Product } from "src/interfaces/Product";
import Notiflix from "notiflix";

const index = ({ products,callbackRemove,setOpenDrawer,setProduct }: { products: Product[],callbackRemove:(id:string)=>void,setOpenDrawer:(value)=>void,setProduct:(value)=>void }) => {
  const handledDelete = (id: string, name: string) => {
    Notiflix.Confirm.Show(
      `Eliminar ${name}`,
      "Se eliminara el producto de manera permanente",
      "Eliminar",
      "Conservar",
      function () {
        callbackRemove(id)
      },
      {
        width: "320px",
        borderRadius: "8px",
        okButtonBackground: "#f50057",
        titleColor: "#f50057",
      }
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Creado</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.NameProduct}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Description}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Category}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.ProductQuantity}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Status ? "Activo" : "Desactivado"}
              </TableCell>
              <TableCell component="th" scope="row">
                {moment(row.TimeStamp).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell component="th" scope="row" style={{ display: "flex" }}>
                <Button variant="outlined" className="w-1/2" color="primary" onClick={()=>{
                  setOpenDrawer(true)
                  setProduct(row)
                  }}>
                  <EditIcon />
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginLeft: "1rem" }}
                  color="secondary"
                  className="w-1/2"
                  onClick={() => handledDelete(row._id, row.NameProduct)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default index;
