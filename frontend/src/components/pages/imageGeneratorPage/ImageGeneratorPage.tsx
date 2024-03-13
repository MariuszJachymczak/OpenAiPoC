import { fetchDALLE } from "../../../libs/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setImage, setInput } from "../../../redux/slices/imageGeneratorSlice";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../redux/slices/loadingSlice";
import { animateLoadingDots } from "../../../assets/assets";

const ImageGeneratorPage = () => {
  const dispatch = useDispatch();
  const { input, image } = useSelector(
    (state: RootState) => state.imageGenerator
  );
  const { isLoading } = useSelector((state: RootState) => state.loading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput(e.target.value));
  };

  const generateImage = async () => {
    dispatch(setLoadingStart());
    try {
      const imageData = await fetchDALLE(input);
      dispatch(setImage(imageData));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoadingEnd());
    }
  };

  return (
    <div>
      <input
        className="p-2 border border-gray-800 rounded w-64 text-black"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your prompt"
      />
      <button
        onClick={generateImage}
        disabled={isLoading}
        type="button"
        className="px-8 py-3 font-semibold rounded-sm dark:bg-gray-100 dark:text-gray-800"
      >
        Generate
      </button>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 mt-2">
          <div className={animateLoadingDots}></div>
          <div className={animateLoadingDots}></div>
          <div className={animateLoadingDots}></div>
        </div>
      )}
      {image && <img src={image} alt="Generated Art" className="mt-4" />}
    </div>
  );
};

export default ImageGeneratorPage;
