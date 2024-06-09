import { Flex, Paragraph, Select } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, NotebookPen } from "lucide-react";
import { useRef, useState } from "react";
import useDatabase from "@/hooks/useDatabase";
import { DB_LOCATION } from "@/lib/loc";
import dayjs from "dayjs";
import { CATEGORIES } from "@/lib/constant";
import useStorage from "@/hooks/useStorage";
import { formLang } from "@/lib/lang/formLang";
import { modalLang } from "@/lib/lang/modalLang";
import useImageUpload from "@/hooks/useImageUpload";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schema/ProductSchema";

type ProductData = z.infer<typeof ProductSchema>;

const Create = () => {
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
  });

  const { saveData } = useDatabase();
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
    // * RETURN IS HAS
    if (!imgURL && imgInfo?.file) return;

    const response = await saveData(DB_LOCATION.products, {
      ...data,
      dateCreated: dateNow,
      lastModified: dateNow,
      image: imgURL,
    });

    if (response) {
      reset();
      setIsOpen(false);
      setImgInfo({ fileName: "", file: null });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button size="sm" type="button">
          <PlusCircle className="w-4 mr-1 text-white" />
          <span>{modalLang.create.button}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
            <NotebookPen className="w-6 text-blue-400" />
            <span>{modalLang.create.title}</span>
          </DialogTitle>
          <DialogDescription className="font-montserrat">
            {modalLang.create.description}
          </DialogDescription>
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
                  <span className="font-semibold">{formLang.image.note2}</span>
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
                {formLang.buttons.create}
              </Button>
            </Flex>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
