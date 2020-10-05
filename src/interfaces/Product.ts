export interface Product {
  _id: string;
  NameProduct: string;
  Category: Category;
  Description: string;
  ProductQuantity: number;
  Status: boolean;
  TimeStamp: string;
  __v: number;
}

enum Category {
  "Bebidas",
  "Limpieza",
  "Botanas",
  "Cremeria",
}

export const productDefault = {
  _id:'',
  NameProduct: '',
  Category: '',
  Description: '',
  ProductQuantity: 0,
  Status: false
}
