export const modalLang = {
  create: {
    button: "Add New Product",
    title: "New Product",
    description: "Complete required fields to create new product",
  },
  update: {
    title: "Update Product",
  },
  delete: {
    title: (text: string) => `Delete ${text}`,
    description: (text: string) => `Are you sure to delete ${text}?`,
    buttons: {
      close: "Close",
      delete: "Delete",
    },
  },
};
