import { ImgInfo } from "@/lib/typings/Typings";
import { ChangeEvent, RefObject, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { VALID_IMG_TYPES } from "@/lib/constant";
import { notifLang } from "@/lib/lang/notifLang";

const useImageUpload = () => {
  const [imgInfo, setImgInfo] = useState<ImgInfo>();

  // * VALIDATE IMAGE TYPE & SETTING OF IMG INFO TO BE UPLOAD TO STORAGE
  const uploadToImgInput = (
    e: ChangeEvent<HTMLInputElement>,
    formRef: RefObject<HTMLFormElement>
  ) => {
    const target = e?.target?.files?.[0];

    if (!formRef?.current) return;

    // * WILL REMOVE THE VALUE OF INPUT FILE FOR IMG IF ITS INVALID
    if (!VALID_IMG_TYPES.includes(target?.type || "") || !target) {
      toast({
        variant: "destructive",
        ...notifLang.uploadImg.error,
      });
      formRef.current.image.value = "";
      setImgInfo({ file: null, fileName: "" });
      return;
    }

    setImgInfo({
      fileName: target.name,
      file: target,
    });
  };

  return {
    imgInfo,
    uploadToImgInput,
    setImgInfo,
  };
};

export default useImageUpload;
