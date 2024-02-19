import { useState } from "react";

interface ModalProps {
  closeModal: () => void;
}
const handleSubmit = () => {
  console.log("test!!");
};

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const [inputEmbeddingData, setInputEmbeddingData] = useState<string>("");

  return (
    <>
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-900 dark:text-gray-100">
        <button className="absolute top-2 right-2" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="flex-shrink-0 w-6 h-6"
          >
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold">
          Ask question about embedded text
        </h2>
        <p className="flex-1 text-center dark:text-gray-400">
          <input
            className="text-gray-900"
            type="text"
            value={inputEmbeddingData}
            onChange={(e) => setInputEmbeddingData(e.target.value)}
          />
        </p>
        <button
          onClick={handleSubmit}
          type="button"
          className="px-8 py-3 font-semibold rounded-full dark:bg-violet-400 dark:text-gray-900"
        >
          Start Searching
        </button>
      </div>
    </>
  );
};

export default Modal;
