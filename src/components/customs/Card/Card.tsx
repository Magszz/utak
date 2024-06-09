import { Stocks, Sales, Investment } from "@/assets/icons";
import { Heading, Subheading } from "@/components";

interface Props {
  name: "stocks" | "investments" | "sales";
  title: string;
  total: number;
}

const Card = ({ name, title, total }: Props) => {
  const renderIcon = () => {
    switch (name) {
      case "stocks":
        return <Stocks className="w-6 fill-primary" />;
      case "investments":
        return <Investment className="w-6 fill-primary" />;
      case "sales":
      default:
        return <Sales className="w-6 fill-primary" />;
    }
  };

  return (
    <div className="rounded border h-40 p-6 px-4">
      <div className="rounded-md bg-orange-100 p-2 w-fit">{renderIcon()}</div>

      <div className="my-5">
        <Subheading fontSize="sm" className="font-semibold text-gray-600">
          {title}
        </Subheading>
        <Heading type="h3">{total}</Heading>
      </div>
    </div>
  );
};

export default Card;
