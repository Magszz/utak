/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Search,
  Filter,
  Product,
  Grid,
  Empty,
  Loading,
  Sort,
  Tracker,
  Create,
  Heading,
  Subheading,
} from "@/components";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";
import { TABLE_COLUMNS } from "@/lib/constant";
import {
  Column,
  Filter as TFilter,
  Product as TProduct,
} from "@/lib/typings/Typings";
import useDatabase from "@/hooks/useDatabase";
import { ChangeEvent, useEffect, useState } from "react";
import { DB_LOCATION } from "@/lib/loc";
import _ from "lodash";
import { defaultFilterBy } from "@/lib/static/defaultValues";
import { containerLang } from "@/lib/lang/containerLang";

const Products = () => {
  const [activeQuery, setActiveQuery] = useState<TFilter>({
    orderBy: "",
    equalTo: "",
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<string>("default");
  const { products, getData, loading } = useDatabase();

  // * GET DATA FROM DB
  useEffect(() => {
    getData(DB_LOCATION.products);
  }, []);

  // * SEARCH FOR PRODUCT (MUST MATCH)
  const searchProduct = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
    const filterBy = {
      orderBy: "productName",
      equalTo: e.target.value.toLowerCase(),
    };

    getData(DB_LOCATION.products, filterBy);
    setActiveQuery(filterBy);
  }, 250);

  // * FILTER BY CATEGORY OF PRODUCT
  const filterCategory = (val: string) => {
    const filterBy = {
      orderBy: "category",
      equalTo: val,
    };
    const filter = val === "all" ? defaultFilterBy : filterBy;
    setActiveQuery(filter);
    setFilter(val);
    getData(DB_LOCATION.products, filter);
  };

  // * SORT PRODUCTS
  const sortProducts = (val: string) => {
    getData(DB_LOCATION.products, activeQuery, val);
    setSort(val);
  };

  return (
    <div className="w-full px-8 py-4 relative">
      {/* TOTAL STOCKS / SALES / INVESMENT OVERVIEW */}
      <Tracker products={products} />

      {/* TABLE HEADER */}
      <div className="mx-4 mt-2 border rounded-md">
        {/* Header text */}
        <div className="w-full sm:w-1/2 px-4 py-2 pt-4">
          <Heading className="!text-lightBlack/85 mb-1 font-semibold" type="h3">
            {containerLang.productList.header.heading}
          </Heading>
          <Subheading className="text-gray-600" fontSize="sm">
            {containerLang.productList.header.subheading}
          </Subheading>
        </div>

        {/* Filter / Sort / Search */}
        <Grid className="p-4 pb-6 border-b gap-4 justify-items-end">
          <div className="w-full">
            <Search
              onChange={searchProduct}
              placeholder={containerLang.search.placeholder}
              className="!w-[60%] [&>input]:placeholder:font-montserrat"
            />
          </div>
          <Flex variant="centered" className="gap-2 w-fit">
            <Filter value={filter} onValueChange={filterCategory} />
            <Sort value={sort} onValueChange={sortProducts} />
            <Create />
          </Flex>
        </Grid>

        {/* TABLE */}
        <div className="p-4 w-full">
          <Table className="w-full table-auto">
            <TableCaption className="mt-5 mb-3">
              {containerLang.table.caption}
            </TableCaption>
            <TableHeader>
              <TableRow>
                {TABLE_COLUMNS?.map((column: Column) => (
                  <TableHead
                    key={`column-${column?.name}`}
                    className={`${column.className} whitespace-nowrap`}
                  >
                    {column.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {!products.length ? (
                    <Empty />
                  ) : (
                    products?.map((product: TProduct) => (
                      <Product {...product} key={`product-${product?.id}`} />
                    ))
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* NOTIFICATION CONTAINER */}
      <Toaster />
    </div>
  );
};

export default Products;
