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
import { SORT_BY } from "@/lib/constant";
import { containerLang } from "@/lib/lang/containerLang";
import { SortBy } from "@/lib/typings/Typings";
import { ArrowDownUp } from "lucide-react";

interface Props {
  onValueChange: (value: string) => void;
  value: string;
}

const Sort = ({ value, onValueChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <ArrowDownUp className="w-5 h-5 mr-2" />
          {containerLang.sort.button}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-[400px]">
        <DropdownMenuLabel>{containerLang.sort.label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {SORT_BY?.map((sortBy: SortBy) => (
            <DropdownMenuRadioItem key={sortBy.value} value={sortBy.value}>
              {sortBy.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
