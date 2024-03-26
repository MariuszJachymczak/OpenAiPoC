import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversationInput,
  setAnswer,
} from "../../../redux/slices/answerGeneratorSlice";
import { animateLoadingDots } from "../../../assets/assets";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../redux/slices/loadingSlice";
import { fetchEmbeddings } from "../../../libs/api";

const RagPage = () => {
  const dispatch = useDispatch();
  const { conversationInput, conversationAnswer } = useSelector(
    (state: RootState) => state.answerGenerator
  );

  const { isLoading } = useSelector((state: RootState) => state.loading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setConversationInput(e.target.value));
  };

  const generateAnswer = async () => {
    dispatch(setLoadingStart());
    try {
      const answerData = await fetchEmbeddings(conversationInput);
      dispatch(setAnswer(answerData));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingEnd());
    }
  };

  return (
    <>
      <div>
        <input
          style={{ color: "black" }}
          className="p-2 border border-gray-800 rounded w-64"
          type="text"
          value={conversationInput}
          onChange={handleInputChange}
        />
        <button
          onClick={generateAnswer}
          disabled={isLoading}
          type="button"
          className="px-8 py-3 font-semibold rounded-sm dark:bg-gray-100 dark:text-gray-800"
        >
          Generate RAG
        </button>
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className={animateLoadingDots}></div>
            <div className={animateLoadingDots}></div>
            <div className={animateLoadingDots}></div>
          </div>
        )}
        <div> {conversationAnswer}</div>
      </div>
    </>
  );
};

export default RagPage;
