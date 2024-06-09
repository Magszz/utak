import Box from "@/assets/icons/Box";
import { Delete, Update, Flex, Paragraph } from "@/components";
import { TableRow, TableCell } from "@/components/ui/table";
import { TProduct } from "@/lib/typings/Typings";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

const Product = ({
  category,
  id,
  options,
  price,
  productName,
  stockAmount,
  image,
  cost,
  dateCreated,
  lastModified,
}: TProduct) => {
  dayjs.extend(LocalizedFormat);
  const optionList = options?.split(",");
  const product: TProduct = {
    category,
    lastModified,
    id,
    options,
    price,
    productName,
    stockAmount,
    image,
    cost,
    dateCreated,
  };

  return (
    <TableRow>
      <TableCell title={productName?.toUpperCase()}>
        <Flex className="gap-6 w-full" variant="startCentered">
          {image ? (
            <div className="w-16 h-12">
              <img
                src={image}
                alt="Product Image"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="rounded-full">
              <Box className="w-12 h-12 fill-primary" />
            </div>
          )}
          <Paragraph fontSize="md" className="w-full truncate">
            {productName?.toUpperCase()}
          </Paragraph>
        </Flex>
      </TableCell>
      <TableCell className="uppercase font-semibold">{category}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{stockAmount}</TableCell>
      <TableCell>{dayjs(dateCreated).format("LL LT")}</TableCell>
      <TableCell>{dayjs(lastModified).format("LL LT")}</TableCell>
      <TableCell>
        <Flex variant="startCentered" className="gap-1 flex-wrap">
          {optionList?.map((option: string, idx: number) => (
            <span
              key={`option-${idx}`}
              className="p-1 px-2 rounded-2xl border !text-xs font-montserrat uppercase"
            >
              {option}
            </span>
          ))}
        </Flex>
      </TableCell>
      <TableCell>
        <Flex variant="startCentered" className="w-full gap-2">
          <Update product={product} />
          <Delete id={id} productName={productName} />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default Product;
