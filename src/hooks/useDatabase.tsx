import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
  query,
  orderByChild,
  equalTo,
  Query,
  DatabaseReference,
} from "firebase/database";
import { app } from "@/lib/config/firebase";
import { notifLang } from "@/lib/lang/notifLang";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Filter, Sort, Product } from "@/lib/typings/Typings";
import { defaultFilterBy } from "@/lib/static/defaultValues";

const useDatabase = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const db = getDatabase(app);

  // * SAVING DATA TO DB
  const saveData = async <Data extends object>(
    location: string,
    data: Data
  ): Promise<boolean> => {
    const dbRef = push(ref(db, location));
    const id = dbRef.key;

    try {
      set(dbRef, {
        ...data,
        id,
      });
      toast({
        ...notifLang.create.success,
      });
      return true;
    } catch {
      toast({
        variant: "destructive",
        ...notifLang.create.error,
      });
      return false;
    }
  };

  // * FETCH DATA FROM DB
  const getData = async (
    location: string,
    filterVal: Filter = defaultFilterBy,
    sortBy: string = "default"
  ) => {
    let dbRef: DatabaseReference | Query = ref(db, location);

    // * WILL ADD QUERIES IF filterVal HAS VALUES ( SEARCH & FILTER )
    if (filterVal.orderBy && filterVal.equalTo) {
      dbRef = query(
        ref(db, location),
        orderByChild(filterVal.orderBy),
        equalTo(filterVal.equalTo)
      );
    }

    try {
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          // * WILL NOT SORT IF sortBy variable is equal to default or undefined | ""
          if (!sortBy || sortBy === "default") {
            setProducts(Object.values(snapshot.val()));
          } else {
            const arrData: Product[] = Object.values(snapshot.val());
            const sortedData: Product[] = arrData.sort((a, b) =>
              a[sortBy as Sort]?.localeCompare(b[sortBy as Sort])
            );

            setProducts(sortedData);
          }
        } else {
          setProducts([]);
        }
        setLoading(false);
      });
    } catch {
      toast({
        variant: "destructive",
        ...notifLang.create.error,
      });
      setLoading(false);
    }
  };

  // * DELETE DATA TO DB
  const deleteData = async (location: string) => {
    const dbRef = ref(db, location);

    try {
      await remove(dbRef);
      toast({
        ...notifLang.delete.success,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        ...notifLang.delete.error,
      });
    }
  };

  // * UPDATE DATA TO DB
  const updateData = async <T extends object>(
    location: string,
    data: T
  ): Promise<boolean> => {
    const dbRef = ref(db, location);

    try {
      await update(dbRef, data);
      toast({
        ...notifLang.update.success,
      });
      return true;
    } catch {
      toast({
        variant: "destructive",
        ...notifLang.update.error,
      });
      return false;
    }
  };

  return { saveData, products, getData, loading, deleteData, updateData };
};

export default useDatabase;
