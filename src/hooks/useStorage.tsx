import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { STORAGE_LOCATION } from "@/lib/loc";
import { useToast } from "@/components/ui/use-toast";
import { notifLang } from "@/lib/lang/notifLang";

const useStorage = () => {
  const { toast } = useToast();

  const uploadImage = async (
    imgFile: File,
    imgName: string
  ): Promise<string | boolean> => {
    if (!imgFile && !imgName) return false;

    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${STORAGE_LOCATION.productImg}/${imgName}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {}, // ** Observe state change events such as progress, pause, and resume, (didn't use it).
        () => {
          toast({
            variant: "destructive",
            ...notifLang.submitImg.error,
          });
          reject(false);
        }, // * WILL HANDLE FAILED UPLOAD
        async () => {
          // * GET IMG URL

          const URL = await getDownloadURL(uploadTask.snapshot.ref).then(
            (imgURL) => imgURL
          );

          resolve(URL);
        }
      );
    });
  };

  return {
    uploadImage,
  };
};

export default useStorage;
