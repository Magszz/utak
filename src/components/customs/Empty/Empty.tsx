import { TableRow, TableCell } from "@/components/ui/table";
import Data from "@/assets/icons/Data";
import { Flex, Heading } from "@/components";
import { COLSPAN } from "@/lib/constant";

const Empty = () => {
  return (
    <TableRow>
      <TableCell className="h-96 py-24" colSpan={COLSPAN}>
        <Flex className="w-full">
          <div>
            <Data className="h-56" />
            <Heading type="h3" className="text-madison text-center my-5">
              NO DATA
            </Heading>
          </div>
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default Empty;
