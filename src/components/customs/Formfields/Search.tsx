import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
  className?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ className, ...props }: Props) => {
  return (
    <div className={`w-full relative ${className}`}>
      <SearchIcon className="w-4 absolute top-1/2 -translate-y-1/2 right-4" />
      <Input className="pr-8 pl-2 py-1" {...props} />
    </div>
  );
};

export default Search;
