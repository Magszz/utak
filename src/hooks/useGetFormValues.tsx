import { RefObject } from "react";

const useGetFormValues = () => {
  const productForm = (formRef: RefObject<HTMLFormElement>) => {
    if (!formRef?.current) return;

    const { productName, category, price, cost, stockAmount, options } =
      formRef.current || {};

    return {
      productName: productName.value,
      category: category.value,
      price: price.value,
      cost: cost.value,
      stockAmount: stockAmount.value,
      options: options.value,
    };
  };

  return {
    productForm,
  };
};

export default useGetFormValues;
