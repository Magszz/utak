/* eslint-disable react-refresh/only-export-components */
import { Flex, Paragraph, Select } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { CATEGORIES } from "@/lib/constant";
import { Product } from "@/lib/typings/Typings";
import { SquarePen } from "lucide-react";
import { useRef, useState, memo } from "react";
import dayjs from "dayjs";
import useStorage from "@/hooks/useStorage";
import useDatabase from "@/hooks/useDatabase";
import { DB_LOCATION } from "@/lib/loc";
import { formLang } from "@/lib/lang/formLang";
import { modalLang } from "@/lib/lang/modalLang";
import useImageUpload from "@/hooks/useImageUpload";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schema/ProductSchema";

type ProductData = z.infer<typeof ProductSchema>;

interface Props {
  product: Product;
}

const Update = ({ product }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    mode: "onChange",
    defaultValues: {
      productName: product.productName,
      cost: product.cost,
      stockAmount: product.stockAmount,
      price: product.price,
      category: product.category,
      options: product.options,
    },
  });

  const { updateData } = useDatabase();
  const { uploadImage } = useStorage();
  const { imgInfo, setImgInfo, uploadToImgInput } = useImageUpload();

  // * SUBMIT FORM
  const formSubmit = async (data: ProductData) => {
    let imgURL: string | boolean = "";
    const dateNow = dayjs().valueOf();

    if (imgInfo?.file) {
      imgURL = await uploadImage(imgInfo.file, imgInfo.fileName || "");
    }

    // * THIS WILL CHECK IF THERE'S AN ERROR ON UPLOADING AN IMG TO STORAGE
    // * RETURN IF HAS
    if (!imgURL && imgInfo?.file) return;

    const response = await updateData(`${DB_LOCATION.products}/${product.id}`, {
      ...data,
      lastModified: dateNow,
      image: imgURL || product.image,
    });

    if (response) {
      reset();
      setIsOpen(false);
      setImgInfo({ fileName: "", file: null });
    }
  };

  return (
    <TooltipWrapper text="Update" side="top">
      <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" type="button">
            <SquarePen className="w-4  " />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
              <SquarePen className="w-6 text-blue-400" />
              <span>{modalLang.update.title}</span>
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <form
            ref={formRef}
            className="h-full"
            onSubmit={handleSubmit(formSubmit)}
          >
            <ScrollArea className="h-[90%] max-h-[65vh] pr-3">
              <div className="w-full create_form">
                <div className="mb-2">
                  <Label required htmlFor="productName">
                    {formLang.name.label}
                  </Label>
                  <Input
                    {...register("productName")}
                    type="text"
                    placeholder={formLang.name.placeholder}
                  />
                </div>

                <div className="mb-2">
                  <Label required htmlFor="category">
                    {formLang.category.label}
                  </Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        field={field}
                        defaultValue={product.category}
                        placeholder={formLang.category.placeholder}
                        options={CATEGORIES}
                      />
                    )}
                  />
                </div>

                <div className="mb-2">
                  <Label required htmlFor="price">
                    {formLang.price.label}
                  </Label>
                  <Input
                    {...register("price")}
                    type="number"
                    placeholder={formLang.price.placeholder}
                    id="price"
                    max={9999}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="cost">
                    {formLang.cost.label}
                  </Label>
                  <Input
                    {...register("cost")}
                    type="number"
                    placeholder={formLang.cost.placeholder}
                    id="cost"
                    max={9999}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="stockAmount">
                    {formLang.stock.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={formLang.stock.placeholder}
                    id="stockAmount"
                    {...register("stockAmount")}
                    max={9999}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="options">
                    {formLang.options.label}
                  </Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    {formLang.options.note}
                    {"  "}
                    <span className="text-red-500 font-semibold">
                      {formLang.options.note2}
                    </span>
                  </Paragraph>
                  <Input
                    type="text"
                    placeholder="Enter product options"
                    id="options"
                    {...register("options")}
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="image">{formLang.image.label}</Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    {formLang.image.note}{" "}
                    <span className="font-semibold">
                      {formLang.image.note2}
                    </span>
                  </Paragraph>
                  <Input
                    accept="image/jpeg, image/png, image/jpg"
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => uploadToImgInput(e, formRef)}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Flex variant="endCentered" className="gap-2 mt-6">
                <DialogClose>
                  <Button type="button" size="sm" variant="outline">
                    {formLang.buttons.close}
                  </Button>
                </DialogClose>
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  type="submit"
                  size="sm"
                  variant="default"
                >
                  {formLang.buttons.save}
                </Button>
              </Flex>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipWrapper>
  );
};

export default memo(Update);
