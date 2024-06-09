import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter as FilterIcon } from "lucide-react";

import { Category } from "@/lib/typings/Typings";
import { CATEGORIES } from "@/lib/constant";
import { containerLang } from "@/lib/lang/containerLang";
interface Props {
  onValueChange: (val: string) => void;
  value: string;
}

const Filter = ({ value, onValueChange }: Props) => {
  const CATEGORIES_WITH_DEFAULT = [
    {
      name: "All Items",
      value: "all",
    },
    ...CATEGORIES,
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FilterIcon className="w-5 h-5 mr-2" />
          {containerLang.filter.button}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-[400px]">
        <DropdownMenuLabel>{containerLang.filter.label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {CATEGORIES_WITH_DEFAULT?.map((category: Category) => (
            <DropdownMenuRadioItem key={category.value} value={category.value}>
              {category.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
