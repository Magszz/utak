import { Filter } from "../typings/Typings";

// * FOR REQUIRED FIELDS
export const formDefaultValues = {
  productName: "",
  category: "",
  price: "",
  cost: "",
  options: "",
  stockAmount: "",
};

export const defaultFilterBy: Filter = {
  orderBy: "",
  equalTo: "",
};
