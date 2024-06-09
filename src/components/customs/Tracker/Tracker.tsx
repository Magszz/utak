/* eslint-disable react-hooks/exhaustive-deps */
import { Subheading, Grid, Heading, Card } from "@/components";
import { containerLang } from "@/lib/lang/containerLang";
import { Sales, TProduct } from "@/lib/typings/Typings";
import { useState, useEffect } from "react";

interface Props {
  products: TProduct[];
}

const Tracker = ({ products }: Props) => {
  const [total, setTotal] = useState<Sales>({
    price: 0,
    investment: 0,
    stocks: 0,
  });

  //   * COMPUTE FOR TOTAL INVESTMENT, STOCKS & EXPECTED SALES
  // ? FORMULA FOR EXPECTED SALES (TOTAL PRODUCTS PRICE - TOTAL INVESTMENT) * STOCKS
  const computeSales = () => {
    const totalSales: Sales = {
      price: 0,
      investment: 0,
      stocks: 0,
    };

    products?.forEach((product) => {
      totalSales.stocks += parseFloat(product.stockAmount);
      totalSales.investment += parseFloat(product.cost);
      totalSales.price += parseFloat(product.price);
    });

    setTotal(totalSales);
  };

  useEffect(() => {
    computeSales();
  }, [products]);

  return (
    <div className="px-4">
      {/* Header text */}
      <div className="w-full sm:w-1/2 mb-2">
        <Heading className="!text-lightBlack/85 mb-1 font-semibold" type="h3">
          {containerLang.tracker.header.heading}
        </Heading>
        <Subheading className="text-gray-600" fontSize="sm">
          {containerLang.tracker.header.subheading}
        </Subheading>
      </div>
      <Grid className="w-full gap-4  mb-4">
        <Card
          name="stocks"
          title={containerLang.tracker.stocks}
          total={total.stocks}
        />
        <Card
          name="sales"
          title={containerLang.tracker.sales}
          total={(total.price - total.investment) * total.stocks}
        />
        <Card
          name="investments"
          title={containerLang.tracker.investment}
          total={total.investment}
        />
      </Grid>
    </div>
  );
};

export default Tracker;
