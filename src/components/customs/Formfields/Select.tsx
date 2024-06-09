import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/typings/Typings";
import { ControllerRenderProps } from "react-hook-form";
import { ProductSchema } from "@/lib/schema/ProductSchema";
import { z } from "zod";

type ProductData = z.infer<typeof ProductSchema>;

interface Props {
  placeholder: string;
  className?: string;
  options: Category[];
  defaultValue?: string;
  field: ControllerRenderProps<ProductData, "category">;
}

const Select = ({
  placeholder,
  className,
  options,
  defaultValue,
  field,
}: Props) => {
  return (
    <SelectContainer defaultValue={defaultValue} onValueChange={field.onChange}>
      <SelectTrigger value={field.value} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option: Category, idx: number) => (
          <SelectItem value={option.value} key={`option-${idx}`}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
};

export default Select;
