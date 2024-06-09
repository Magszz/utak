export interface Category {
  name: string;
  value: string;
}

export interface SortBy extends Category {}
export interface Options extends Category {}

export interface Column {
  name: string;
  className?: string;
}

type Notif = {
  title: string;
  description: string;
};

export type NotifLang<T extends string> = {
  [Key in T]: {
    success?: Notif;
    error: Notif;
  };
};

export interface FormStatus {
  loading: boolean;
  open: boolean;
  disabled: boolean;
  allHasValues?: boolean;
}

export interface Product {
  category: string;
  cost: string;
  id: string;
  options: string;
  price: string;
  productName: string;
  stockAmount: string;
  image: string;
  dateCreated: string | number;
  lastModified: string | number;
}

export interface ImgInfo {
  fileName: string;
  file?: File | null;
}

export interface Filter {
  orderBy: string;
  equalTo: string;
}

export interface Sales {
  price: number;
  investment: number;
  stocks: number;
}

export type Sort = "productName" | "category" | "price" | "cost";
