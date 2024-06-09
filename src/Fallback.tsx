import { Flex } from "@/components";
import BeatLoader from "react-spinners/BeatLoader";

const Fallback = () => {
  return (
    <Flex className="w-full h-screen ">
      <div>
        <BeatLoader
          color="#f9690e"
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </Flex>
  );
};

export default Fallback;
