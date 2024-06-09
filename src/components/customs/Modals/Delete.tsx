import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { TooltipWrapper } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import useDatabase from "@/hooks/useDatabase";
import { DB_LOCATION } from "@/lib/loc";
import { useState } from "react";
import { modalLang } from "@/lib/lang/modalLang";

interface Props {
  id: string;
  productName: string;
}

const Delete = ({ id, productName }: Props) => {
  const { deleteData } = useDatabase();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteHandler = async () => {
    await deleteData(`${DB_LOCATION.products}/${id}`);
    setIsOpen(false);
  };

  return (
    <TooltipWrapper text="Delete" side="top">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-archivo text-madison">
              {modalLang.delete.title(productName)}
            </DialogTitle>
            <DialogDescription className="font-montserrat">
              {modalLang.delete.description(productName)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-2">
            <DialogClose>
              <Button type="button" variant="outline">
                {modalLang.delete.buttons.close}
              </Button>
            </DialogClose>
            <Button onClick={deleteHandler} type="button" variant="destructive">
              {modalLang.delete.buttons.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipWrapper>
  );
};

export default Delete;
