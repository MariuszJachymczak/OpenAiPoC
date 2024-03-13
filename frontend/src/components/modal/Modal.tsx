import { useState } from "react";
import { closeIconInModalPoints } from "../../assets/assets";

interface ModalProps {
  closeModal: () => void;
  onUserSubmit: (input: string) => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal, onUserSubmit }) => {
  const [inputUserQuestion, setInputUserQuestion] = useState<string>("");

  const handleSubmit = () => {
    onUserSubmit(inputUserQuestion);
    closeModal();
  };

  return (
    <>
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-700 dark:text-gray-100">
        <button className="absolute top-2 right-2" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="flex-shrink-0 w-6 h-6"
          >
            <polygon points={closeIconInModalPoints}></polygon>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold">
          Ask question about embedded text
        </h2>
        <p className="flex-1 text-center dark:text-gray-400">
          <input
            className="text-gray-900"
            type="text"
            value={inputUserQuestion}
            onChange={(e) => setInputUserQuestion(e.target.value)}
          />
        </p>
        <button
          onClick={handleSubmit}
          type="button"
          className="px-20 py-3 font-semibold rounded-full dark:bg-violet-400 dark:text-gray-900"
        >
          Start Searching
        </button>
      </div>
    </>
  );
};

export default Modal;
